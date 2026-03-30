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

const IconStickyNote = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3z" />
    <path d="M15 3v6h6" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="12" y2="17" />
  </svg>
);

const IconTableNames = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
  </svg>
);

const IconKeysOnly = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5" />
    <path d="m21 2-9.6 12.1" />
    <path d="m19 10 2-2" />
    <path d="m16 7 2-2" />
  </svg>
);

const IconAllFields = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 14h18" />
    <path d="M3 19h18" />
    <path d="M9 9v10" />
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconChevronUp = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m18 15-6-6-6 6"/>
    </svg>
);

export default function Toolbar() {
  const adjustLayout = useDiagramStore((s) => s.adjustLayout);
  const addStickyNote = useDiagramStore((s) => s.addStickyNote);
  const detailLevel = useDiagramStore((s) => s.detailLevel);
  const setDetailLevel = useDiagramStore((s) => s.setDetailLevel);

  const { getNodes, screenToFlowPosition, getViewport } = useReactFlow();
  const { postMessage } = useVSCodeMessaging(() => {});
  
  const [arrangeMenuOpen, setArrangeMenuOpen] = useState(false);
  const [detailMenuOpen, setDetailMenuOpen] = useState(false);
  
  const arrangeMenuRef = useRef<HTMLDivElement>(null);
  const detailMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (arrangeMenuRef.current && !arrangeMenuRef.current.contains(event.target as Node)) {
        setArrangeMenuOpen(false);
      }
      if (detailMenuRef.current && !detailMenuRef.current.contains(event.target as Node)) {
        setDetailMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const onSelectAlgorithm = React.useCallback((algo: 'left-right' | 'snowflake' | 'compact') => {
    adjustLayout(algo);
    setArrangeMenuOpen(false);
  }, [adjustLayout]);

  const onSelectDetailLevel = (level: 'table-names' | 'keys-only' | 'all-fields') => {
    setDetailLevel(level);
    setDetailMenuOpen(false);
  };

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

  const onAddStickyNote = () => {
    const viewport = getViewport();
    // Center of the current view
    const center = screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    addStickyNote({ x: center.x - 100, y: center.y - 100 });
  };

  const getDetailLevelLabel = () => {
    switch (detailLevel) {
      case 'table-names': return 'Table names';
      case 'keys-only': return 'Keys only';
      case 'all-fields': return 'All fields';
    }
  };

  const getDetailLevelIcon = () => {
    switch (detailLevel) {
      case 'table-names': return <IconTableNames />;
      case 'keys-only': return <IconKeysOnly />;
      case 'all-fields': return <IconAllFields />;
    }
  };

  return (
    <Panel position="top-right" className="canvas-toolbar">
      <div className="toolbar-group">
        {/* Detail Level Menu */}
        <div className="layout-menu-container" ref={detailMenuRef}>
          <button 
            className={`toolbar-btn ${detailMenuOpen ? 'toolbar-btn--active' : ''}`}
            onClick={() => setDetailMenuOpen(!detailMenuOpen)}
            title="Diagram Detail Level"
          >
            <span>Detail level:</span>
            <div className="flex items-center gap-1.5 ml-1 text-blue-400 font-medium">
                {getDetailLevelIcon()}
                <IconChevronUp />
            </div>
          </button>

          {detailMenuOpen && (
            <div className="layout-menu detail-menu">
              <h3 className="layout-menu__title border-b border-white/10 pb-2 mb-2">Detail level</h3>
              
              <div 
                className={`layout-option ${detailLevel === 'table-names' ? 'layout-option--active' : ''}`} 
                onClick={() => onSelectDetailLevel('table-names')}
              >
                <div className="layout-option__icon"><IconTableNames /></div>
                <div className="layout-option__content">
                  <div className="layout-option__name">Table names</div>
                </div>
                {detailLevel === 'table-names' && <div className="text-blue-400"><IconCheck /></div>}
              </div>

              <div 
                className={`layout-option ${detailLevel === 'keys-only' ? 'layout-option--active' : ''}`} 
                onClick={() => onSelectDetailLevel('keys-only')}
              >
                <div className="layout-option__icon"><IconKeysOnly /></div>
                <div className="layout-option__content">
                  <div className="layout-option__name">Keys only</div>
                </div>
                {detailLevel === 'keys-only' && <div className="text-blue-400"><IconCheck /></div>}
              </div>

              <div 
                className={`layout-option ${detailLevel === 'all-fields' ? 'layout-option--active' : ''}`} 
                onClick={() => onSelectDetailLevel('all-fields')}
              >
                <div className="layout-option__icon"><IconAllFields /></div>
                <div className="layout-option__content">
                  <div className="layout-option__name">All fields</div>
                </div>
                {detailLevel === 'all-fields' && <div className="text-blue-400"><IconCheck /></div>}
              </div>
            </div>
          )}
        </div>

        <div className="toolbar-divider" />

        <div className="layout-menu-container" ref={arrangeMenuRef}>
          <button 
            className={`toolbar-btn ${arrangeMenuOpen ? 'toolbar-btn--active' : ''}`}
            onClick={() => setArrangeMenuOpen(!arrangeMenuOpen)}
            title="Auto Arrange Algorithms"
          >
            <IconArrange />
            <span>Auto Arrange</span>
          </button>

          {arrangeMenuOpen && (
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
          onClick={onAddStickyNote}
          title="Add Sticky Note"
        >
          <IconStickyNote />
          <span>Sticky Note</span>
        </button>

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
