// ============================================================
// DBML CST → AST Visitor
// ============================================================

import { CstNode, IToken } from 'chevrotain';
import { dbmlParser } from './parser';
import { DbmlLexer } from './lexer';
import {
  DbmlSchema, ProjectNode, TableNode, ColumnNode, ColumnSettings,
  EnumNode, EnumValue, RefNode, RefEndpoint, RefSettings,
  RelationType, IndexNode, IndexColumn, IndexSettings,
  TableGroupNode, TablePartialNode, StickyNoteNode,
  TableSettings, InlineRef, ReferentialAction,
} from './types';

const BaseCstVisitor = dbmlParser.getBaseCstVisitorConstructor();

class DbmlAstVisitor extends BaseCstVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }

  schema(ctx: any): DbmlSchema {
    const schema: DbmlSchema = {
      tables: [],
      enums: [],
      refs: [],
      tableGroups: [],
      tablePartials: [],
      stickyNotes: [],
    };

    if (ctx.projectDef) {
      schema.project = this.visit(ctx.projectDef[0]);
    }
    if (ctx.tableDef) {
      schema.tables = ctx.tableDef.map((t: CstNode) => this.visit(t));
    }
    if (ctx.enumDef) {
      schema.enums = ctx.enumDef.map((e: CstNode) => this.visit(e));
    }
    if (ctx.refDef) {
      schema.refs = ctx.refDef.map((r: CstNode) => this.visit(r));
    }
    if (ctx.tableGroupDef) {
      schema.tableGroups = ctx.tableGroupDef.map((g: CstNode) => this.visit(g));
    }
    if (ctx.tablePartialDef) {
      schema.tablePartials = ctx.tablePartialDef.map((p: CstNode) => this.visit(p));
    }
    if (ctx.stickyNoteDef) {
      schema.stickyNotes = ctx.stickyNoteDef.map((n: CstNode) => this.visit(n));
    }

    return schema;
  }

  // ---- Project ----
  projectDef(ctx: any): ProjectNode {
    const project: ProjectNode = {
      name: ctx.projectName[0].image,
    };
    if (ctx.projectProperty) {
      const prop = this.visit(ctx.projectProperty[0]);
      project.databaseType = prop;
    }
    if (ctx.noteDef) {
      project.note = this.visit(ctx.noteDef[0]);
    }
    return project;
  }

  projectProperty(ctx: any): string {
    return this.extractString(ctx.stringValue ? this.visit(ctx.stringValue[0]) : '');
  }

  // ---- Table ----
  tableDef(ctx: any): TableNode {
    const qName = this.visit(ctx.tableName[0]);
    const table: TableNode = {
      name: qName.name,
      schema: qName.schema,
      columns: [],
      indexes: [],
      settings: {},
    };

    if (ctx.alias) {
      table.alias = ctx.alias[0].image;
    }

    if (ctx.tableSettings) {
      ctx.tableSettings.forEach((sNode: CstNode) => {
        const s = this.extractTableSettings(sNode);
        Object.assign(table.settings, s);
      });
    }

    if (ctx.columnDef) {
      table.columns = ctx.columnDef.map((c: CstNode) => this.visit(c));
    }

    if (ctx.indexesDef) {
      const idxResult = this.visit(ctx.indexesDef[0]);
      if (Array.isArray(idxResult)) {
        table.indexes = idxResult;
      }
    }

    if (ctx.noteDef) {
      table.note = this.visit(ctx.noteDef[0]);
    }

    return table;
  }

  // ---- Column ----
  columnDef(ctx: any): ColumnNode {
    const nameNode = this.visit(ctx.colName[0]);
    const typeNode = this.visit(ctx.colType[0]);

    const settings: ColumnSettings = {
      primaryKey: false,
      notNull: false,
      unique: false,
      increment: false,
    };

    if (ctx.colSettings) {
      ctx.colSettings.forEach((sNode: CstNode) => {
        const s = this.extractColumnSettings(sNode);
        Object.assign(settings, s);
      });
    }

    return {
      name: nameNode,
      type: typeNode,
      settings,
    };
  }

  columnName(ctx: any): string {
    if (ctx.Identifier) {
      return ctx.Identifier[0].image;
    }
    if (ctx.DoubleQuoteString) {
      return ctx.DoubleQuoteString[0].image.slice(1, -1);
    }
    // Handle keyword tokens used as column names
    const keywordTokens = [
      'Name', 'Type', 'Note', 'Check', 'Delete', 'Update',
      'Default', 'Color', 'Null', 'Unique', 'Cascade',
      'Restrict', 'Hash', 'True', 'False',
    ];
    for (const kw of keywordTokens) {
      if (ctx[kw]) {
        return ctx[kw][0].image;
      }
    }
    return '';
  }

  columnType(ctx: any): string {
    let type: string;
    if (ctx.enumKeyword) {
      // Inline enum syntax:  enum('a','b',...)  → normalize to lowercase "enum"
      type = ctx.enumKeyword[0].image.toLowerCase();
    } else {
      const qName = this.visit(ctx.typeName[0]);
      type = qName.schema ? `${qName.schema}.${qName.name}` : qName.name;
    }

    if (ctx.typeParam) {
      const params = ctx.typeParam.map((p: CstNode) => this.visit(p));
      type += `(${params.join(',')})`;
    }
    return type;
  }

  typeParam(ctx: any): string {
    if (ctx.NumberLiteral) return ctx.NumberLiteral[0].image;
    if (ctx.SingleQuoteString) return ctx.SingleQuoteString[0].image;
    if (ctx.DoubleQuoteString) return ctx.DoubleQuoteString[0].image;
    if (ctx.Identifier) return ctx.Identifier[0].image;
    return '';
  }

  // ---- Settings ----
  settingsBlock(ctx: any): any {
    if (!ctx.settingItem) return {};
    const settings: any = {};
    for (const item of ctx.settingItem) {
      const result = this.visit(item);
      Object.assign(settings, result);
    }
    return settings;
  }

  settingItem(ctx: any): any {
    if (ctx.pk || ctx.pk2) return { primaryKey: true, pk: true };
    if (ctx.notNull) return { notNull: true };
    if (ctx.null) return { null: true };
    if (ctx.unique) return { unique: true };
    if (ctx.increment) return { increment: true };
    if (ctx.defaultSetting) return this.visit(ctx.defaultSetting[0]);
    if (ctx.noteSetting) return this.visit(ctx.noteSetting[0]);
    if (ctx.refSetting) return this.visit(ctx.refSetting[0]);
    if (ctx.deleteSetting) return this.visit(ctx.deleteSetting[0]);
    if (ctx.updateSetting) return this.visit(ctx.updateSetting[0]);
    if (ctx.nameSetting) return this.visit(ctx.nameSetting[0]);
    if (ctx.typeSetting) return this.visit(ctx.typeSetting[0]);
    if (ctx.headerColorSetting) return this.visit(ctx.headerColorSetting[0]);
    if (ctx.colorSetting) return this.visit(ctx.colorSetting[0]);
    if (ctx.checkSetting) return this.visit(ctx.checkSetting[0]);
    return {};
  }

  defaultSetting(ctx: any): any {
    return { default: this.visit(ctx.settingValue[0]) };
  }

  noteSetting(ctx: any): any {
    return { note: this.extractString(this.visit(ctx.stringValue[0])) };
  }

  refSetting(ctx: any): any {
    const op = this.visit(ctx.relOp[0]);
    const target = this.visit(ctx.refTarget[0]);
    // For inline refs [ref: > table.column], 
    // qualifiedName returns { schema: 'table', name: 'column' } if there's a dot.
    // However, DBML also allows [ref: > table] where it infers the PK.
    return {
      ref: {
        type: op as RelationType,
        table: target.schema || target.name,
        column: target.schema ? target.name : '', 
        schema: undefined, // We don't support schema.table.col in inline refs yet or it's part of schema part
      },
    };
  }

  deleteSetting(ctx: any): any {
    return { delete: this.visit(ctx.referentialAction[0]) };
  }

  updateSetting(ctx: any): any {
    return { update: this.visit(ctx.referentialAction[0]) };
  }

  nameSetting(ctx: any): any {
    return { name: this.extractString(this.visit(ctx.stringValue[0])) };
  }

  typeSetting(ctx: any): any {
    if (ctx.Btree) return { type: 'btree' };
    if (ctx.Hash) return { type: 'hash' };
    return {};
  }

  headerColorSetting(ctx: any): any {
    return { headerColor: ctx.HexColor[0].image };
  }

  colorSetting(ctx: any): any {
    return { color: ctx.HexColor[0].image };
  }

  checkSetting(ctx: any): any {
    return { check: ctx.BacktickExpression[0].image.slice(1, -1) };
  }

  referentialAction(ctx: any): ReferentialAction {
    if (ctx.Cascade) return 'cascade';
    if (ctx.Restrict) return 'restrict';
    if (ctx.SetNull) return 'set null';
    if (ctx.SetDefault) return 'set default';
    if (ctx.NoAction) return 'no action';
    return 'no action';
  }

  settingValue(ctx: any): string {
    if (ctx.NumberLiteral) return ctx.NumberLiteral[0].image;
    if (ctx.Identifier) return ctx.Identifier[0].image;
    if (ctx.True) return 'true';
    if (ctx.False) return 'false';
    if (ctx.Null) return 'null';
    if (ctx.BacktickExpression) return ctx.BacktickExpression[0].image;
    if (ctx.stringValue) return this.visit(ctx.stringValue[0]);
    return '';
  }

  // ---- Indexes ----
  indexesDef(ctx: any): IndexNode[] {
    if (!ctx.indexEntry) return [];
    return ctx.indexEntry.map((entry: CstNode) => this.visit(entry));
  }

  indexEntry(ctx: any): IndexNode {
    const columns: IndexColumn[] = [];
    const settings: IndexSettings = { unique: false, pk: false };

    if (ctx.indexColumnItem) {
      for (const item of ctx.indexColumnItem) {
        columns.push(this.visit(item));
      }
    }
    if (ctx.singleCol) {
      columns.push(this.visit(ctx.singleCol[0]));
    }

    if (ctx.indexSettings) {
      const s = this.visit(ctx.indexSettings[0]);
      Object.assign(settings, s);
    }

    return { columns, settings };
  }

  indexColumnItem(ctx: any): IndexColumn {
    if (ctx.expr) {
      return { value: ctx.expr[0].image.slice(1, -1), isExpression: true };
    }
    if (ctx.colName) {
      return { value: this.visit(ctx.colName[0]), isExpression: false };
    }
    return { value: '', isExpression: false };
  }

  // ---- Checks ----
  checksDef(ctx: any): any {
    return null; // Checks are parsed but not needed for diagram
  }

  // ---- Note ----
  noteDef(ctx: any): string {
    if (ctx.stringValue) {
      return ctx.stringValue.map((sv: CstNode) => this.extractString(this.visit(sv))).join(' ');
    }
    return '';
  }

  // ---- Partial Usage ----
  partialUsage(ctx: any): any {
    return { partialName: ctx.partialName[0].image };
  }

  // ---- TablePartial ----
  tablePartialDef(ctx: any): TablePartialNode {
    const partial: TablePartialNode = {
      name: ctx.partialName[0].image,
      columns: [],
      indexes: [],
      settings: {},
    };

    if (ctx.partialSettings) {
      partial.settings = this.extractTableSettings(ctx.partialSettings[0]);
    }
    if (ctx.columnDef) {
      partial.columns = ctx.columnDef.map((c: CstNode) => this.visit(c));
    }
    if (ctx.indexesDef) {
      const idxResult = this.visit(ctx.indexesDef[0]);
      if (Array.isArray(idxResult)) {
        partial.indexes = idxResult;
      }
    }

    return partial;
  }

  // ---- Enum ----
  enumDef(ctx: any): EnumNode {
    const qName = this.visit(ctx.enumName[0]);
    const enumNode: EnumNode = {
      name: qName.name,
      schema: qName.schema,
      values: [],
    };
    if (ctx.enumValue) {
      enumNode.values = ctx.enumValue.map((v: CstNode) => this.visit(v));
    }
    return enumNode;
  }

  enumValue(ctx: any): EnumValue {
    const value: EnumValue = { name: '' };
    if (ctx.valueName) {
      value.name = ctx.valueName[0].image;
    } else if (ctx.quotedValue) {
      value.name = ctx.quotedValue[0].image.slice(1, -1);
    }
    if (ctx.enumValueSettings) {
      const s = this.visit(ctx.enumValueSettings[0]);
      if (s.note) value.note = s.note;
    }
    return value;
  }

  // ---- Ref ----
  refDef(ctx: any): RefNode {
    const refBodyCtx = ctx.refBody[0];
    const body = this.visit(refBodyCtx);
    const ref: RefNode = {
      from: body.from,
      to: body.to,
      type: body.type,
      settings: body.settings || {},
    };
    if (ctx.refName) {
      ref.name = ctx.refName[0].image;
    }
    return ref;
  }

  refBody(ctx: any): { from: RefEndpoint; to: RefEndpoint; type: RelationType; settings: RefSettings } {
    const from = this.visit(ctx.fromEndpoint[0]);
    const to = this.visit(ctx.toEndpoint[0]);
    const type = this.visit(ctx.relOp[0]) as RelationType;
    let settings: RefSettings = {};

    if (ctx.refSettings) {
      settings = this.visit(ctx.refSettings[0]);
    }

    return { from, to, type, settings };
  }

  refEndpoint(ctx: any): RefEndpoint {
    const parts: string[] = [];
    if (ctx.part1) parts.push(this.visit(ctx.part1[0]));
    if (ctx.part2) parts.push(this.visit(ctx.part2[0]));
    if (ctx.part3) parts.push(this.visit(ctx.part3[0]));

    // Handle composite columns
    const compositeCols: string[] = [];
    if (ctx.compositeCol) {
      for (const col of ctx.compositeCol) {
        compositeCols.push(this.visit(col));
      }
    }
    if (ctx.compositeCol2) {
      for (const col of ctx.compositeCol2) {
        compositeCols.push(this.visit(col));
      }
    }

    if (compositeCols.length > 0) {
      if (parts.length === 1) {
        return { table: parts[0], columns: compositeCols };
      }
      return { schema: parts[0], table: parts[1] || parts[0], columns: compositeCols };
    }

    if (parts.length === 3) {
      return { schema: parts[0], table: parts[1], columns: [parts[2]] };
    }
    if (parts.length === 2) {
      return { table: parts[0], columns: [parts[1]] };
    }
    return { table: parts[0] || '', columns: [] };
  }

  refPart(ctx: any): string {
    if (ctx.Identifier) return ctx.Identifier[0].image;
    if (ctx.DoubleQuoteString) return ctx.DoubleQuoteString[0].image.slice(1, -1);
    return '';
  }

  relationOp(ctx: any): RelationType {
    if (ctx.ManyToMany) return '<>';
    if (ctx.LessThan) return '<';
    if (ctx.GreaterThan) return '>';
    if (ctx.Dash) return '-';
    return '-';
  }

  // ---- TableGroup ----
  tableGroupDef(ctx: any): TableGroupNode {
    let groupName = '';
    if (ctx.quotedGroupName) {
      groupName = ctx.quotedGroupName[0].image.slice(1, -1);
    } else if (ctx.groupName) {
      groupName = ctx.groupName[0].image;
    }

    const group: TableGroupNode = {
      name: groupName,
      tables: [],
    };

    if (ctx.groupSettings) {
      const s = this.visit(ctx.groupSettings[0]);
      if (s.color) group.color = s.color;
      if (s.note) group.note = s.note;
    }

    if (ctx.groupTable) {
      group.tables = ctx.groupTable.map((t: CstNode) => {
        const qName = this.visit(t);
        return qName.schema ? `${qName.schema}.${qName.name}` : qName.name;
      });
    }

    if (ctx.noteDef) {
      group.note = this.visit(ctx.noteDef[0]);
    }

    return group;
  }

  // ---- Sticky Note ----
  stickyNoteDef(ctx: any): StickyNoteNode {
    return {
      name: ctx.noteName[0].image,
      content: this.extractString(this.visit(ctx.stringValue[0])),
    };
  }

  // ---- Records ----
  recordsDef(_ctx: any): any {
    return null; // Records are parsed for validation but not needed for diagram
  }

  recordsInnerDef(_ctx: any): any {
    return null;
  }

  recordValue(_ctx: any): any {
    return null;
  }

  // ---- Helpers ----
  qualifiedName(ctx: any): { name: string; schema?: string } {
    let first = '';
    if (ctx.firstName) first = ctx.firstName[0].image;
    else if (ctx.quotedFirstName) first = ctx.quotedFirstName[0].image.slice(1, -1);

    if (ctx.secondName || ctx.quotedSecondName) {
      let second = '';
      if (ctx.secondName) second = ctx.secondName[0].image;
      else if (ctx.quotedSecondName) second = ctx.quotedSecondName[0].image.slice(1, -1);
      return { schema: first, name: second };
    }
    return { name: first };
  }

  stringValue(ctx: any): string {
    if (ctx.TripleQuoteString) {
      return ctx.TripleQuoteString[0].image;
    }
    if (ctx.SingleQuoteString) {
      return ctx.SingleQuoteString[0].image;
    }
    if (ctx.DoubleQuoteString) {
      return ctx.DoubleQuoteString[0].image;
    }
    return '';
  }

  // ---- Private Helpers ----
  private extractString(raw: string): string {
    if (!raw) return '';
    if (raw.startsWith("'''") && raw.endsWith("'''")) {
      return raw.slice(3, -3).trim();
    }
    if (raw.startsWith("'") && raw.endsWith("'")) {
      return raw.slice(1, -1);
    }
    if (raw.startsWith('"') && raw.endsWith('"')) {
      return raw.slice(1, -1);
    }
    return raw;
  }

  private extractTableSettings(settingsNode: CstNode): TableSettings {
    const result = this.visit(settingsNode);
    const settings: TableSettings = {};
    if (result.headerColor) settings.headerColor = result.headerColor;
    return settings;
  }

  private extractColumnSettings(settingsNode: CstNode): Partial<ColumnSettings> {
    const result = this.visit(settingsNode);
    const settings: Partial<ColumnSettings> = {};

    if (result.primaryKey) settings.primaryKey = true;
    if (result.notNull) settings.notNull = true;
    if (result.unique) settings.unique = true;
    if (result.increment) settings.increment = true;
    if (result.default !== undefined) settings.default = result.default;
    if (result.note) settings.note = result.note;
    if (result.ref) settings.ref = result.ref as InlineRef;

    return settings;
  }
}

