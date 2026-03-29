// ============================================================
// DBML Chevrotain Lexer — Token Definitions
// ============================================================

import { createToken, Lexer, ITokenConfig } from 'chevrotain';

// ---- Whitespace & Comments ----
export const WhiteSpace = createToken({
  name: 'WhiteSpace',
  pattern: /\s+/,
  group: Lexer.SKIPPED,
});

export const LineComment = createToken({
  name: 'LineComment',
  pattern: /\/\/[^\n\r]*/,
  group: 'comments',
});

export const BlockComment = createToken({
  name: 'BlockComment',
  pattern: /\/\*[\s\S]*?\*\//,
  group: 'comments',
});

// ---- Keywords ----
export const Table = createToken({ name: 'Table', pattern: /Table\b/, longer_alt: undefined });
export const Project = createToken({ name: 'Project', pattern: /Project\b/ });
export const Enum = createToken({ name: 'Enum', pattern: /enum\b/i });
export const Ref = createToken({ name: 'Ref', pattern: /Ref\b/ });
export const TableGroup = createToken({ name: 'TableGroup', pattern: /TableGroup\b/i });
export const TablePartial = createToken({ name: 'TablePartial', pattern: /TablePartial\b/ });
export const Note = createToken({ name: 'Note', pattern: /Note\b/ });
export const As = createToken({ name: 'As', pattern: /as\b/ });
export const Indexes = createToken({ name: 'Indexes', pattern: /indexes\b/ });
export const Checks = createToken({ name: 'Checks', pattern: /checks\b/ });
export const Records = createToken({ name: 'Records', pattern: /records\b/ });

// ---- Column Settings Keywords ----
export const PrimaryKey = createToken({ name: 'PrimaryKey', pattern: /primary\s+key\b/ });
export const Pk = createToken({ name: 'Pk', pattern: /pk\b/ });
export const NotNull = createToken({ name: 'NotNull', pattern: /not\s+null\b/ });
export const Null = createToken({ name: 'Null', pattern: /null\b/ });
export const Unique = createToken({ name: 'Unique', pattern: /unique\b/ });
export const Increment = createToken({ name: 'Increment', pattern: /increment\b/ });
export const Default = createToken({ name: 'Default', pattern: /default\b/ });
export const Check = createToken({ name: 'Check', pattern: /check\b/ });

// ---- Relationship Settings ----
export const Delete = createToken({ name: 'Delete', pattern: /delete\b/ });
export const Update = createToken({ name: 'Update', pattern: /update\b/ });
export const Cascade = createToken({ name: 'Cascade', pattern: /cascade\b/ });
export const Restrict = createToken({ name: 'Restrict', pattern: /restrict\b/ });
export const SetNull = createToken({ name: 'SetNull', pattern: /set\s+null\b/ });
export const SetDefault = createToken({ name: 'SetDefault', pattern: /set\s+default\b/ });
export const NoAction = createToken({ name: 'NoAction', pattern: /no\s+action\b/ });

// ---- Index Settings ----
export const Type = createToken({ name: 'Type', pattern: /type\b/ });
export const Name = createToken({ name: 'Name', pattern: /name\b/ });
export const Btree = createToken({ name: 'Btree', pattern: /btree\b/ });
export const Hash = createToken({ name: 'Hash', pattern: /hash\b/ });

// ---- Property Keywords ----
export const DatabaseType = createToken({ name: 'DatabaseType', pattern: /database_type\b/ });
export const HeaderColor = createToken({ name: 'HeaderColor', pattern: /headercolor\b/i });
export const Color = createToken({ name: 'Color', pattern: /color\b/ });

// ---- Booleans ----
export const True = createToken({ name: 'True', pattern: /true\b/ });
export const False = createToken({ name: 'False', pattern: /false\b/ });

// ---- Relationship Operators ----
export const ManyToMany = createToken({ name: 'ManyToMany', pattern: /<>/ });
export const LessThan = createToken({ name: 'LessThan', pattern: /</ });
export const GreaterThan = createToken({ name: 'GreaterThan', pattern: />/ });
export const Dash = createToken({ name: 'Dash', pattern: /-/ });

// ---- Structural ----
export const LCurly = createToken({ name: 'LCurly', pattern: /\{/ });
export const RCurly = createToken({ name: 'RCurly', pattern: /\}/ });
export const LSquare = createToken({ name: 'LSquare', pattern: /\[/ });
export const RSquare = createToken({ name: 'RSquare', pattern: /\]/ });
export const LParen = createToken({ name: 'LParen', pattern: /\(/ });
export const RParen = createToken({ name: 'RParen', pattern: /\)/ });
export const Colon = createToken({ name: 'Colon', pattern: /:/ });
export const Comma = createToken({ name: 'Comma', pattern: /,/ });
export const Dot = createToken({ name: 'Dot', pattern: /\./ });
export const Tilde = createToken({ name: 'Tilde', pattern: /~/ });

// ---- Literals ----
export const TripleQuoteString = createToken({
  name: 'TripleQuoteString',
  pattern: /'''[\s\S]*?'''/,
});

export const SingleQuoteString = createToken({
  name: 'SingleQuoteString',
  pattern: /'(?:[^'\\]|\\.)*'/,
});

export const DoubleQuoteString = createToken({
  name: 'DoubleQuoteString',
  pattern: /"(?:[^"\\]|\\.)*"/,
});

export const BacktickExpression = createToken({
  name: 'BacktickExpression',
  pattern: /`[^`]*`/,
});

export const HexColor = createToken({
  name: 'HexColor',
  pattern: /#[0-9a-fA-F]{3,6}\b/,
});

export const NumberLiteral = createToken({
  name: 'NumberLiteral',
  pattern: /-?\d+(\.\d+)?([eE][+-]?\d+)?/,
});

// ---- Identifier (MUST be last to avoid matching keywords) ----
export const Identifier = createToken({
  name: 'Identifier',
  pattern: /[a-zA-Z_]\w*/,
});

// ============================================================
// Token order matters! More specific tokens first.
// ============================================================
export const allTokens = [
  // Whitespace & Comments (highest priority)
  WhiteSpace,
  BlockComment,
  LineComment,

  // Multi-char operators before single-char
  ManyToMany,

  // Literals (before keywords to match strings early)
  TripleQuoteString,
  SingleQuoteString,
  DoubleQuoteString,
  BacktickExpression,
  HexColor,
  NumberLiteral,

  // Multi-word keywords (before single-word)
  PrimaryKey,
  NotNull,
  SetNull,
  SetDefault,
  NoAction,
  DatabaseType,
  HeaderColor,

  // Single-word keywords
  Table,
  TablePartial,
  TableGroup,
  Project,
  Enum,
  Ref,
  Note,
  As,
  Indexes,
  Checks,
  Records,
  Pk,
  Null,
  Unique,
  Increment,
  Default,
  Check,
  Delete,
  Update,
  Cascade,
  Restrict,
  Type,
  Name,
  Btree,
  Hash,
  Color,
  True,
  False,

  // Structural tokens
  LCurly,
  RCurly,
  LSquare,
  RSquare,
  LParen,
  RParen,
  Colon,
  Comma,
  Dot,
  Tilde,
  LessThan,
  GreaterThan,
  Dash,

  // Identifier (catch-all, must be last)
  Identifier,
];

export const DbmlLexer = new Lexer(allTokens, {
  ensureOptimizations: false,
});
