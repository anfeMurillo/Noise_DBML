import React from 'react';
import { Panel, useReactFlow, getNodesBounds } from '@xyflow/react';
import { useDiagramStore } from '../store/useStore';
import { toPng } from 'html-to-image';
import { useVSCodeMessaging } from '../hooks/useVSCodeMessaging';

export default function Toolbar() {
  const adjustLayout = useDiagramStore((s) => s.adjustLayout);
  const { getNodes } = useReactFlow();
  const { postMessage } = useVSCodeMessaging(() => {});

  const onSave = async () => {
    const nodes = getNodes();
    if (nodes.length === 0) {
      postMessage({
        type: 'error',
        text: 'The diagram is empty, nothing to save.',
      });
      return;
    }

    const bounds = getNodesBounds(nodes);
    const element = document.querySelector('.react-flow__viewport') as HTMLElement;

    if (!element) {
      postMessage({
        type: 'error',
        text: 'Internal error: Could not find diagram viewport.',
      });
      return;
    }

    const padding = 50;
    const width = bounds.width + padding * 2;
    const height = bounds.height + padding * 2;

    try {
      // Create a high-quality PNG
      const dataUrl = await toPng(element, {
        backgroundColor: '#1e1e1e',
        width: width,
        height: height,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${-(bounds.x - padding)}px, ${-(bounds.y - padding)}px) scale(1)`,
        },
        pixelRatio: 2, // Better resolution (e.g. for retina or printing)
        skipFonts: false, // Some webviews fail if fonts cannot be loaded; try true if still failing
        cacheBust: true,
      });

      postMessage({
        type: 'saveImage',
        dataUrl,
      });
    } catch (err: any) {
      console.error('Failed to export diagram image:', err);
      postMessage({
        type: 'error',
        text: `Failed to save image: ${err.message || 'Error occurred during PNG generation'}.`,
      });
    }
  };

  return (
    <Panel position="top-right" className="canvas-toolbar">
      <div className="toolbar-group">
        <button 
          className="toolbar-btn" 
          onClick={adjustLayout}
          title="Auto Arrange Nodes"
        >
          <span>Auto Arrange</span>
        </button>

        <button 
          className="toolbar-btn" 
          onClick={onSave}
          title="Save Diagram as PNG"
        >
          <span>Save Diagram</span>
        </button>
      </div>
    </Panel>
  );
}
