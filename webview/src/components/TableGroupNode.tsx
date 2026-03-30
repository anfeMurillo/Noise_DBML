// ============================================================
// TableGroupNode — Custom React Flow Node for Table Groups
// ============================================================

import React, { memo, useCallback } from 'react';
import { type NodeProps } from '@xyflow/react';
import { useDiagramStore } from '../store/useStore';

interface TableGroupNodeData {
  name: string;
  color?: string;
  tableCount: number;
  collapsed: boolean;
  [key: string]: unknown;
}

function hexToRgba(hex: string, alpha: number): string {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function TableGroupNode({ id, data }: NodeProps) {
  const { name, color, tableCount, collapsed } = data as unknown as TableGroupNodeData;
  const toggleCollapse = useDiagramStore((s) => s.toggleGroupCollapse);
  const bgColor = color || '#4a9eff';

  const handleCollapse = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleCollapse(id);
    },
    [id, toggleCollapse]
  );

  const cssVars = {
    '--group-color': bgColor,
    '--group-bg': hexToRgba(bgColor, 0.06),
    '--group-border': hexToRgba(bgColor, 0.35),
    '--group-header-bg': hexToRgba(bgColor, 0.12),
    '--group-header-border': hexToRgba(bgColor, 0.25),
  } as React.CSSProperties;

  return (
    <div
      className={`group-node ${collapsed ? 'group-node--collapsed' : ''}`}
      style={cssVars}
    >
      {/* Header — serves as drag handle */}
      <div className="group-node__header">
        <div className="group-node__header-left">
          <span className="group-node__icon">📦</span>
          <span className="group-node__name">{name}</span>
          <span className="group-node__count">{tableCount}</span>
        </div>
        <button
          className="group-node__collapse-btn"
          onClick={handleCollapse}
          title={collapsed ? 'Expand group' : 'Collapse group'}
        >
          {collapsed ? '▶' : '▼'}
        </button>
      </div>

      {/* Transparent body — just for visual sizing */}
      {!collapsed && <div className="group-node__body" />}

      {/* Collapsed info */}
      {collapsed && (
        <div className="group-node__collapsed-info">
          {tableCount} table{tableCount !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}

export default memo(TableGroupNode);
