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

  constructor(private readonly _context: vscode.ExtensionContext) {}

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
          vscode.Uri.joinPath(this._context.extensionUri, 'dist', 'webview'),
        ],
      },
    );

    DiagramTabProvider._panels.set(filePath, panel);

    panel.webview.html = this._getHtml(panel.webview);

    // Handle messages from the webview
    panel.webview.onDidReceiveMessage(async (message) => {
      if (message.type === 'ready') {
        this._sendContent(panel, filePath);
      }
      if (message.type === 'saveImage' && message.dataUrl) {
        await this._saveImage(message.dataUrl);
      }
      if (message.type === 'updatePositions') {
        const key = `positions-${filePath.replace(/\\/g, '/')}`;
        await this._context.workspaceState.update(key, message.positions);
      }
      if (message.type === 'updateStickyNotes') {
        const key = `stickyNotes-${filePath.replace(/\\/g, '/')}`;
        await this._context.workspaceState.update(key, message.stickyNotes);
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
        const posKey = `positions-${filePath.replace(/\\/g, '/')}`;
        const stickyKey = `stickyNotes-${filePath.replace(/\\/g, '/')}`;
        const positions = this._context.workspaceState.get(posKey);
        const stickyNotes = this._context.workspaceState.get(stickyKey);
        panel.webview.postMessage({ type: 'update', schema, positions, stickyNotes });
      }
    } catch (err) {
      console.error(`[NoiseDBML] Failed to read ${filePath}:`, err);
    }
  }

  private _getHtml(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._context.extensionUri, 'dist', 'webview', 'index.js'),
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._context.extensionUri, 'dist', 'webview', 'index.css'),
    );

    const nonce = getNonce();

    return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}' 'unsafe-eval'; font-src ${webview.cspSource}; img-src data: blob: ${webview.cspSource}; connect-src ${webview.cspSource} data: blob:;"
  />
  <link rel="stylesheet" href="${styleUri}" />
  <title>DBML Diagram</title>
</head>
<body>
  <div id="root"></div>
  <script nonce="${nonce}">
    window.addEventListener('error', (event) => {
      const vscode = acquireVsCodeApi();
      vscode.postMessage({
        type: 'error',
        text: 'Runtime error: ' + event.message + ' at ' + event.filename + ':' + event.lineno
      });
    });
    window.addEventListener('unhandledrejection', (event) => {
      const vscode = acquireVsCodeApi();
      vscode.postMessage({
        type: 'error',
        text: 'Unhandled promise rejection: ' + event.reason
      });
    });
  </script>
  <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
  }

  private async _saveImage(dataUrl: string): Promise<void> {
    const saveUri = await vscode.window.showSaveDialog({
      filters: {
        Images: ['png'],
      },
      defaultUri: vscode.Uri.file(`diagram-${new Date().toISOString().split('T')[0]}.png`),
    });

    if (saveUri) {
      try {
        const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        fs.writeFileSync(saveUri.fsPath, buffer);
        vscode.window.showInformationMessage(`Diagram saved to ${path.basename(saveUri.fsPath)}`);
      } catch (err) {
        vscode.window.showErrorMessage(`Failed to save diagram: ${err}`);
      }
    }
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
