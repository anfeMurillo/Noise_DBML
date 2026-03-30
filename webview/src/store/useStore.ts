// ============================================================
// Zustand Store — Global State for React Flow
// ============================================================

import { create } from 'zustand';
import {
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type NodeChange,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from '@xyflow/react';
import dagre from 'dagre';

// ---- Schema Types (mirrors extension parser) ----
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

// ---- Layout Constants ----
const NODE_WIDTH = 260;
const TABLE_ROW_HEIGHT = 28;
const TABLE_HEADER_HEIGHT = 36;
const ENUM_ROW_HEIGHT = 28;
const GROUP_PADDING = 24;
const GROUP_HEADER_HEIGHT = 42;
const COLLAPSED_WIDTH = 220;
const COLLAPSED_HEIGHT = 64;

function getNodeHeight(type: string, itemCount: number): number {
  const baseHeight = type === 'tableNode' ? TABLE_HEADER_HEIGHT : 36;
  const rowHeight = type === 'tableNode' ? TABLE_ROW_HEIGHT : ENUM_ROW_HEIGHT;
  return baseHeight + Math.max(1, itemCount) * rowHeight + 8;
}

// ---- Bounding-box helpers ----
function calcBoundingBox(nodes: Node[]): { x: number; y: number; width: number; height: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const n of nodes) {
    const w = (n.measured?.width) ?? NODE_WIDTH;
    const h = (n.measured?.height) ?? getNodeHeight(
      n.type || 'tableNode',
      ((n.data as any).columns?.length || (n.data as any).values?.length || 0),
    );
    minX = Math.min(minX, n.position.x);
    minY = Math.min(minY, n.position.y);
    maxX = Math.max(maxX, n.position.x + w);
    maxY = Math.max(maxY, n.position.y + h);
  }
  return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
}

function recalcGroupBounds(
  nodes: Node[],
  groupId: string,
  membership: Record<string, string>,
): Node[] {
  const memberIds = Object.entries(membership)
    .filter(([, gId]) => gId === groupId)
    .map(([tId]) => tId);

  const memberNodes = nodes.filter((n) => memberIds.includes(n.id) && !n.hidden);
  if (memberNodes.length === 0) return nodes;

  const bounds = calcBoundingBox(memberNodes);

  return nodes.map((n) => {
    if (n.id !== groupId) return n;
    return {
      ...n,
      position: {
        x: bounds.x - GROUP_PADDING,
        y: bounds.y - GROUP_HEADER_HEIGHT - GROUP_PADDING,
      },
      style: {
        ...(n.style || {}),
        width: bounds.width + GROUP_PADDING * 2,
        height: bounds.height + GROUP_HEADER_HEIGHT + GROUP_PADDING * 2,
      },
    };
  });
}

// ---- Dagre Layout ----
// ---- Dagre Layout (Left-to-Right) ----
function applyLeftRightLayout(nodes: Node[], edges: Edge[]): Node[] {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: 'LR',
    nodesep: 80,
    ranksep: 120,
    edgesep: 40,
    marginx: 50,
    marginy: 50,
  });

  for (const node of nodes) {
    const height =
      node.type === 'tableNode'
        ? getNodeHeight('tableNode', (node.data as any).columns?.length || 0)
        : getNodeHeight('enumNode', (node.data as any).values?.length || 0);
    g.setNode(node.id, { width: NODE_WIDTH, height });
  }

  for (const edge of edges) {
    g.setEdge(edge.source, edge.target);
  }

  dagre.layout(g);

  return nodes.map((node) => {
    const pos = g.node(node.id);
    if (pos) {
      return {
        ...node,
        position: {
          x: pos.x - NODE_WIDTH / 2,
          y: pos.y - (pos.height || 0) / 2,
        },
      };
    }
    return node;
  });
}

