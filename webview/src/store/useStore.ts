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
  stickyNotes?: { id: string; x: number; y: number; text: string; width?: number; height?: number }[];
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
const COMPACT_NODE_WIDTH = 160; // used when detailLevel === 'table-names'
const TABLE_ROW_HEIGHT = 28;
const TABLE_HEADER_HEIGHT = 36;
const ENUM_ROW_HEIGHT = 28;
const GROUP_PADDING = 24;
const GROUP_HEADER_HEIGHT = 42;
const INDEX_SECTION_BASE_HEIGHT = 40;
const INDEX_ROW_HEIGHT = 20;
const FOOTER_NOTE_HEIGHT = 42;
const COLLAPSED_WIDTH = 220;
const COLLAPSED_HEIGHT = 64;

function getNodeWidth(node: Node, detailLevel: DetailLevel = 'all-fields'): number {
  if (node.type === 'tableNode') {
    return detailLevel === 'table-names' ? COMPACT_NODE_WIDTH : NODE_WIDTH;
  }
  if (node.type === 'stickyNoteNode') {
    return (node as any).style?.width || 200;
  }
  return node.measured?.width ?? NODE_WIDTH;
}

function getNodeHeight(node: Node, detailLevel: DetailLevel = 'all-fields'): number {
  const type = node.type || 'tableNode';
  const data = node.data as any;
  
  if (type === 'tableNode' && detailLevel === 'table-names') {
    return TABLE_HEADER_HEIGHT;
  }

  const baseHeight = type === 'tableNode' ? TABLE_HEADER_HEIGHT : 36;
  const rowHeight = type === 'tableNode' ? TABLE_ROW_HEIGHT : ENUM_ROW_HEIGHT;
  
  let columns = data.columns || [];
  if (type === 'tableNode' && detailLevel === 'keys-only') {
    columns = columns.filter((col: any) => col.settings?.primaryKey || col.settings?.ref);
  }
  
  const itemCount = type === 'tableNode' ? (columns.length || 0) : (data.values?.length || 0);
  let height = baseHeight + (itemCount > 0 ? itemCount * rowHeight + 8 : (type === 'tableNode' ? 40 : 8));

  if (type === 'tableNode') {
    if (detailLevel === 'all-fields') {
      if (data.indexes && data.indexes.length > 0) {
        height += INDEX_SECTION_BASE_HEIGHT + (data.indexes.length * INDEX_ROW_HEIGHT);
      }
      if (data.note) {
        height += FOOTER_NOTE_HEIGHT;
      }
    }
  } else if (type === 'stickyNoteNode') {
    height = (node as any).style?.height || 200;
  }

  return height;
}

// ---- Bounding-box helpers ----
function calcBoundingBox(nodes: Node[], detailLevel: DetailLevel = 'all-fields'): { x: number; y: number; width: number; height: number } {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const n of nodes) {
    const w = getNodeWidth(n, detailLevel);
    const h = n.type === 'tableNode' || n.type === 'enumNode'
      ? getNodeHeight(n, detailLevel)
      : (n.measured?.height ?? getNodeHeight(n, detailLevel));

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
  detailLevel: DetailLevel = 'all-fields'
): Node[] {
  const memberIds = Object.entries(membership)
    .filter(([, gId]) => gId === groupId)
    .map(([tId]) => tId);

  const memberNodes = nodes.filter((n) => memberIds.includes(n.id) && !n.hidden);
  if (memberNodes.length === 0) return nodes;

  const bounds = calcBoundingBox(memberNodes, detailLevel);

  return nodes.map((n) => {
    if (n.id !== groupId) return n;
    return {
      ...n,
      position: {
        x: bounds.x - GROUP_PADDING,
        y: bounds.y - GROUP_HEADER_HEIGHT - GROUP_PADDING,
      },
      style: {
        ...((n as any).style || {}),
        width: bounds.width + GROUP_PADDING * 2,
        height: bounds.height + GROUP_HEADER_HEIGHT + GROUP_PADDING * 2,
      },
    };
  });
}

