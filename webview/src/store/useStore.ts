// ============================================================
// Zustand Store — Global State for React Flow
// ============================================================

import { create } from 'zustand';
import {
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from '@xyflow/react';
import dagre from 'dagre';

// Same types from the extension parser
interface DbmlSchema {
  project?: { name: string; databaseType?: string; note?: string };
  tables: TableDef[];
  enums: EnumDef[];
  refs: RefDef[];
  tableGroups: TableGroupDef[];
  tablePartials: any[];
  stickyNotes: any[];
}

interface TableDef {
  name: string;
  schema?: string;
  alias?: string;
  columns: ColumnDef[];
  indexes: any[];
  note?: string;
  settings: { headerColor?: string };
}

interface ColumnDef {
  name: string;
  type: string;
  settings: {
    primaryKey: boolean;
    notNull: boolean;
    unique: boolean;
    increment: boolean;
    default?: string;
    note?: string;
    ref?: { type: string; table: string; column: string; schema?: string };
  };
}

interface EnumDef {
  name: string;
  schema?: string;
  values: { name: string; note?: string }[];
}

interface RefDef {
  name?: string;
  from: { schema?: string; table: string; columns: string[] };
  to: { schema?: string; table: string; columns: string[] };
  type: string;
  settings: { delete?: string; update?: string; color?: string };
}

interface TableGroupDef {
  name: string;
  tables: string[];
  note?: string;
  color?: string;
}

// ---- Dagre Layout ----
const NODE_WIDTH = 260;
const TABLE_ROW_HEIGHT = 28;
const TABLE_HEADER_HEIGHT = 36;
const ENUM_ROW_HEIGHT = 28;

function getNodeHeight(type: string, itemCount: number): number {
  const baseHeight = type === 'tableNode' ? TABLE_HEADER_HEIGHT : 36;
  const rowHeight = type === 'tableNode' ? TABLE_ROW_HEIGHT : ENUM_ROW_HEIGHT;
  return baseHeight + Math.max(1, itemCount) * rowHeight + 8;
}

function applyDagreLayout(nodes: Node[], edges: Edge[]): Node[] {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: 'LR',
    nodesep: 60,
    ranksep: 100,
    edgesep: 30,
    marginx: 40,
    marginy: 40,
  });

  for (const node of nodes) {
    const height = node.type === 'tableNode'
      ? getNodeHeight('tableNode', (node.data as any).columns?.length || 0)
      : getNodeHeight('enumNode', (node.data as any).values?.length || 0);
    g.setNode(node.id, { width: NODE_WIDTH, height });
  }

  for (const edge of edges) {
    g.setEdge(edge.source, edge.target);
  }

  dagre.layout(g);

  return nodes.map((node) => {
    const nodeWithPosition = g.node(node.id);
    if (nodeWithPosition) {
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - NODE_WIDTH / 2,
          y: nodeWithPosition.y - (nodeWithPosition.height || 0) / 2,
        },
      };
    }
    return node;
  });
}

// ---- Relationship label mapping ----
function getEdgeLabel(type: string): string {
  switch (type) {
    case '>': return '∞ → 1';
    case '<': return '1 → ∞';
    case '-': return '1 → 1';
    case '<>': return '∞ → ∞';
    default: return '';
  }
}

function getEdgeMarkers(type: string) {
  const base = {
    markerEnd: {
      type: MarkerType.ArrowClosed,
      width: 16,
      height: 16,
    },
  };

  if (type === '<>') {
    return {
      ...base,
      markerStart: {
        type: MarkerType.ArrowClosed,
        width: 16,
        height: 16,
      },
    };
  }

  return base;
}

// ---- Store Definition ----
interface DiagramState {
  nodes: Node[];
  edges: Edge[];
  schema: DbmlSchema | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setSchema: (schema: DbmlSchema) => void;
}

export const useDiagramStore = create<DiagramState>((set, get) => ({
  nodes: [],
  edges: [],
  schema: null,

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  setSchema: (schema: DbmlSchema) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // -- Create Table Nodes --
    for (const table of schema.tables) {
      const fullName = table.schema ? `${table.schema}.${table.name}` : table.name;
      nodes.push({
        id: `table-${fullName}`,
        type: 'tableNode',
        position: { x: 0, y: 0 },
        data: {
          name: table.name,
          schema: table.schema,
          alias: table.alias,
          columns: table.columns,
          note: table.note,
          headerColor: table.settings?.headerColor,
        },
      });
    }

    // -- Create Enum Nodes --
    for (const enumDef of schema.enums) {
      const fullName = enumDef.schema ? `${enumDef.schema}.${enumDef.name}` : enumDef.name;
      nodes.push({
        id: `enum-${fullName}`,
        type: 'enumNode',
        position: { x: 0, y: 0 },
        data: {
          name: enumDef.name,
          schema: enumDef.schema,
          values: enumDef.values,
        },
      });
    }

    // -- Create Edges from Refs --
    for (let i = 0; i < schema.refs.length; i++) {
      const ref = schema.refs[i];
      const fromTable = ref.from.schema
        ? `table-${ref.from.schema}.${ref.from.table}`
        : `table-${ref.from.table}`;
      const toTable = ref.to.schema
        ? `table-${ref.to.schema}.${ref.to.table}`
        : `table-${ref.to.table}`;

      edges.push({
        id: `edge-${i}`,
        source: fromTable,
        target: toTable,
        label: getEdgeLabel(ref.type),
        type: 'smoothstep',
        animated: false,
        style: {
          stroke: ref.settings?.color || 'var(--edge-color)',
          strokeWidth: 1.5,
        },
        ...getEdgeMarkers(ref.type),
      });
    }

    // -- Create Edges from Inline Refs --
    let inlineEdgeIdx = schema.refs.length;
    for (const table of schema.tables) {
      const fullTableName = table.schema ? `${table.schema}.${table.name}` : table.name;
      for (const col of table.columns) {
        if (col.settings.ref) {
          const targetTable = col.settings.ref.schema
            ? `table-${col.settings.ref.schema}.${col.settings.ref.table}`
            : `table-${col.settings.ref.table}`;

          edges.push({
            id: `edge-inline-${inlineEdgeIdx++}`,
            source: `table-${fullTableName}`,
            target: targetTable,
            label: getEdgeLabel(col.settings.ref.type),
            type: 'smoothstep',
            animated: false,
            style: { strokeWidth: 1.5 },
            ...getEdgeMarkers(col.settings.ref.type),
          });
        }
      }
    }

    // -- Apply Dagre Layout --
    const layoutedNodes = applyDagreLayout(nodes, edges);

    set({
      nodes: layoutedNodes,
      edges,
      schema,
    });
  },
}));
