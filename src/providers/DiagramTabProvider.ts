// ============================================================
// DiagramTab — WebviewPanel (new editor tab) for ER diagrams
// ============================================================

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { parseDbml } from '../parser/visitor';

export class DiagramTabProvider {
  /** Map from file path → open WebviewPanel */
  private static _panels = new Map<string, vscode.WebviewPanel>();

  constructor(private readonly _extensionUri: vscode.Uri) {}

  /**
   * Opens (or re-focuses) a diagram tab for the given .dbml file URI.
   */
  public openForFile(fileUri: vscode.Uri): void {
    const filePath = fileUri.fsPath;
    const fileName = path.basename(filePath);

    // If a panel already exists for this file, reveal it
    const existing = DiagramTabProvider._panels.get(filePath);
    if (existing) {
      existing.reveal(vscode.ViewColumn.Beside);
      // Re-send the latest content
      this._sendContent(existing, filePath);
      return;
    }

    // Create a new panel
    const panel = vscode.window.createWebviewPanel(
      'noiseDbml.diagramTab',
      `${fileName} — ER Diagram`,
      vscode.ViewColumn.Beside,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
        localResourceRoots: [
          vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview'),
        ],
      },
    );

    DiagramTabProvider._panels.set(filePath, panel);

    panel.webview.html = this._getHtml(panel.webview);

    // Handle messages from the webview
    panel.webview.onDidReceiveMessage((message) => {
      if (message.type === 'ready') {
        this._sendContent(panel, filePath);
      }
      if (message.type === 'error') {
        vscode.window.showErrorMessage(
          `DBML Diagram Error: ${message.text}`,
        );
      }
    });

    // Clean up when the panel is closed
    panel.onDidDispose(() => {
      DiagramTabProvider._panels.delete(filePath);
    });

    // Watch the file for live updates
    const watcher = vscode.workspace.createFileSystemWatcher(
      new vscode.RelativePattern(
        vscode.Uri.file(path.dirname(filePath)),
        path.basename(filePath),
      ),
    );
    watcher.onDidChange(() => this._sendContent(panel, filePath));
    panel.onDidDispose(() => watcher.dispose());
  }

  // ---- Private helpers ------------------------------------------------

  private _sendContent(panel: vscode.WebviewPanel, filePath: string): void {
    try {
      const text = fs.readFileSync(filePath, 'utf8');
      const schema = parseDbml(text);
      if (schema) {
        panel.webview.postMessage({ type: 'update', schema });
      }
    } catch (err) {
      console.error(`[NoiseDBML] Failed to read ${filePath}:`, err);
    }
  }

  private _getHtml(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview', 'index.js'),
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview', 'index.css'),
    );

    const nonce = getNonce();

    return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${webview.cspSource};"
  />
  <link rel="stylesheet" href="${styleUri}" />
  <title>DBML Diagram</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }
}

function getNonce(): string {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
