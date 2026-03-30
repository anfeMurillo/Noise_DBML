// ============================================================
// VS Code Messaging Hook
// ============================================================

import { useEffect, useRef, useCallback } from 'react';
import { getVsCodeApi } from '../vscode';

type MessageHandler = (message: any) => void;

export function useVSCodeMessaging(onMessage: MessageHandler) {
  const handlerRef = useRef<MessageHandler>(onMessage);
  handlerRef.current = onMessage;

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      handlerRef.current(event.data);
    };

    window.addEventListener('message', handler);

    // Notify the extension host that we're ready
    getVsCodeApi().postMessage({ type: 'ready' });

    return () => {
      window.removeEventListener('message', handler);
    };
  }, []);

  const postMessage = useCallback((message: unknown) => {
    getVsCodeApi().postMessage(message);
  }, []);

  return { postMessage };
}