// ---- Snowflake Layout (Central Hubs) ----
function applySnowflakeLayout(nodes: Node[], edges: Edge[]): Node[] {
  if (nodes.length === 0) return nodes;

  // 1. Calculate connectivity degree for each node
  const degreeMap: Record<string, number> = {};
  nodes.forEach(n => degreeMap[n.id] = 0);
  edges.forEach(e => {
    if (degreeMap[e.source] !== undefined) degreeMap[e.source]++;
    if (degreeMap[e.target] !== undefined) degreeMap[e.target]++;
  });

  // 2. Sort nodes by connectivity (descending)
  const sortedNodes = [...nodes].sort((a, b) => (degreeMap[b.id] || 0) - (degreeMap[a.id] || 0));

  // 3. Place nodes in a spiral/radial pattern
  const centerX = 500;
  const centerY = 500;
  
  return nodes.map((node) => {
    const index = sortedNodes.findIndex(n => n.id === node.id);
    if (index === 0) {
      // Re-center first node
      return { ...node, position: { x: centerX, y: centerY } };
    }

    // Radial layout: items are placed in expanding layers
    // Radius increases with index, angle increments
    const layer = Math.floor(Math.sqrt(index));
    const angle = (index * 137.5) * (Math.PI / 180); // Golden angle
    const radius = layer * 450;

    return {
      ...node,
      position: {
        x: centerX + radius * Math.cos(angle) - NODE_WIDTH / 2,
        y: centerY + radius * Math.sin(angle) - (getNodeHeight(node.type || 'tableNode', (node.data as any).columns?.length || 0) / 2),
      },
    };
  });
}

// ---- Compact Layout (Grid Rectangle) ----
function applyCompactLayout(nodes: Node[]): Node[] {
  if (nodes.length === 0) return nodes;

  const cols = Math.ceil(Math.sqrt(nodes.length));
  const spacingX = 400;
  const spacingY = 400;

  // Sort nodes by name or type
  const sortedNodes = [...nodes].sort((a, b) => {
    const nameA = (a.data as any).name || '';
    const nameB = (b.data as any).name || '';
    return nameA.localeCompare(nameB);
  });

  return nodes.map((node) => {
    const index = sortedNodes.findIndex(n => n.id === node.id);
    const col = index % cols;
    const row = Math.floor(index / cols);

    return {
      ...node,
      position: {
        x: col * spacingX,
        y: row * spacingY,
      },
    };
  });
}

// ---- Edge helpers ----
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
    markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
  };
  if (type === '<>') {
    return {
      ...base,
      markerStart: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
    };
  }
  return base;
}

// ---- Store Definition ----
interface DiagramState {
  nodes: Node[];
  edges: Edge[];
  schema: DbmlSchema | null;
  groupMembership: Record<string, string>;   // tableNodeId → groupNodeId
  collapsedGroups: Record<string, boolean>;   // groupNodeId → true

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setSchema: (schema: DbmlSchema) => void;
  toggleGroupCollapse: (groupId: string) => void;
  adjustLayout: (algorithm?: 'left-right' | 'snowflake' | 'compact') => void;
}

