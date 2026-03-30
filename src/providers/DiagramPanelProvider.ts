// ============================================================
// Diagram Panel — WebviewViewProvider
// ============================================================

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { parseDbml } from '../parser/visitor';
import { DbmlSchema } from '../parser/types';

export class DiagramPanelProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'noiseDbml.diagramView';

  private _view?: vscode.WebviewView;
  private _lastContent?: string;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ): void {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [
        vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview'),
      ],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage(async (message) => {
      switch (message.type) {
        case 'ready':
          // Webview is ready, send the last parsed content
          if (this._lastContent) {
            this.updateContent(this._lastContent);
          } else {
            // Try to get content from active editor
            const editor = vscode.window.activeTextEditor;
            if (editor && editor.document.languageId === 'dbml') {
              this.updateContent(editor.document.getText());
            }
          }
          break;
        case 'saveImage':
          if (message.dataUrl) {
            await this._saveImage(message.dataUrl);
          }
          break;
        case 'error':
          vscode.window.showErrorMessage(`DBML Diagram Error: ${message.text}`);
          break;
      }
    });
  }

  public updateContent(text: string): void {
    this._lastContent = text;
    if (!this._view) return;

    const schema = parseDbml(text);
    if (schema) {
      this._view.webview.postMessage({
        type: 'update',
        schema,
      });
    }
  }

  public refresh(): void {
    if (this._lastContent) {
      this.updateContent(this._lastContent);
    }
  }

  private _getHtmlForWebview(webview: vscode.Webview): string {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview', 'index.js')
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview', 'index.css')
    );

    const nonce = getNonce();

    return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta
    http-equiv="Content-Security-Policy"
    content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; font-src ${webview.cspSource}; img-src data: blob: ${webview.cspSource}; connect-src ${webview.cspSource} data:;"
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
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
