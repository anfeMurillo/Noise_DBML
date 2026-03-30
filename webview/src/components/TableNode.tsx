// ============================================================
// TableNode — Custom React Flow Node for Database Tables
// ============================================================

import React, { memo } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';

interface ColumnData {
  name: string;
  type: string;
  settings: {
    primaryKey: boolean;
    notNull: boolean;
    unique: boolean;
    increment: boolean;
    default?: string;
    note?: string;
    ref?: { type: string; table: string };
  };
}

interface TableNodeData {
  name: string;
  schema?: string;
  alias?: string;
  columns: ColumnData[];
  note?: string;
  headerColor?: string;
  [key: string]: unknown;
}

function TableNode({ data }: NodeProps) {
  const { name, schema, alias, columns, note, headerColor } = data as unknown as TableNodeData;
  const displayName = alias ? `${name} (${alias})` : name;
  const fullName = schema ? `${schema}.${displayName}` : displayName;

  return (
    <div className="table-node">
      {/* Header */}
      <div
        className="table-node__header"
        style={headerColor ? { background: headerColor } : undefined}
      >
        <span className="table-node__header-icon">🗃️</span>
        <span>{fullName}</span>
      </div>

      {/* Columns */}
      <div className="table-node__columns">
        {columns && columns.length > 0 ? (
          columns.map((col, idx) => (
            <div key={idx} className="table-node__column">
              {/* Row-level handles on left side */}
              <Handle
                type="target"
                position={Position.Left}
                id={`${col.name}-left-target`}
                style={{ left: -4, top: '50%' }}
              />
              <Handle
                type="source"
                position={Position.Left}
                id={`${col.name}-left-source`}
                style={{ left: -4, top: '50%', visibility: 'hidden' }} // Only show on hover or connection? No, keep it for auto-connect
              />

              {/* Icon */}
              <span className="table-node__col-icon">
                {col.settings.primaryKey ? '🔑' : col.settings.ref ? '🔗' : '○'}
              </span>

              {/* Name */}
              <span className="table-node__col-name">{col.name}</span>

              {/* Type */}
              <span className="table-node__col-type">{col.type}</span>

              {/* Badges */}
              <div className="table-node__col-badges">
                {col.settings.primaryKey && (
                  <span className="table-node__badge badge--pk">PK</span>
                )}
                {col.settings.ref && (
                  <span className="table-node__badge badge--fk">FK</span>
                )}
                {col.settings.unique && !col.settings.primaryKey && (
                  <span className="table-node__badge badge--unique">UQ</span>
                )}
                {col.settings.notNull && !col.settings.primaryKey && (
                  <span className="table-node__badge badge--nn">NN</span>
                )}
              </div>

              {/* Row-level handles on right side */}
              <Handle
                type="source"
                position={Position.Right}
                id={`${col.name}-right-source`}
                style={{ right: -4, top: '50%' }}
              />
              <Handle
                type="target"
                position={Position.Right}
                id={`${col.name}-right-target`}
                style={{ right: -4, top: '50%', visibility: 'hidden' }}
              />
            </div>
          ))
        ) : (
          <div className="table-node__column" style={{ opacity: 0.4 }}>
            <span className="table-node__col-icon">○</span>
            <span className="table-node__col-name">No columns</span>
          </div>
        )}
      </div>

      {/* Note tooltip */}
      {note && (
        <div
          style={{
            padding: '4px 12px 6px',
            fontSize: '10px',
            opacity: 0.5,
            borderTop: '1px solid var(--node-border)',
          }}
        >
          📝 {note}
        </div>
      )}

      {/* Handles are now row-level */}
    </div>
  );
}

export default memo(TableNode);
