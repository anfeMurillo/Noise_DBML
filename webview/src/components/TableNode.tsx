// ============================================================
// TableNode — Custom React Flow Node for Database Tables
// ============================================================

import React, { memo } from 'react';
import { Handle, Position, useEdges, type NodeProps } from '@xyflow/react';

interface ColumnData {
  name: string;
  type: string;
  isEnum?: boolean;
  enumData?: {
    name: string;
    schema?: string;
    values: { name: string; note?: string }[];
  };
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

interface IndexNode {
  columns: { value: string; isExpression: boolean }[];
  settings: { unique: boolean; pk: boolean; type?: 'btree' | 'hash'; name?: string };
}

interface TableNodeData {
  name: string;
  schema?: string;
  alias?: string;
  columns: ColumnData[];
  indexes?: IndexNode[];
  note?: string;
  headerColor?: string;
  [key: string]: unknown;
}

function TableNode({ id, data }: NodeProps) {
  const { name, schema, alias, columns, indexes, note, headerColor } = data as unknown as TableNodeData;
  const displayName = alias ? `${name} (${alias})` : name;
  const fullName = schema ? `${schema}.${displayName}` : displayName;

  // Track connected handles for conditional visibility
  const edges = useEdges();
  const connectedHandleIds = React.useMemo(() => {
    const connected = new Set<string>();
    for (const edge of edges) {
      if (edge.source === id && edge.sourceHandle) connected.add(edge.sourceHandle);
      if (edge.target === id && edge.targetHandle) connected.add(edge.targetHandle);
    }
    return connected;
  }, [edges, id]);

  const hasIndexes = indexes && indexes.length > 0;

  return (
    <div className="table-node">
      {/* Header */}
      <div
        className="table-node__header"
        style={headerColor ? { background: headerColor } : undefined}
      >
        <div className="flex items-center gap-1.5 overflow-hidden">
          <span className="table-node__header-icon text-sm">🗃️</span>
          <span className="truncate">{fullName}</span>
        </div>
      </div>

      {/* Columns */}
      <div className="table-node__columns">
        {columns && columns.length > 0 ? (
          columns.map((col, idx) => {
            const hasSpecialInfo = col.isEnum || col.settings.default || col.settings.note;
            
            return (
              <div key={idx} className="table-node__column group/column">
                {/* Row-level handles on left side */}
                <Handle
                  type="target"
                  position={Position.Left}
                  id={`${col.name}-left-target`}
                  className={connectedHandleIds.has(`${col.name}-left-target`) ? 'handle-connected' : undefined}
                  style={{ left: -4, top: '50%' }}
                />
                <Handle
                  type="source"
                  position={Position.Left}
                  id={`${col.name}-left-source`}
                  className={connectedHandleIds.has(`${col.name}-left-source`) ? 'handle-connected' : undefined}
                  style={{ left: -4, top: '50%', visibility: connectedHandleIds.has(`${col.name}-left-source`) ? 'visible' : 'hidden' }}
                />

                {/* Icon */}
                <span className="table-node__col-icon">
                  {col.settings.primaryKey ? '🔑' : col.settings.ref ? '🔗' : '○'}
                </span>

                {/* Name & Note Icon */}
                <div className="flex items-center gap-1 flex-1 overflow-hidden">
                  <span className="table-node__col-name">{col.name}</span>
                  {col.settings.note && (
                    <span className="text-[10px] opacity-40">📄</span>
                  )}
                </div>

                {/* Type */}
                <span className="table-node__col-type">{col.type}</span>

                {/* Badges */}
                <div className="table-node__col-badges">
                  {col.isEnum && (
                    <span className="table-node__badge bg-purple-500/20 text-purple-400 border border-purple-500/30">E</span>
                  )}
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

                {/* Field Tooltip / Popover */}
                {hasSpecialInfo && (
                  <div className="field-info-popover">
                    <div className="field-info-popover__header">
                      <span className="font-bold">{col.name}</span>
                      <span className="text-green-400 ml-2">{col.type}</span>
                    </div>
                    
                    <div className="field-info-popover__content">
                      {col.isEnum && col.enumData && (
                        <div className="mb-2">
                          <div className="text-red-400 font-bold mb-1 uppercase text-[9px]">Enum {col.enumData.schema ? `${col.enumData.schema}.${col.enumData.name}` : col.enumData.name}:</div>
                          <div className="pl-2 space-y-0.5 border-l border-white/10 ml-1">
                            {col.enumData.values.map(v => (
                              <div key={v.name} className="text-blue-400">{v.name}</div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {col.settings.default && (
                        <div className="mt-2 flex gap-1 items-center">
                          <span className="text-red-400 font-bold uppercase text-[9px]">Default:</span>
                          <span className="text-white/80">{col.settings.default}</span>
                        </div>
                      )}

                      {col.settings.note && (
                        <div className="mt-2 pt-2 border-t border-white/10 text-white/70 italic text-[11px] leading-relaxed">
                          {col.settings.note}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Row-level handles on right side */}
                <Handle
                  type="source"
                  position={Position.Right}
                  id={`${col.name}-right-source`}
                  className={connectedHandleIds.has(`${col.name}-right-source`) ? 'handle-connected' : undefined}
                  style={{ right: -4, top: '50%' }}
                />
                <Handle
                  type="target"
                  position={Position.Right}
                  id={`${col.name}-right-target`}
                  className={connectedHandleIds.has(`${col.name}-right-target`) ? 'handle-connected' : undefined}
                  style={{ right: -4, top: '50%', visibility: connectedHandleIds.has(`${col.name}-right-target`) ? 'visible' : 'hidden' }}
                />
              </div>
            );
          })
        ) : (
          <div className="table-node__column" style={{ opacity: 0.4 }}>
            <span className="table-node__col-icon">○</span>
            <span className="table-node__col-name">No columns</span>
          </div>
        )}
      </div>

      {/* Indexes */}
      {hasIndexes && (
        <div className="table-node__indexes">
          <div className="table-node__indexes-title">
            <span>⚡</span> Indexes
          </div>
          <div className="space-y-0.5">
            {indexes.map((idx, i) => {
              const colNames = idx.columns.map(c => c.value).join(', ');
              return (
                <div key={i} className="table-node__index-item group/index">
                  <span className="table-node__index-cols">
                    ({colNames})
                  </span>
                  <div className="table-node__index-badges">
                    {idx.settings.unique && <span className="table-node__index-badge">UQ</span>}
                    {idx.settings.pk && <span className="table-node__index-badge">PK</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Table Note at bottom - strictly for table note */}
      {note && (
        <div className="table-node__footer-note">
          <span className="table-node__footer-note-icon">📄</span> {note}
        </div>
      )}
    </div>
  );
}

export default memo(TableNode);