export const useDiagramStore = create<DiagramState>((set, get) => ({
  nodes: [],
  edges: [],
  schema: null,
  groupMembership: {},
  collapsedGroups: {},

  // ──────────────────────────────────────────────
  // Manual Layout Trigger
  // ──────────────────────────────────────────────
  adjustLayout: (algorithm = 'left-right') => {
    const { nodes, edges, groupMembership } = get();
    if (!nodes.length) return;

    // 1. Separate groups from basic nodes
    const basicNodes = nodes.filter(n => n.type !== 'groupNode');
    
    // 2. Apply chosen algorithm to basic nodes
    let layoutedBasicNodes: Node[];
    
    switch (algorithm) {
      case 'snowflake':
        layoutedBasicNodes = applySnowflakeLayout(basicNodes, edges);
        break;
      case 'compact':
        layoutedBasicNodes = applyCompactLayout(basicNodes);
        break;
      case 'left-right':
      default:
        layoutedBasicNodes = applyLeftRightLayout(basicNodes, edges);
        break;
    }
    
    // 3. Re-calculate group bounds based on new positions
    let newNodes = [...layoutedBasicNodes];
    const groupIds = nodes.filter(n => n.type === 'groupNode').map(n => n.id);
    
    // Add groups back (they'll be recalced)
    const existingGroups = nodes.filter(n => n.type === 'groupNode');
    newNodes = [...existingGroups, ...newNodes];

    for (const gId of groupIds) {
      newNodes = recalcGroupBounds(newNodes, gId, groupMembership);
    }

    set({ nodes: newNodes });
  },

  // ──────────────────────────────────────────────
  // Node-change handler with group propagation
  // ──────────────────────────────────────────────
  onNodesChange: (changes) => {
    const state = get();
    const { groupMembership, collapsedGroups } = state;
    const currentNodes = state.nodes;

    // 1. Identify group position changes ─ we'll propagate them to children
    const draggedGroupIds = new Set<string>();
    const childChanges: NodeChange[] = [];

    for (const change of changes) {
      if (
        change.type === 'position' &&
        change.id.startsWith('group-') &&
        change.position
      ) {
        draggedGroupIds.add(change.id);
        const groupNode = currentNodes.find((n) => n.id === change.id);
        if (!groupNode) continue;

        const dx = change.position.x - groupNode.position.x;
        const dy = change.position.y - groupNode.position.y;

        // Create matching position changes for every member table
        for (const [tableId, gId] of Object.entries(groupMembership)) {
          if (gId !== change.id) continue;
          const tableNode = currentNodes.find((n) => n.id === tableId);
          if (!tableNode) continue;

          childChanges.push({
            type: 'position',
            id: tableId,
            position: {
              x: tableNode.position.x + dx,
              y: tableNode.position.y + dy,
            },
          } as NodeChange);
        }
      }
    }

    // 2. Apply ALL changes together
    let newNodes = applyNodeChanges([...changes, ...childChanges], currentNodes);

    // 3. Recalculate bounding boxes for groups whose member tables moved
    //    (skip groups that were themselves dragged — their children moved with them)
    const groupsToRecalc = new Set<string>();
    for (const change of changes) {
      if (change.type === 'position' && change.position && groupMembership[change.id]) {
        const gId = groupMembership[change.id];
        if (!draggedGroupIds.has(gId) && !collapsedGroups[gId]) {
          groupsToRecalc.add(gId);
        }
      }
    }

    for (const gId of groupsToRecalc) {
      newNodes = recalcGroupBounds(newNodes, gId, groupMembership);
    }

    set({ nodes: newNodes });
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  // ──────────────────────────────────────────────
  // Schema → Nodes + Edges
  // ──────────────────────────────────────────────
  setSchema: (schema: DbmlSchema) => {
    if (!schema || !schema.tables) {
       set({ nodes: [], edges: [], schema: null, groupMembership: {}, collapsedGroups: {} });
       return;
    }
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // -- Table Nodes --
    for (const table of schema.tables) {
      const fullName = table.schema ? `${table.schema}.${table.name}` : table.name;
      
      // Enrich columns with enum info
      const enrichedColumns = table.columns.map(col => {
        // Try to find a matching enum
        const matchingEnum = schema.enums.find(e => {
          const enumFullName = e.schema ? `${e.schema}.${e.name}` : e.name;
          return col.type === enumFullName || col.type === e.name;
        });

        return {
          ...col,
          isEnum: !!matchingEnum,
          enumData: matchingEnum
        };
      });

      nodes.push({
        id: `table-${fullName}`,
        type: 'tableNode',
        position: { x: 0, y: 0 },
        zIndex: 10,
        data: {
          name: table.name,
          schema: table.schema,
          alias: table.alias,
          columns: enrichedColumns,
          note: table.note,
          headerColor: table.settings?.headerColor,
        },
      });
    }

    // -- Enum Nodes --
    for (const enumDef of schema.enums) {
      const fullName = enumDef.schema ? `${enumDef.schema}.${enumDef.name}` : enumDef.name;
      nodes.push({
        id: `enum-${fullName}`,
        type: 'enumNode',
        position: { x: 0, y: 0 },
        zIndex: 10,
        data: {
          name: enumDef.name,
          schema: enumDef.schema,
          values: enumDef.values,
        },
      });
    }

    // -- Edges from Refs --
    for (let i = 0; i < schema.refs.length; i++) {
      const ref = schema.refs[i];
      const fromTable = ref.from.schema
        ? `table-${ref.from.schema}.${ref.from.table}`
        : `table-${ref.from.table}`;
      const toTable = ref.to.schema
        ? `table-${ref.to.schema}.${ref.to.table}`
        : `table-${ref.to.table}`;

      const isSelf = fromTable === toTable;
      const fromCol = ref.from.columns[0];
      const toCol = ref.to.columns[0];

      edges.push({
        id: `edge-${i}`,
        source: fromTable,
        target: toTable,
        sourceHandle: isSelf ? `${fromCol}-right-source` : `${fromCol}-right-source`,
        targetHandle: isSelf ? `${toCol}-right-target` : `${toCol}-left-target`,
        label: getEdgeLabel(ref.type),
        type: 'dbmlEdge',
        animated: false,
        zIndex: 20,
        data: {
          isSelf,
          color: ref.settings?.color || 'var(--edge-color)',
        },
        style: {
          stroke: ref.settings?.color || 'var(--edge-color)',
          strokeWidth: 2,
        },
        ...getEdgeMarkers(ref.type),
      });
    }

    // -- Inline Ref Edges --
    const seenRefs = new Set<string>();
    // Pre-populate seenRefs from explicit refs to avoid duplicates
    for (const edge of edges) {
      seenRefs.add(`${edge.source}->${edge.target}`);
    }

    let inlineIdx = schema.refs.length;
    for (const table of schema.tables) {
      const fullTableName = table.schema ? `${table.schema}.${table.name}` : table.name;
      for (const col of table.columns) {
        if (col.settings.ref) {
          const target = col.settings.ref.schema
            ? `table-${col.settings.ref.schema}.${col.settings.ref.table}`
            : `table-${col.settings.ref.table}`;

          const source = `table-${fullTableName}`;
          const isSelf = source === target;
          
          const refId = `${source}->${target}`;
          if (seenRefs.has(refId)) continue;
          seenRefs.add(refId);

          const fromCol = col.name;
          const toCol = col.settings.ref.column;

          edges.push({
            id: `edge-inline-${inlineIdx++}`,
            source,
            target,
            sourceHandle: isSelf ? `${fromCol}-right-source` : `${fromCol}-right-source`,
            targetHandle: isSelf ? `${toCol}-right-target` : `${toCol}-left-target`,
            label: getEdgeLabel(col.settings.ref.type),
            type: 'dbmlEdge',
            animated: false,
            zIndex: 20,
            data: {
              isSelf,
              color: 'var(--edge-color)',
            },
            style: { strokeWidth: 2 },
            ...getEdgeMarkers(col.settings.ref.type),
          });
        }
      }
    }

    // -- Dagre layout (tables + enums only) --
    const layoutedNodes = applyLeftRightLayout(nodes, edges);

    // -- Build group membership & create group nodes --
    const groupMembership: Record<string, string> = {};
    const groupNodes: Node[] = [];

    for (const group of schema.tableGroups) {
      const groupId = `group-${group.name}`;
      const memberIds: string[] = [];

      for (const tName of group.tables) {
        const nodeId = `table-${tName}`;
        if (layoutedNodes.find((n: Node) => n.id === nodeId)) {
          groupMembership[nodeId] = groupId;
          memberIds.push(nodeId);
        }
      }

      if (memberIds.length === 0) continue;

      const memberNodes = layoutedNodes.filter((n: Node) => memberIds.includes(n.id));
      const bounds = calcBoundingBox(memberNodes);

      groupNodes.push({
        id: groupId,
        type: 'groupNode',
        position: {
          x: bounds.x - GROUP_PADDING,
          y: bounds.y - GROUP_HEADER_HEIGHT - GROUP_PADDING,
        },
        style: {
          width: bounds.width + GROUP_PADDING * 2,
          height: bounds.height + GROUP_HEADER_HEIGHT + GROUP_PADDING * 2,
        },
        zIndex: 1,
        dragHandle: '.group-node__header',
        data: {
          name: group.name,
          color: group.color,
          tableCount: memberIds.length,
          collapsed: false,
        },
      });
    }

    set({
      nodes: [...groupNodes, ...layoutedNodes],
      edges,
      schema,
      groupMembership,
      collapsedGroups: {},
    });
  },

  // ──────────────────────────────────────────────
  // Collapse / Expand groups
  // ──────────────────────────────────────────────
  toggleGroupCollapse: (groupId: string) => {
    const state = get();
    const isCollapsed = !!state.collapsedGroups[groupId];
    const willCollapse = !isCollapsed;

    const newCollapsed = { ...state.collapsedGroups, [groupId]: willCollapse };
    if (!willCollapse) delete newCollapsed[groupId];

    // Find all member table IDs
    const memberIds = new Set(
      Object.entries(state.groupMembership)
        .filter(([, gId]) => gId === groupId)
        .map(([tId]) => tId),
    );

    // Toggle table visibility
    let newNodes = state.nodes.map((node) => {
      if (memberIds.has(node.id)) {
        return { ...node, hidden: willCollapse };
      }
      if (node.id === groupId) {
        if (willCollapse) {
          return {
            ...node,
            data: { ...node.data, collapsed: true },
            style: { ...node.style, width: COLLAPSED_WIDTH, height: COLLAPSED_HEIGHT },
          };
        }
        return { ...node, data: { ...node.data, collapsed: false } };
      }
      return node;
    });

    // Toggle edge visibility for edges touching hidden tables
    const newEdges = state.edges.map((edge) => {
      if (memberIds.has(edge.source) || memberIds.has(edge.target)) {
        return { ...edge, hidden: willCollapse };
      }
      return edge;
    });

    // If expanding, recalculate bounding box
    if (!willCollapse) {
      newNodes = recalcGroupBounds(newNodes, groupId, state.groupMembership);
    }

    set({ nodes: newNodes, edges: newEdges, collapsedGroups: newCollapsed });
  },
}));
