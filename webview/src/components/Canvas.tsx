// ============================================================
// Canvas — React Flow Wrapper Component
// ============================================================

import React from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
} from '@xyflow/react';
import { useDiagramStore } from '../store/useStore';
import TableNode from './TableNode';
import EnumNode from './EnumNode';

const nodeTypes = {
  tableNode: TableNode,
  enumNode: EnumNode,
};

export default function Canvas() {
  const { nodes, edges, onNodesChange, onEdgesChange } = useDiagramStore();

  if (nodes.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state__icon">🗄️</div>
        <div className="empty-state__title">No DBML diagram</div>
        <div className="empty-state__subtitle">
          Open a <strong>.dbml</strong> file to see the ER diagram rendered here.
        </div>
      </div>
    );
  }

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.1}
      maxZoom={2}
      proOptions={{ hideAttribution: true }}
      defaultEdgeOptions={{
        type: 'smoothstep',
        animated: false,
      }}
    >
      <Background
        variant={BackgroundVariant.Dots}
        gap={20}
        size={1}
        color="var(--node-border)"
      />
      <Controls
        showInteractive={false}
        style={{ bottom: 12, left: 12 }}
      />
      <MiniMap
        nodeStrokeWidth={3}
        zoomable
        pannable
        style={{ bottom: 12, right: 12 }}
      />
    </ReactFlow>
  );
}
