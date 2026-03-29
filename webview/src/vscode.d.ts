// Type declaration for the VS Code API injected into webviews
interface VsCodeApi {
  postMessage(message: unknown): void;
  getState(): unknown;
  setState(state: unknown): void;
}

declare function acquireVsCodeApi(): VsCodeApi;

interface Window {
  vscodeApi?: VsCodeApi;
}
