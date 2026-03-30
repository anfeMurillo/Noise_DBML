// ============================================================
// EnumNode — Custom React Flow Node for Enums
// ============================================================

import React, { memo } from 'react';
import { Handle, Position, useEdges, type NodeProps } from '@xyflow/react';

interface EnumNodeData {
  name: string;
  schema?: string;
  values: { name: string; note?: string }[];
  [key: string]: unknown;
}

function EnumNode({ id, data }: NodeProps) {
  const { name, schema, values } = data as unknown as EnumNodeData;
  const fullName = schema ? `${schema}.${name}` : name;

  // Track connected handles for conditional visibility
  const edges = useEdges();
  const connectedHandleIds = React.useMemo(() => {
    const connected = new Set<string>();
    for (const edge of edges) {
      if (edge.source === id) connected.add('source');
      if (edge.target === id) connected.add('target');
    }
    return connected;
  }, [edges, id]);

  return (
    <div className="enum-node group/enum">
      {/* Header */}
      <div className="enum-node__header">
        <span style={{ fontSize: 14, opacity: 0.85 }}>◆</span>
        <span>enum {fullName}</span>
      </div>

      {/* Values */}
      <div className="enum-node__values">
        {values && values.length > 0 ? (
          values.map((val, idx) => (
            <div key={idx} className="enum-node__value" title={val.note || undefined}>
              <span className="enum-node__value-dot" />
              <span>{val.name}</span>
              {val.note && (
                <span style={{ opacity: 0.4, fontSize: 10, marginLeft: 'auto' }}>
                  💬
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="enum-node__value" style={{ opacity: 0.4 }}>
            <span className="enum-node__value-dot" />
            <span>No values</span>
          </div>
        )}
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className={connectedHandleIds.has('target') ? 'handle-connected' : undefined}
      />
      <Handle
        type="source"
        position={Position.Right}
        className={connectedHandleIds.has('source') ? 'handle-connected' : undefined}
      />
    </div>
  );
}

export default memo(EnumNode);
