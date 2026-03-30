// ============================================================
// Noise DBML — Linter Provider (Diagnostics)
// ============================================================

import * as vscode from 'vscode';
import { lintDbml } from '../parser/visitor';

export class LinterProvider {
  private diagnosticCollection: vscode.DiagnosticCollection;

  constructor(context: vscode.ExtensionContext) {
    this.diagnosticCollection = vscode.languages.createDiagnosticCollection('noise-dbml');
    context.subscriptions.push(this.diagnosticCollection);

    // Initial check for all open documents
    vscode.workspace.textDocuments.forEach((doc) => this.lint(doc));

    // Listen for changes
    context.subscriptions.push(
      vscode.workspace.onDidChangeTextDocument((e) => this.lint(e.document)),
      vscode.workspace.onDidOpenTextDocument((doc) => this.lint(doc)),
      vscode.workspace.onDidSaveTextDocument((doc) => this.lint(doc)),
      vscode.workspace.onDidCloseTextDocument((doc) => {
        this.diagnosticCollection.delete(doc.uri);
      })
    );
  }

  public lint(document: vscode.TextDocument) {
    if (document.languageId !== 'dbml' && !document.fileName.endsWith('.dbml')) {
      return;
    }

    const text = document.getText();
    const { errors } = lintDbml(text);
    const diagnostics: vscode.Diagnostic[] = [];

    errors.forEach((err) => {
      const severity = err.severity === 'error' ? vscode.DiagnosticSeverity.Error : vscode.DiagnosticSeverity.Warning;
      
      // If we have a specific line/column, use it
      const startLine = err.line - 1;
      const startCol = err.column - 1;
      const length = err.length || 1;

      // For some semantic errors, we might want to try to find the exact text in the document
      // if line/column are just fallbacks (1,1)
      let range: vscode.Range;
      if (err.line === 1 && err.column === 1) {
        // Fallback: try to find the target text if it's in the message or something
        // But for now, just mark the start of the file or the line
        range = new vscode.Range(startLine, startCol, startLine, startCol + length);
      } else {
        range = new vscode.Range(startLine, startCol, startLine, startCol + length);
      }

      diagnostics.push(new vscode.Diagnostic(range, err.message, severity));
    });

    this.diagnosticCollection.set(document.uri, diagnostics);
  }
}
