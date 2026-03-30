// ============================================================
// App — Root Component
// ============================================================

import React, { useCallback } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import Canvas from './components/Canvas';
import { useVSCodeMessaging } from './hooks/useVSCodeMessaging';
import { useDiagramStore } from './store/useStore';

export default function App() {
  const setSchema = useDiagramStore((s) => s.setSchema);

  const handleMessage = useCallback(
    (message: any) => {
      if (message.type === 'update' && message.schema) {
        setSchema(message.schema, message.positions);
      }
    },
    [setSchema]
  );

  useVSCodeMessaging(handleMessage);

  return (
    <ReactFlowProvider>
      <div style={{ width: '100%', height: '100vh' }}>
        <Canvas />
      </div>
    </ReactFlowProvider>
  );
}
