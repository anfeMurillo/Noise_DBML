// ============================================================
// DbmlFileProvider — TreeDataProvider for .dbml files
// ============================================================

import * as vscode from 'vscode';
import * as path from 'path';

export class DbmlFileItem extends vscode.TreeItem {
  constructor(
    public readonly resourceUri: vscode.Uri,
    public readonly label: string,
  ) {
    super(label, vscode.TreeItemCollapsibleState.None);

    this.tooltip = resourceUri.fsPath;
    this.description = vscode.workspace.asRelativePath(
      path.dirname(resourceUri.fsPath),
    );
    this.iconPath = new vscode.ThemeIcon('database');
    this.contextValue = 'dbmlFile';

    // Double-click opens the file in the editor
    this.command = {
      command: 'vscode.open',
      title: 'Open File',
      arguments: [resourceUri],
    };
  }
}

export class DbmlFileProvider implements vscode.TreeDataProvider<DbmlFileItem> {
  public static readonly viewType = 'noiseDbml.fileExplorer';

  private readonly _onDidChangeTreeData =
    new vscode.EventEmitter<DbmlFileItem | undefined | void>();
  readonly onDidChangeTreeData = this._onDidChangeTreeData.event;

  private _watcher: vscode.FileSystemWatcher | undefined;

  constructor() {
    // Watch for .dbml file changes in the workspace
    this._watcher = vscode.workspace.createFileSystemWatcher('**/*.dbml');
    this._watcher.onDidCreate(() => this.refresh());
    this._watcher.onDidDelete(() => this.refresh());
    this._watcher.onDidChange(() => this.refresh());
  }

  public refresh(): void {
    this._onDidChangeTreeData.fire();
  }

  public dispose(): void {
    this._watcher?.dispose();
  }

  getTreeItem(element: DbmlFileItem): vscode.TreeItem {
    return element;
  }

  async getChildren(
    _element?: DbmlFileItem,
  ): Promise<DbmlFileItem[]> {
    const uris = await vscode.workspace.findFiles('**/*.dbml', '**/node_modules/**');

    if (uris.length === 0) {
      return [];
    }

    // Sort alphabetically by filename
    uris.sort((a, b) =>
      path.basename(a.fsPath).localeCompare(path.basename(b.fsPath)),
    );

    return uris.map(
      (uri) => new DbmlFileItem(uri, path.basename(uri.fsPath)),
    );
  }
}
