// ============================================================
// Noise DBML — Extension Entry Point
// ============================================================

import * as vscode from 'vscode';
import { DiagramTabProvider } from './providers/DiagramTabProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Noise DBML extension activated');

  // ── 1. Diagram tab provider ──────────────────────────────────────────
  const diagramTabProvider = new DiagramTabProvider(context.extensionUri);

  // ── 2. Commands ──────────────────────────────────────────────────────

  // Command triggered from the explorer context menu or editor title
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'noiseDbml.seeDiagram',
      (arg?: any | vscode.Uri) => {
        let uri: vscode.Uri | undefined;
        
        if (arg instanceof vscode.Uri) {
          uri = arg;
        } else {
          // If no argument, try the active editor
          uri = vscode.window.activeTextEditor?.document.uri;
        }

        if (uri && uri.fsPath.endsWith('.dbml')) {
          diagramTabProvider.openForFile(uri);
        }
      },
    ),
  );

  // Command to choose auto arrange algorithm (placeholder)
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'noiseDbml.chooseAlgorithm',
      () => {
        vscode.window.showInformationMessage('Choose Auto Arrange Algorithm feature is coming soon!');
      },
    ),
  );
}

export function deactivate() {
  console.log('Noise DBML extension deactivated');
}