// ---- Dagre Layout (Left-to-Right) ----
function applyLeftRightLayout(nodes: Node[], edges: Edge[], detailLevel?: DetailLevel): Node[] {
  if (nodes.length === 0) return nodes;

  const compactDetail = detailLevel === 'table-names';
  const g = new dagre.graphlib.Graph({ compound: false });
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: 'LR',
    align: 'UL',
    nodesep: compactDetail ? 35 : 60,
    ranksep: compactDetail ? 120 : 180,
    edgesep: compactDetail ? 15 : 30,
    marginx: 40,
    marginy: 40,
    ranker: 'network-simplex',
  });

  const nodeIds = new Set(nodes.map((n) => n.id));
  const connected = new Set<string>();

  for (const node of nodes) {
    const width = getNodeWidth(node, detailLevel);
    const height = getNodeHeight(node, detailLevel);
    g.setNode(node.id, { width, height });
  }

  for (const edge of edges) {
    if (nodeIds.has(edge.source) && nodeIds.has(edge.target) && edge.source !== edge.target) {
      g.setEdge(edge.source, edge.target);
      connected.add(edge.source);
      connected.add(edge.target);
    }
  }

  dagre.layout(g);

  // Collect orphan nodes (no edges) — dagre still positions them but often stacks them awkwardly.
  // We'll place them to the right of the main graph in a neat column.
  const connectedNodes = nodes.filter((n) => connected.has(n.id));
  let rightmost = -Infinity;
  let topmost = Infinity;
  for (const n of connectedNodes) {
    const pos = g.node(n.id);
    if (!pos) continue;
    const w = getNodeWidth(n, detailLevel);
    rightmost = Math.max(rightmost, pos.x - w / 2 + w);
    topmost = Math.min(topmost, pos.y - (pos.height || 0) / 2);
  }
  if (!isFinite(rightmost)) rightmost = 0;
  if (!isFinite(topmost)) topmost = 0;

  const ORPHAN_GAP = compactDetail ? 80 : 120;
  const ORPHAN_ROW_GAP = 40;
  const orphanCursor = { x: rightmost + ORPHAN_GAP, y: topmost };

  // Sort orphans alphabetically for stability
  const orphans = nodes
    .filter((n) => !connected.has(n.id))
    .sort((a, b) => {
      const nameA = (a.data as any)?.name || a.id;
      const nameB = (b.data as any)?.name || b.id;
      return String(nameA).localeCompare(String(nameB));
    });

  const orphanPositions = new Map<string, { x: number; y: number }>();
  let y = orphanCursor.y;
  for (const n of orphans) {
    orphanPositions.set(n.id, { x: orphanCursor.x, y });
    y += getNodeHeight(n, detailLevel) + ORPHAN_ROW_GAP;
  }

  return nodes.map((node) => {
    const orphanPos = orphanPositions.get(node.id);
    if (orphanPos) {
      return { ...node, position: orphanPos };
    }
    const pos = g.node(node.id);
    if (pos) {
      const w = getNodeWidth(node, detailLevel);
      return {
        ...node,
        position: {
          x: pos.x - w / 2,
          y: pos.y - (pos.height || 0) / 2,
        },
      };
    }
    return node;
  });
}

