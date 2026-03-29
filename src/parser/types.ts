// ============================================================
// DBML AST Type Definitions
// ============================================================

export interface DbmlSchema {
  project?: ProjectNode;
  tables: TableNode[];
  enums: EnumNode[];
  refs: RefNode[];
  tableGroups: TableGroupNode[];
  tablePartials: TablePartialNode[];
  stickyNotes: StickyNoteNode[];
}

export interface ProjectNode {
  name: string;
  databaseType?: string;
  note?: string;
}

export interface TableNode {
  name: string;
  schema?: string;
  alias?: string;
  columns: ColumnNode[];
  indexes: IndexNode[];
  note?: string;
  settings: TableSettings;
}

export interface TableSettings {
  headerColor?: string;
  [key: string]: unknown;
}

export interface ColumnNode {
  name: string;
  type: string;
  settings: ColumnSettings;
}

export interface ColumnSettings {
  primaryKey: boolean;
  notNull: boolean;
  unique: boolean;
  increment: boolean;
  default?: string;
  note?: string;
  ref?: InlineRef;
}

export interface InlineRef {
  type: RelationType;
  table: string;
  column: string;
  schema?: string;
}

export type RelationType = '>' | '<' | '-' | '<>';

export interface RefNode {
  name?: string;
  from: RefEndpoint;
  to: RefEndpoint;
  type: RelationType;
  settings: RefSettings;
}

export interface RefEndpoint {
  schema?: string;
  table: string;
  columns: string[];
}

export interface RefSettings {
  delete?: ReferentialAction;
  update?: ReferentialAction;
  color?: string;
}

export type ReferentialAction =
  | 'cascade'
  | 'restrict'
  | 'set null'
  | 'set default'
  | 'no action';

export interface IndexNode {
  columns: IndexColumn[];
  settings: IndexSettings;
}

export interface IndexColumn {
  value: string;
  isExpression: boolean;
}

export interface IndexSettings {
  name?: string;
  type?: 'btree' | 'hash';
  unique: boolean;
  pk: boolean;
  note?: string;
}

export interface EnumNode {
  name: string;
  schema?: string;
  values: EnumValue[];
}

export interface EnumValue {
  name: string;
  note?: string;
}

export interface TableGroupNode {
  name: string;
  tables: string[];
  note?: string;
  color?: string;
}

export interface TablePartialNode {
  name: string;
  columns: ColumnNode[];
  indexes: IndexNode[];
  settings: TableSettings;
}

export interface StickyNoteNode {
  name: string;
  content: string;
}
