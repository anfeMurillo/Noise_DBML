import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getEdgeCenter,
  type EdgeProps,
} from '@xyflow/react';

export default function SelfReferenceEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  markerEnd,
  markerStart,
  style,
}: EdgeProps) {
  // Use a square "staple" path for reliability
  // Goes: Right -> Out -> Up -> Left -> In -> Target
  const offset = 24;
  const loopHeight = 60;
  const loopY = Math.min(sourceY, targetY) - loopHeight;

  const path = `M ${sourceX},${sourceY} 
                L ${sourceX + offset},${sourceY} 
                L ${sourceX + offset},${loopY} 
                L ${targetX - offset},${loopY} 
                L ${targetX - offset},${targetY} 
                L ${targetX},${targetY}`;

  // Custom label position above the shared top
  const labelX = (sourceX + targetX) / 2;
  const labelY = loopY - 14;

  // Debug style to confirm component activation
  const debugStyle = {
    ...style,
    stroke: '#e67e22', // Bright orange
    strokeWidth: 2.5,
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        markerStart={markerStart}
        style={debugStyle}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              fontSize: 10,
              pointerEvents: 'none', // Critical fix: don't block clicks to the table below
              background: '#e67e22',
              color: '#fff',
              padding: '2px 6px',
              borderRadius: 4,
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              zIndex: 50,
            }}
            className="nodrag nopan"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