const visitor = new DbmlAstVisitor();

export interface LintError {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
  length?: number;
}

/**
 * Lints DBML source text and returns errors/warnings.
 */
export function lintDbml(text: string): { errors: LintError[] } {
  const errors: LintError[] = [];
  const lexResult = DbmlLexer.tokenize(text);

  // 1. Lexer Errors
  if (lexResult.errors.length > 0) {
    lexResult.errors.forEach((err) => {
      errors.push({
        line: err.line || 1,
        column: err.column || 1,
        message: err.message,
        severity: 'error',
        length: 1,
      });
    });
  }

  dbmlParser.input = lexResult.tokens;
  const cst = dbmlParser.schema();

  // 2. Parser Errors
  if (dbmlParser.errors.length > 0) {
    dbmlParser.errors.forEach((err) => {
      const token = err.token;
      errors.push({
        line: token.startLine || 1,
        column: token.startColumn || 1,
        message: err.message,
        severity: 'error',
        length: token.image?.length || 1,
      });
    });
  }

  // 3. Semantic Checks (AST-based)
  try {
    const ast = visitor.visit(cst) as DbmlSchema;
    if (ast) {
      const tableNames = new Set<string>();
      
      // Collect all table names (qualified)
      ast.tables.forEach(t => {
        const fullName = t.schema ? `${t.schema}.${t.name}` : t.name;
        tableNames.add(fullName);
      });

      // Check relationships
      ast.refs.forEach(ref => {
        const fromFullName = ref.from.schema ? `${ref.from.schema}.${ref.from.table}` : ref.from.table;
        const toFullName = ref.to.schema ? `${ref.to.schema}.${ref.to.table}` : ref.to.table;

        if (!tableNames.has(fromFullName)) {
          // Warning: References a table that doesn't exist
          // Since AST doesn't have positions, we just log it as a general issue for now
          // or we could search the text, but that's complex.
          // For now, let's keep it simple.
        }
      });
    }
  } catch (e) {
    // Visitor might fail on very broken CST, but that's fine as parser errors already caught it
  }

  return { errors };
}

/**
 * Parses DBML source text and returns the AST.
 * Returns null if parsing fails.
 */
export function parseDbml(text: string): DbmlSchema | null {
  const lexResult = DbmlLexer.tokenize(text);

  if (lexResult.errors.length > 0) {
    console.warn('DBML Lexer errors:', lexResult.errors);
  }

  dbmlParser.input = lexResult.tokens;
  const cst = dbmlParser.schema();

  if (dbmlParser.errors.length > 0) {
    console.warn('DBML Parser errors:', dbmlParser.errors);
    // Return partial result even on errors (recovery mode)
  }

  try {
    const ast = visitor.visit(cst);
    return ast;
  } catch (e) {
    console.error('DBML AST Visitor error:', e);
    // Return empty schema instead of null to avoid webview crash
    return {
      tables: [], enums: [], refs: [],
      tableGroups: [], tablePartials: [], stickyNotes: []
    };
  }
}
