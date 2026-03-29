// ============================================================
// VS Code Messaging Hook
// ============================================================

import { useEffect, useRef, useCallback } from 'react';

interface VsCodeApi {
  postMessage(message: unknown): void;
  getState(): unknown;
  setState(state: unknown): void;
}

let vscodeApi: VsCodeApi | null = null;

function getVsCodeApi(): VsCodeApi {
  if (!vscodeApi) {
    // @ts-ignore — acquireVsCodeApi is injected by VS Code
    vscodeApi = acquireVsCodeApi();
  }
  return vscodeApi!;
}

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