// ---- Snowflake Layout (Concentric BFS rings around the hub) ----
function applySnowflakeLayout(nodes: Node[], edges: Edge[], detailLevel?: DetailLevel): Node[] {
  if (nodes.length === 0) return nodes;

  // Build undirected adjacency (self-loops ignored)
  const adjacency = new Map<string, Set<string>>();
  for (const n of nodes) adjacency.set(n.id, new Set());
  for (const e of edges) {
    if (e.source === e.target) continue;
    if (adjacency.has(e.source) && adjacency.has(e.target)) {
      adjacency.get(e.source)!.add(e.target);
      adjacency.get(e.target)!.add(e.source);
    }
  }

  // Split into connected components
  const visited = new Set<string>();
  const components: string[][] = [];
  for (const n of nodes) {
    if (visited.has(n.id)) continue;
    const comp: string[] = [];
    const queue = [n.id];
    visited.add(n.id);
    while (queue.length > 0) {
      const id = queue.shift()!;
      comp.push(id);
      for (const nb of adjacency.get(id) || []) {
        if (!visited.has(nb)) {
          visited.add(nb);
          queue.push(nb);
        }
      }
    }
    components.push(comp);
  }
  // Largest component first
  components.sort((a, b) => b.length - a.length);

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));
  const compact = detailLevel === 'table-names';
  const ringStep = compact ? 280 : 440;
  const minArcSpacing = compact ? 200 : 340;
  const componentGap = compact ? 200 : 300;

  interface LocalLayout {
    positions: Map<string, { x: number; y: number }>;
    minX: number; minY: number; maxX: number; maxY: number;
  }
  const layouts: LocalLayout[] = [];

  for (const comp of components) {
    const compSet = new Set(comp);

    // Hub = node with the highest degree in this component (tie-broken by name for stability)
    const hub = comp.reduce((best, id) => {
      const dBest = adjacency.get(best)?.size || 0;
      const dId = adjacency.get(id)?.size || 0;
      if (dId !== dBest) return dId > dBest ? id : best;
      const nameBest = (nodeMap.get(best)?.data as any)?.name || best;
      const nameId = (nodeMap.get(id)?.data as any)?.name || id;
      return String(nameId).localeCompare(String(nameBest)) < 0 ? id : best;
    }, comp[0]);

    // BFS from the hub → list of rings
    const rings: string[][] = [];
    const seen = new Set<string>([hub]);
    let cur = [hub];
    while (cur.length > 0) {
      rings.push(cur);
      const next: string[] = [];
      for (const id of cur) {
        for (const nb of adjacency.get(id) || []) {
          if (compSet.has(nb) && !seen.has(nb)) {
            seen.add(nb);
            next.push(nb);
          }
        }
      }
      // Sort by degree descending so hubs sit closer together within a ring
      next.sort((a, b) => (adjacency.get(b)?.size || 0) - (adjacency.get(a)?.size || 0));
      cur = next;
    }

    const positions = new Map<string, { x: number; y: number }>();
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    const record = (id: string, x: number, y: number) => {
      const n = nodeMap.get(id)!;
      const w = getNodeWidth(n, detailLevel);
      const h = getNodeHeight(n, detailLevel);
      positions.set(id, { x: x - w / 2, y: y - h / 2 });
      minX = Math.min(minX, x - w / 2);
      minY = Math.min(minY, y - h / 2);
      maxX = Math.max(maxX, x + w / 2);
      maxY = Math.max(maxY, y + h / 2);
    };

    // Ring 0: hub at origin
    record(hub, 0, 0);

    for (let r = 1; r < rings.length; r++) {
      const ring = rings[r];
      // Radius needs to fit every ring-r node along its circumference without overlap
      const circumferenceRadius = (ring.length * minArcSpacing) / (2 * Math.PI);
      const radius = Math.max(r * ringStep, circumferenceRadius);

      // Start angle rotates a little per ring to avoid radial alignment
      const offset = (r % 2 === 0 ? 0 : Math.PI / ring.length) - Math.PI / 2;
      for (let i = 0; i < ring.length; i++) {
        const angle = offset + (i / ring.length) * 2 * Math.PI;
        record(ring[i], radius * Math.cos(angle), radius * Math.sin(angle));
      }
    }

    layouts.push({ positions, minX, minY, maxX, maxY });
  }

  // Arrange components horizontally, top-aligned
  const positionMap = new Map<string, { x: number; y: number }>();
  let cursorX = 0;
  for (const layout of layouts) {
    const dx = cursorX - layout.minX;
    const dy = -layout.minY; // top-align at y = 0
    for (const [id, pos] of layout.positions) {
      positionMap.set(id, { x: pos.x + dx, y: pos.y + dy });
    }
    cursorX += (layout.maxX - layout.minX) + componentGap;
  }

  return nodes.map((node) => {
    const pos = positionMap.get(node.id);
    return pos ? { ...node, position: pos } : node;
  });
}

