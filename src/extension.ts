// ============================================================
// Noise DBML — Extension Entry Point
// ============================================================

import * as vscode from 'vscode';
import { DbmlFileProvider, DbmlFileItem } from './providers/DbmlFileProvider';
import { DiagramTabProvider } from './providers/DiagramTabProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('Noise DBML extension activated');

  // ── 1. Register the DBML file tree view in the sidebar ──────────────
  const fileProvider = new DbmlFileProvider();

  const treeView = vscode.window.createTreeView(
    DbmlFileProvider.viewType,
    {
      treeDataProvider: fileProvider,
      showCollapseAll: false,
    },
  );

  context.subscriptions.push(treeView, fileProvider);

  // ── 2. Diagram tab provider ──────────────────────────────────────────
  const diagramTabProvider = new DiagramTabProvider(context.extensionUri);

  // ── 3. Commands ──────────────────────────────────────────────────────

  // Command triggered from the tree-item inline / context menu
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'noiseDbml.seeDiagram',
      (item: DbmlFileItem) => {
        if (item?.resourceUri) {
          diagramTabProvider.openForFile(item.resourceUri);
        }
      },
    ),
  );

  // Refresh the file list
  context.subscriptions.push(
    vscode.commands.registerCommand('noiseDbml.refreshFileList', () => {
      fileProvider.refresh();
    }),
  );
}

export function deactivate() {
  console.log('Noise DBML extension deactivated');
}
