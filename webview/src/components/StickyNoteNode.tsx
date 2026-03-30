import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { useDiagramStore } from '../store/useStore';

export interface StickyNoteNodeData {
  text: string;
  onChange?: (text: string) => void;
  onDelete?: () => void;
}

export function StickyNoteNode({ id, data, selected }: NodeProps) {
  const [text, setText] = useState(data.text as string || '');
  const updateStickyNote = useDiagramStore((s) => s.updateStickyNote);
  const deleteStickyNote = useDiagramStore((s) => s.deleteStickyNote);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    updateStickyNote(id, { text: newText });
  };

  const handleDelete = useCallback(() => {
    deleteStickyNote(id);
  }, [id, deleteStickyNote]);

  return (
    <div className={`sticky-note-node ${selected ? 'selected' : ''}`}>
        <NodeResizer 
            minWidth={100} 
            minHeight={100} 
            isVisible={selected} 
            lineClassName="sticky-note-resizer-line"
            handleClassName="sticky-note-resizer-handle"
        />
      <div className="sticky-note-header">
        <button className="sticky-note-delete" onClick={handleDelete}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <textarea
        className="sticky-note-content"
        value={text}
        onChange={handleTextChange}
        placeholder="Type something..."
      />
      {/* No handles needed as sticky notes are usually free floating, 
          but adding them as invisible to avoid warnings if needed */}
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
      
      <style>{`
        .sticky-note-node {
          background: #fff3a0;
          border: 1px solid #e6db8e;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          padding: 8px;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          min-width: 150px;
          min-height: 150px;
          width: 100%;
          height: 100%;
          transition: box-shadow 0.2s;
          position: relative;
        }
        .sticky-note-node.selected {
          box-shadow: 0 0 0 2px #ffba00, 0 8px 12px rgba(0,0,0,0.15);
        }
        .sticky-note-header {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 4px;
          height: 18px;
        }
        .sticky-note-delete {
          background: transparent;
          border: none;
          cursor: pointer;
          color: #9b8c2d;
          padding: 2px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sticky-note-delete:hover {
          background: rgba(0,0,0,0.05);
          color: #d32f2f;
        }
        .sticky-note-content {
          flex: 1;
          background: transparent;
          border: none;
          resize: none;
          font-family: inherit;
          font-size: 14px;
          color: #444;
          outline: none;
          padding: 0;
          line-height: 1.4;
        }
        .sticky-note-resizer-line {
            border-color: #ffba00;
        }
        .sticky-note-resizer-handle {
            background: #fff;
            border: 2px solid #ffba00;
            border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
