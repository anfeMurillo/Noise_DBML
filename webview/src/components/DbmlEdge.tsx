import {
  BaseEdge,
  EdgeLabelRenderer,
  getSmoothStepPath,
  useStore,
  type EdgeProps,
} from '@xyflow/react';
import { useDiagramStore } from '../store/useStore';

export default function DbmlEdge(props: EdgeProps) {
  const {
    id,
    source,
    target,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    label,
    markerEnd,
    style = {},
    data,
  } = props;

  // Highlight this edge when either of its endpoints is hovered or selected.
  const hoveredNodeId = useDiagramStore((s) => s.hoveredNodeId);
  const isConnectedNodeSelected = useStore((s) => {
    const src = s.nodeLookup.get(source);
    const tgt = s.nodeLookup.get(target);
    return !!(src?.selected || tgt?.selected);
  });

  const isConnectedNodeHovered =
    hoveredNodeId !== null && (source === hoveredNodeId || target === hoveredNodeId);

  const highlighted = isConnectedNodeHovered || isConnectedNodeSelected;

  // Colors: gray by default, blue when the connected table is hovered/selected.
  const highlightColor = (data?.color as string) || 'var(--edge-color)';
  const inactiveColor = 'var(--edge-color-inactive)';
  const edgeColor = highlighted ? highlightColor : inactiveColor;

  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    borderRadius: 12,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: edgeColor,
          strokeWidth: highlighted ? 2.25 : 1.75,
          transition: 'stroke 0.15s ease, stroke-width 0.15s ease',
        }}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <div className="dbml-edge-label">
              {label}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
