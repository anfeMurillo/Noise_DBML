/**
 * Singleton for the VS Code API
 */
export interface VsCodeApi {
  postMessage(message: unknown): void;
  getState(): unknown;
  setState(state: unknown): void;
}

let vscodeApi: VsCodeApi | null = null;

export function getVsCodeApi(): VsCodeApi {
  if (!vscodeApi) {
    try {
      // @ts-ignore — acquireVsCodeApi is injected by VS Code
      vscodeApi = acquireVsCodeApi();
    } catch (e) {
      console.warn('acquireVsCodeApi could not be called. Using fallback.', e);
      vscodeApi = {
        postMessage: (msg) => console.log('VSCode PostMessage:', msg),
        getState: () => ({}),
        setState: () => {},
      };
    }
  }
  return vscodeApi!;
}
