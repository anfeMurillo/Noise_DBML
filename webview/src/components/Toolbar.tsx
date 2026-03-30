import React, { useState, useRef, useEffect } from 'react';
import { Panel, useReactFlow, getNodesBounds } from '@xyflow/react';
import { useDiagramStore } from '../store/useStore';
import { toPng } from 'html-to-image';
import { useVSCodeMessaging } from '../hooks/useVSCodeMessaging';

// --- Icons ---
const IconLeftRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 12h16M4 18h16" />
    <path d="M16 3l3 3-3 3M8 9l-3-3 3-3" />
  </svg>
);

const IconSnowflake = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const IconCompact = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconArrange = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21 10-5-5-5 5M3 14l5 5 5-5M3 4v16M21 4v16" />
  </svg>
);

const IconSave = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);

export default function Toolbar() {
  const adjustLayout = useDiagramStore((s) => s.adjustLayout);
  const { getNodes } = useReactFlow();
  const { postMessage } = useVSCodeMessaging(() => {});
  
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSelectAlgorithm = React.useCallback((algo: 'left-right' | 'snowflake' | 'compact') => {
    adjustLayout(algo);
    setMenuOpen(false);
  }, [adjustLayout]);

  // Keyboard shortcuts for algorithms
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only if not in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;
      
      if (e.key === '1') onSelectAlgorithm('left-right');
      if (e.key === '2') onSelectAlgorithm('snowflake');
      if (e.key === '3') onSelectAlgorithm('compact');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSelectAlgorithm]);

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
      const dataUrl = await toPng(element, {
        backgroundColor: '#1e1e1e',
        width: width,
        height: height,
        style: {
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${-(bounds.x - padding)}px, ${-(bounds.y - padding)}px) scale(1)`,
        },
        pixelRatio: 2,
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
        <div className="layout-menu-container" ref={menuRef}>
          <button 
            className={`toolbar-btn ${menuOpen ? 'toolbar-btn--active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            title="Auto Arrange Algorithms"
          >
            <IconArrange />
            <span>Auto Arrange</span>
          </button>

          {menuOpen && (
            <div className="layout-menu">
              <h3 className="layout-menu__title">Choose auto arrange algorithm</h3>
              
              <div className="layout-option" onClick={() => onSelectAlgorithm('left-right')}>
                <div className="layout-option__icon"><IconLeftRight /></div>
                <div className="layout-option__content">
                  <div className="layout-option__name">Left-right</div>
                  <div className="layout-option__description">
                    Arrange tables from left to right based on relationship direction.
                  </div>
                </div>
                <div className="layout-option__hotkey">1</div>
              </div>

              <div className="layout-option" onClick={() => onSelectAlgorithm('snowflake')}>
                <div className="layout-option__icon"><IconSnowflake /></div>
                <div className="layout-option__content">
                  <div className="layout-option__name">Snowflake</div>
                  <div className="layout-option__description">
                    Arrange in a snowflake shape, with most connected tables in center.
                  </div>
                </div>
                <div className="layout-option__hotkey">2</div>
              </div>

              <div className="layout-option" onClick={() => onSelectAlgorithm('compact')}>
                <div className="layout-option__icon"><IconCompact /></div>
                <div className="layout-option__content">
                  <div className="layout-option__name">Compact</div>
                  <div className="layout-option__description">
                    Arrange tables in a compact rectangle grid layout.
                  </div>
                </div>
                <div className="layout-option__hotkey">3</div>
              </div>
            </div>
          )}
        </div>

        <button 
          className="toolbar-btn" 
          onClick={onSave}
          title="Save Diagram as PNG"
        >
          <IconSave />
          <span>Save Diagram</span>
        </button>
      </div>
    </Panel>
  );
}