// ---- Compact Layout (Row-packed grid with variable cell sizes) ----
function applyCompactLayout(nodes: Node[], detailLevel?: DetailLevel): Node[] {
  if (nodes.length === 0) return nodes;

  // Sort: tables first, then enums; alphabetical within each group.
  const sortedNodes = [...nodes].sort((a, b) => {
    const typeOrder = (t?: string) => (t === 'tableNode' ? 0 : t === 'enumNode' ? 1 : 2);
    const to = typeOrder(a.type) - typeOrder(b.type);
    if (to !== 0) return to;
    const nameA = String((a.data as any)?.name || a.id);
    const nameB = String((b.data as any)?.name || b.id);
    return nameA.localeCompare(nameB);
  });

  const COL_GAP = 60;
  const ROW_GAP = 50;

  // Compute column count targeting a ~16:9 canvas given the average node footprint.
  const avgW = sortedNodes.reduce((s, n) => s + getNodeWidth(n, detailLevel), 0) / sortedNodes.length;
  const avgH = sortedNodes.reduce((s, n) => s + getNodeHeight(n, detailLevel), 0) / sortedNodes.length;
  const targetAspect = 16 / 9;
  const cols = Math.max(
    1,
    Math.min(
      sortedNodes.length,
      Math.round(Math.sqrt((sortedNodes.length * targetAspect * avgH) / Math.max(1, avgW)))
    )
  );

  // Per-column widths (max width in that column) and per-row heights (max height in that row)
  const colWidths: number[] = new Array(cols).fill(0);
  const rowHeights: number[] = [];

  sortedNodes.forEach((n, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    colWidths[col] = Math.max(colWidths[col], getNodeWidth(n, detailLevel));
    rowHeights[row] = Math.max(rowHeights[row] ?? 0, getNodeHeight(n, detailLevel));
  });

  // Cumulative offsets
  const colOffsets: number[] = [0];
  for (let c = 1; c < cols; c++) {
    colOffsets.push(colOffsets[c - 1] + colWidths[c - 1] + COL_GAP);
  }
  const rowOffsets: number[] = [0];
  for (let r = 1; r < rowHeights.length; r++) {
    rowOffsets.push(rowOffsets[r - 1] + rowHeights[r - 1] + ROW_GAP);
  }

  const positionMap = new Map<string, { x: number; y: number }>();
  sortedNodes.forEach((n, idx) => {
    const col = idx % cols;
    const row = Math.floor(idx / cols);
    // Center each node horizontally within its column (column width = tallest/widest in that column)
    const cellW = colWidths[col];
    const nodeW = getNodeWidth(n, detailLevel);
    positionMap.set(n.id, {
      x: colOffsets[col] + (cellW - nodeW) / 2,
      y: rowOffsets[row],
    });
  });

  return nodes.map((n) => {
    const pos = positionMap.get(n.id);
    return pos ? { ...n, position: pos } : n;
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

export type DetailLevel = 'table-names' | 'keys-only' | 'all-fields';

// ---- Store Definition ----
interface DiagramState {
  nodes: Node[];
  edges: Edge[];
  schema: DbmlSchema | null;
  groupMembership: Record<string, string>;   // tableNodeId → groupNodeId
  collapsedGroups: Record<string, boolean>;   // groupNodeId → true
  detailLevel: DetailLevel;
  hoveredNodeId: string | null;              // Currently hovered node (for edge highlight)

  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  setSchema: (
    schema: DbmlSchema,
    initialPositions?: Record<string, { x: number; y: number }>,
    initialStickyNotes?: { id: string; x: number; y: number; text: string; width?: number; height?: number }[]
  ) => void;
  toggleGroupCollapse: (groupId: string) => void;
  adjustLayout: (algorithm?: 'left-right' | 'snowflake' | 'compact') => void;
  setDetailLevel: (level: DetailLevel) => void;
  setHoveredNodeId: (id: string | null) => void;

  // -- Sticky Note Actions --
  addStickyNote: (position: { x: number; y: number }) => void;
  updateStickyNote: (id: string, data: Partial<{ text: string; x: number; y: number; width?: number; height?: number }>) => void;
  deleteStickyNote: (id: string) => void;
}

import { getVsCodeApi } from '../vscode';

export const useDiagramStore = create<DiagramState>((set, get) => ({
  nodes: [],
  edges: [],
  schema: null,
  groupMembership: {},
  collapsedGroups: {},
  detailLevel: 'all-fields',
  hoveredNodeId: null,

  setHoveredNodeId: (id: string | null) => set({ hoveredNodeId: id }),

  // ──────────────────────────────────────────────
  // Manual Layout Trigger
  // ──────────────────────────────────────────────
  adjustLayout: (algorithm = 'left-right') => {
    const { nodes, edges, groupMembership, detailLevel } = get();
    if (!nodes.length) return;

    // 1. Separate groups and sticky notes from basic nodes
    const basicNodes = nodes.filter(n => n.type !== 'groupNode' && n.type !== 'stickyNoteNode');
    
    // 2. Apply chosen algorithm to basic nodes
    let layoutedBasicNodes: Node[];
    
    switch (algorithm) {
      case 'snowflake':
        layoutedBasicNodes = applySnowflakeLayout(basicNodes, edges, detailLevel);
        break;
      case 'compact':
        layoutedBasicNodes = applyCompactLayout(basicNodes, detailLevel);
        break;
      case 'left-right':
      default:
        layoutedBasicNodes = applyLeftRightLayout(basicNodes, edges, detailLevel);
        break;
    }
    
    // 3. Re-calculate group bounds based on new positions
    let newNodes = [...layoutedBasicNodes];
    const groupIds = nodes.filter(n => n.type === 'groupNode').map(n => n.id);
    
    // Add groups back (they'll be recalced)
    const existingGroups = nodes.filter(n => n.type === 'groupNode');
    newNodes = [...existingGroups, ...newNodes];

    for (const gId of groupIds) {
      newNodes = recalcGroupBounds(newNodes, gId, groupMembership, detailLevel);
    }

    set({ nodes: newNodes });

    // Send the new positions to extension
    const positions: Record<string, { x: number; y: number }> = {};
    for (const n of newNodes) {
      if (n.type !== 'groupNode') {
        positions[n.id] = n.position;
      }
    }
    getVsCodeApi().postMessage({ type: 'updatePositions', positions });
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

    let hasPositionChange = false;

    for (const change of changes) {
      if (change.type === 'position' && change.position) {
        hasPositionChange = true;

        if (change.id.startsWith('group-')) {
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
      newNodes = recalcGroupBounds(newNodes, gId, groupMembership, state.detailLevel);
    }

    set({ nodes: newNodes });

    // 4. Send positions to VS Code if they changed
    if (hasPositionChange) {
      const positions: Record<string, { x: number; y: number }> = {};
      for (const n of newNodes) {
        if (n.type !== 'groupNode') {
          positions[n.id] = n.position;
        }
      }
      getVsCodeApi().postMessage({ type: 'updatePositions', positions });
    }

    // 5. Detect and save sticky notes data if they changed
    const stickyNoteNodes = newNodes.filter(n => n.type === 'stickyNoteNode');
    const stickyNotesData = stickyNoteNodes.map(n => ({
        id: n.id,
        x: n.position.x,
        y: n.position.y,
        text: (n.data as any).text,
        width: (n as any).style?.width,
        height: (n as any).style?.height,
    }));
    
    // Always update sticky notes if there's any change related to them (like dragging or content update)
    if (changes.some(c => stickyNoteNodes.some(sn => sn.id === (c as any).id || (c as any).item?.id === sn.id))) {
        getVsCodeApi().postMessage({ type: 'updateStickyNotes', stickyNotes: stickyNotesData });
    }
  },

  onEdgesChange: (changes) => {
    set({ edges: applyEdgeChanges(changes, get().edges) });
  },

  // ──────────────────────────────────────────────
  // Schema → Nodes + Edges
  // ──────────────────────────────────────────────
  setSchema: (
    schema: DbmlSchema, 
    initialPositions?: Record<string, { x: number; y: number }>,
    initialStickyNotes?: { id: string; x: number; y: number; text: string; width?: number; height?: number }[]
  ) => {
    if (!schema || !schema.tables) {
       set({ nodes: [], edges: [], schema: null, groupMembership: {}, collapsedGroups: {} });
       return;
    }
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // -- Sticky Notes (from persistence) --
    if (initialStickyNotes) {
      for (const note of initialStickyNotes) {
        nodes.push({
          id: note.id,
          type: 'stickyNoteNode',
          position: { x: note.x, y: note.y },
          data: { text: note.text },
          zIndex: 15,
          // Casting to any to avoid NodeBase lint issues if width/height/style are not in the base type
          ...({
            width: note.width || 200,
            height: note.height || 200,
            style: { width: note.width || 200, height: note.height || 200 },
          } as any),
        });
      }
    }

    // -- Table Nodes --
    for (const table of schema.tables) {
      const fullName = table.schema ? `${table.schema}.${table.name}` : table.name;
      const nodeId = `table-${fullName}`;
      
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

      const pos = initialPositions?.[nodeId] || { x: 0, y: 0 };

      nodes.push({
        id: nodeId,
        type: 'tableNode',
        position: pos,
        zIndex: 10,
        data: {
          name: table.name,
          schema: table.schema,
          alias: table.alias,
          columns: enrichedColumns,
          indexes: table.indexes, // Passed directly from AST
          note: table.note,
          headerColor: table.settings?.headerColor,
        },
      });
    }

    // -- Enum Nodes --
    for (const enumDef of schema.enums) {
      const fullName = enumDef.schema ? `${enumDef.schema}.${enumDef.name}` : enumDef.name;
      const nodeId = `enum-${fullName}`;
      const pos = initialPositions?.[nodeId] || { x: 0, y: 0 };

      nodes.push({
        id: nodeId,
        type: 'enumNode',
        position: pos,
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
        zIndex: 5,
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
            zIndex: 5,
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

    // -- Automatic layout only if no stored positions were found --
    const hasAnyStoredPosition = initialPositions && Object.keys(initialPositions).length > 0;
    
    let layoutedNodes = nodes;
    if (!hasAnyStoredPosition) {
      layoutedNodes = applyLeftRightLayout(nodes, edges);
      
      // Send initial layout back to extension for future persistence
      const positions: Record<string, { x: number; y: number }> = {};
      for (const n of layoutedNodes) {
        positions[n.id] = n.position;
      }
      getVsCodeApi().postMessage({ type: 'updatePositions', positions });
    }

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
            style: { ...((node as any).style || {}), width: COLLAPSED_WIDTH, height: COLLAPSED_HEIGHT },
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
      newNodes = recalcGroupBounds(newNodes, groupId, state.groupMembership, state.detailLevel);
    }

    set({ nodes: newNodes, edges: newEdges, collapsedGroups: newCollapsed });
  },

  // ──────────────────────────────────────────────
  // Sticky Notes Actions
  // ──────────────────────────────────────────────
  addStickyNote: (position) => {
    const id = `sticky-${Date.now()}`;
    const newNode: Node = {
      id,
      type: 'stickyNoteNode',
      position,
      width: 200,
      height: 200,
      style: { width: 200, height: 200 },
      data: { text: '' },
      zIndex: 15,
    };

    const newNodes = [...get().nodes, newNode];
    set({ nodes: newNodes });

    // Inform persistence
    const stickyNotesData = newNodes
      .filter(n => n.type === 'stickyNoteNode')
      .map(n => ({
        id: n.id,
        x: n.position.x,
        y: n.position.y,
        text: (n.data as any).text,
        width: (n as any).style?.width,
        height: (n as any).style?.height,
      }));
    getVsCodeApi().postMessage({ type: 'updateStickyNotes', stickyNotes: stickyNotesData });
  },

  updateStickyNote: (id, data) => {
    const newNodes = get().nodes.map((node) => {
      if (node.id === id) {
        const newData = { ...(node.data as any) };
        if (data.text !== undefined) newData.text = data.text;
        
        return {
          ...node,
          position: data.x !== undefined || data.y !== undefined
            ? { x: data.x ?? node.position.x, y: data.y ?? node.position.y }
            : node.position,
          style: {
            ...((node as any).style || {}),
            width: data.width ?? (node as any).style?.width,
            height: data.height ?? (node as any).style?.height,
          },
          data: newData,
        };
      }
      return node;
    });

    set({ nodes: newNodes });

    // Inform persistence
    const stickyNotesData = newNodes
      .filter(n => n.type === 'stickyNoteNode')
      .map(n => ({
        id: n.id,
        x: n.position.x,
        y: n.position.y,
        text: (n.data as any).text,
        width: (n as any).style?.width,
        height: (n as any).style?.height,
      }));
    getVsCodeApi().postMessage({ type: 'updateStickyNotes', stickyNotes: stickyNotesData });
  },

  deleteStickyNote: (id) => {
    const newNodes = get().nodes.filter((node) => node.id !== id);
    set({ nodes: newNodes });

    // Inform persistence
    const stickyNotesData = newNodes
      .filter(n => n.type === 'stickyNoteNode')
      .map(n => ({
        id: n.id,
        x: n.position.x,
        y: n.position.y,
        text: (n.data as any).text,
        width: (n as any).style?.width,
        height: (n as any).style?.height,
      }));
    getVsCodeApi().postMessage({ type: 'updateStickyNotes', stickyNotes: stickyNotesData });
  },

  setDetailLevel: (level: DetailLevel) => {
    const { nodes, groupMembership } = get();
    
    // 1. Update level first
    set({ detailLevel: level });
    
    // 2. Identify all groups (even non-collapsed ones) and recalc bounds
    const groupIds = nodes.filter(n => n.type === 'groupNode').map(n => n.id);
    let newNodes = [...nodes];
    
    for (const gId of groupIds) {
      newNodes = recalcGroupBounds(newNodes, gId, groupMembership, level);
    }
    
    set({ nodes: newNodes });
  },
}));
