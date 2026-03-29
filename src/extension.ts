// ============================================================
// Noise DBML — Extension Entry Point
// ============================================================

import * as vscode from 'vscode';
import { DiagramPanelProvider } from './providers/DiagramPanelProvider';

let diagramProvider: DiagramPanelProvider;

export function activate(context: vscode.ExtensionContext) {
  console.log('Noise DBML extension activated');

  // Register the Webview View Provider for the sidebar panel
  diagramProvider = new DiagramPanelProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      DiagramPanelProvider.viewType,
      diagramProvider,
      {
        webviewOptions: {
          retainContextWhenHidden: true,
        },
      }
    )
  );

  // Register commands
  context.subscriptions.push(
    vscode.commands.registerCommand('noiseDbml.openDiagram', () => {
      // Focus the sidebar
      vscode.commands.executeCommand('noiseDbml.diagramView.focus');
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('noiseDbml.refreshDiagram', () => {
      diagramProvider.refresh();
    })
  );

  // Listen for active editor changes
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor && editor.document.languageId === 'dbml') {
        diagramProvider.updateContent(editor.document.getText());
      }
    })
  );

  // Listen for document content changes with debounce
  let debounceTimer: ReturnType<typeof setTimeout> | undefined;
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      const editor = vscode.window.activeTextEditor;
      if (
        editor &&
        event.document === editor.document &&
        event.document.languageId === 'dbml'
      ) {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        debounceTimer = setTimeout(() => {
          diagramProvider.updateContent(event.document.getText());
        }, 300);
      }
    })
  );

  // If there's already an active DBML editor, parse it immediately
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor && activeEditor.document.languageId === 'dbml') {
    // Small delay to let the webview initialize
    setTimeout(() => {
      diagramProvider.updateContent(activeEditor.document.getText());
    }, 500);
  }
}

export function deactivate() {
  console.log('Noise DBML extension deactivated');
}
