// ============================================================
// DBML Chevrotain Parser — Grammar Rules (CST)
// ============================================================

import { CstParser } from 'chevrotain';
import {
  allTokens,
  Table, Project, Enum, Ref, TableGroup, TablePartial, Note,
  As, Indexes, Checks, Records,
  PrimaryKey, Pk, NotNull, Null, Unique, Increment, Default, Check,
  Delete, Update, Cascade, Restrict, SetNull, SetDefault, NoAction,
  Type, Name, Btree, Hash, DatabaseType, HeaderColor, Color,
  True, False,
  ManyToMany, LessThan, GreaterThan, Dash,
  LCurly, RCurly, LSquare, RSquare, LParen, RParen,
  Colon, Comma, Dot, Tilde,
  TripleQuoteString, SingleQuoteString, DoubleQuoteString,
  BacktickExpression, HexColor, NumberLiteral, Identifier,
} from './lexer';

export class DbmlParser extends CstParser {
  constructor() {
    super(allTokens, {
      recoveryEnabled: true,
      maxLookahead: 4,
    });
    this.performSelfAnalysis();
  }

  // ---- Root ----
  public schema = this.RULE('schema', () => {
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.projectDef) },
        { ALT: () => this.SUBRULE(this.tableDef) },
        { ALT: () => this.SUBRULE(this.tablePartialDef) },
        { ALT: () => this.SUBRULE(this.enumDef) },
        { ALT: () => this.SUBRULE(this.refDef) },
        { ALT: () => this.SUBRULE(this.tableGroupDef) },
        { ALT: () => this.SUBRULE(this.stickyNoteDef) },
        { ALT: () => this.SUBRULE(this.recordsDef) },
      ]);
    });
  });

  // ---- Project ----
  private projectDef = this.RULE('projectDef', () => {
    this.CONSUME(Project);
    this.CONSUME(Identifier, { LABEL: 'projectName' });
    this.CONSUME(LCurly);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.projectProperty) },
        { ALT: () => this.SUBRULE(this.noteDef) },
      ]);
    });
    this.CONSUME(RCurly);
  });

  private projectProperty = this.RULE('projectProperty', () => {
    this.CONSUME(DatabaseType);
    this.CONSUME(Colon);
    this.SUBRULE(this.stringValue);
  });

  // ---- Table ----
  private tableDef = this.RULE('tableDef', () => {
    this.CONSUME(Table);
    this.SUBRULE(this.qualifiedName, { LABEL: 'tableName' });
    this.OPTION(() => {
      this.CONSUME(As);
      this.CONSUME(Identifier, { LABEL: 'alias' });
    });
    this.OPTION2(() => {
      this.SUBRULE(this.settingsBlock, { LABEL: 'tableSettings' });
    });
    this.CONSUME(LCurly);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.columnDef) },
        { ALT: () => this.SUBRULE(this.indexesDef) },
        { ALT: () => this.SUBRULE(this.checksDef) },
        { ALT: () => this.SUBRULE(this.recordsInnerDef) },
        { ALT: () => this.SUBRULE(this.noteDef) },
        { ALT: () => this.SUBRULE(this.partialUsage) },
      ]);
    });
    this.CONSUME(RCurly);
  });

  // ---- Column ----
  private columnDef = this.RULE('columnDef', () => {
    this.SUBRULE(this.columnName, { LABEL: 'colName' });
    this.SUBRULE(this.columnType, { LABEL: 'colType' });
    this.MANY(() => {
      this.SUBRULE(this.settingsBlock, { LABEL: 'colSettings' });
    });
  });

  private columnName = this.RULE('columnName', () => {
    this.OR([
      { ALT: () => this.CONSUME(Identifier) },
      { ALT: () => this.CONSUME(DoubleQuoteString) },
      // Keywords that may also appear as column names
      { ALT: () => this.CONSUME(Name) },
      { ALT: () => this.CONSUME(Type) },
      { ALT: () => this.CONSUME(Note) },
      { ALT: () => this.CONSUME(Check) },
      { ALT: () => this.CONSUME(Delete) },
      { ALT: () => this.CONSUME(Update) },
      { ALT: () => this.CONSUME(Default) },
      { ALT: () => this.CONSUME(Color) },
      { ALT: () => this.CONSUME(Null) },
      { ALT: () => this.CONSUME(Unique) },
      { ALT: () => this.CONSUME(Cascade) },
      { ALT: () => this.CONSUME(Restrict) },
      { ALT: () => this.CONSUME(Hash) },
      { ALT: () => this.CONSUME(True) },
      { ALT: () => this.CONSUME(False) },
      { ALT: () => this.CONSUME(Ref) },
      { ALT: () => this.CONSUME(Enum) },
      { ALT: () => this.CONSUME(Table) },
      { ALT: () => this.CONSUME(Project) },
      { ALT: () => this.CONSUME(Increment) },
      { ALT: () => this.CONSUME(NotNull) },
      { ALT: () => this.CONSUME(PrimaryKey) },
      { ALT: () => this.CONSUME(Pk) },
      { ALT: () => this.CONSUME(TableGroup) },
    ]);
  });

  private columnType = this.RULE('columnType', () => {
    this.SUBRULE(this.qualifiedName, { LABEL: 'typeName' });
    this.OPTION(() => {
      this.CONSUME(LParen);
      this.CONSUME(NumberLiteral, { LABEL: 'typeParam1' });
      this.OPTION2(() => {
        this.CONSUME(Comma);
        this.CONSUME2(NumberLiteral, { LABEL: 'typeParam2' });
      });
      this.CONSUME(RParen);
    });
  });

  // ---- Settings Block [ ... ] ----
  private settingsBlock = this.RULE('settingsBlock', () => {
    this.CONSUME(LSquare);
    this.MANY_SEP({
      SEP: Comma,
      DEF: () => {
        this.SUBRULE(this.settingItem);
      },
    });
    this.CONSUME(RSquare);
  });

  private settingItem = this.RULE('settingItem', () => {
    this.OR([
      { ALT: () => this.CONSUME(PrimaryKey, { LABEL: 'pk' }) },
      { ALT: () => this.CONSUME(Pk, { LABEL: 'pk2' }) },
      { ALT: () => this.CONSUME(NotNull, { LABEL: 'notNull' }) },
      { ALT: () => this.CONSUME(Null, { LABEL: 'null' }) },
      { ALT: () => this.CONSUME(Unique, { LABEL: 'unique' }) },
      { ALT: () => this.CONSUME(Increment, { LABEL: 'increment' }) },
      { ALT: () => this.SUBRULE(this.defaultSetting) },
      { ALT: () => this.SUBRULE(this.noteSetting) },
      { ALT: () => this.SUBRULE(this.refSetting) },
      { ALT: () => this.SUBRULE(this.deleteSetting) },
      { ALT: () => this.SUBRULE(this.updateSetting) },
      { ALT: () => this.SUBRULE(this.nameSetting) },
      { ALT: () => this.SUBRULE(this.typeSetting) },
      { ALT: () => this.SUBRULE(this.headerColorSetting) },
      { ALT: () => this.SUBRULE(this.colorSetting) },
      { ALT: () => this.SUBRULE(this.checkSetting) },
    ]);
  });

  private defaultSetting = this.RULE('defaultSetting', () => {
    this.CONSUME(Default);
    this.CONSUME(Colon);
    this.SUBRULE(this.settingValue);
  });

  private noteSetting = this.RULE('noteSetting', () => {
    this.CONSUME(Note);
    this.CONSUME(Colon);
    this.SUBRULE(this.stringValue);
  });

  private refSetting = this.RULE('refSetting', () => {
    this.CONSUME(Ref);
    this.CONSUME(Colon);
    this.SUBRULE(this.relationOp, { LABEL: 'relOp' });
    this.SUBRULE(this.qualifiedName, { LABEL: 'refTarget' });
  });

  private deleteSetting = this.RULE('deleteSetting', () => {
    this.CONSUME(Delete);
    this.CONSUME(Colon);
    this.SUBRULE(this.referentialAction);
  });

  private updateSetting = this.RULE('updateSetting', () => {
    this.CONSUME(Update);
    this.CONSUME(Colon);
    this.SUBRULE(this.referentialAction);
  });

  private nameSetting = this.RULE('nameSetting', () => {
    this.CONSUME(Name);
    this.CONSUME(Colon);
    this.SUBRULE(this.stringValue);
  });

  private typeSetting = this.RULE('typeSetting', () => {
    this.CONSUME(Type);
    this.CONSUME(Colon);
    this.OR([
      { ALT: () => this.CONSUME(Btree) },
      { ALT: () => this.CONSUME(Hash) },
    ]);
  });

  private headerColorSetting = this.RULE('headerColorSetting', () => {
    this.CONSUME(HeaderColor);
    this.CONSUME(Colon);
    this.CONSUME(HexColor);
  });

  private colorSetting = this.RULE('colorSetting', () => {
    this.CONSUME(Color);
    this.CONSUME(Colon);
    this.CONSUME(HexColor);
  });

  private checkSetting = this.RULE('checkSetting', () => {
    this.CONSUME(Check);
    this.CONSUME(Colon);
    this.CONSUME(BacktickExpression);
  });

  private referentialAction = this.RULE('referentialAction', () => {
    this.OR([
      { ALT: () => this.CONSUME(Cascade) },
      { ALT: () => this.CONSUME(Restrict) },
      { ALT: () => this.CONSUME(SetNull) },
      { ALT: () => this.CONSUME(SetDefault) },
      { ALT: () => this.CONSUME(NoAction) },
    ]);
  });

  private settingValue = this.RULE('settingValue', () => {
    this.OR([
      { ALT: () => this.CONSUME(NumberLiteral) },
      { ALT: () => this.CONSUME(Identifier) },
      { ALT: () => this.CONSUME(True) },
      { ALT: () => this.CONSUME(False) },
      { ALT: () => this.CONSUME(Null) },
      { ALT: () => this.CONSUME(BacktickExpression) },
      { ALT: () => this.SUBRULE(this.stringValue) },
    ]);
  });

  // ---- Indexes ----
  private indexesDef = this.RULE('indexesDef', () => {
    this.CONSUME(Indexes);
    this.CONSUME(LCurly);
    this.MANY(() => {
      this.SUBRULE(this.indexEntry);
    });
    this.CONSUME(RCurly);
  });

  private indexEntry = this.RULE('indexEntry', () => {
    this.OR([
      { ALT: () => {
        this.CONSUME(LParen);
        this.AT_LEAST_ONE_SEP({
          SEP: Comma,
          DEF: () => this.SUBRULE(this.indexColumnItem),
        });
        this.CONSUME(RParen);
      }},
      { ALT: () => this.SUBRULE2(this.indexColumnItem, { LABEL: 'singleCol' }) },
    ]);
    this.OPTION(() => {
      this.SUBRULE(this.settingsBlock, { LABEL: 'indexSettings' });
    });
  });

  private indexColumnItem = this.RULE('indexColumnItem', () => {
    this.OR([
      { ALT: () => this.CONSUME(BacktickExpression, { LABEL: 'expr' }) },
      { ALT: () => this.SUBRULE(this.columnName, { LABEL: 'colName' }) },
    ]);
  });

  // ---- Checks ----
  private checksDef = this.RULE('checksDef', () => {
    this.CONSUME(Checks);
    this.CONSUME(LCurly);
    this.MANY(() => {
      this.CONSUME(BacktickExpression, { LABEL: 'checkExpr' });
      this.OPTION(() => {
        this.SUBRULE(this.settingsBlock, { LABEL: 'checkSettings' });
      });
    });
    this.CONSUME(RCurly);
  });

  // ---- Note ----
  private noteDef = this.RULE('noteDef', () => {
    this.CONSUME(Note);
    this.OR([
      { ALT: () => {
        this.CONSUME(Colon);
        this.SUBRULE(this.stringValue);
      }},
      { ALT: () => {
        this.CONSUME(LCurly);
        this.MANY(() => {
          this.SUBRULE2(this.stringValue);
        });
        this.CONSUME(RCurly);
      }},
    ]);
  });

  // ---- Partial Usage ----
  private partialUsage = this.RULE('partialUsage', () => {
    this.CONSUME(Tilde);
    this.CONSUME(Identifier, { LABEL: 'partialName' });
  });

  // ---- TablePartial ----
  private tablePartialDef = this.RULE('tablePartialDef', () => {
    this.CONSUME(TablePartial);
    this.CONSUME(Identifier, { LABEL: 'partialName' });
    this.OPTION(() => {
      this.SUBRULE(this.settingsBlock, { LABEL: 'partialSettings' });
    });
    this.CONSUME(LCurly);
    this.MANY(() => {
      this.OR([
        { ALT: () => this.SUBRULE(this.columnDef) },
        { ALT: () => this.SUBRULE(this.indexesDef) },
      ]);
    });
    this.CONSUME(RCurly);
  });

  // ---- Enum ----
  private enumDef = this.RULE('enumDef', () => {
    this.CONSUME(Enum);
    this.SUBRULE(this.qualifiedName, { LABEL: 'enumName' });
    this.CONSUME(LCurly);
    this.MANY(() => {
      this.SUBRULE(this.enumValue);
    });
    this.CONSUME(RCurly);
  });

  private enumValue = this.RULE('enumValue', () => {
    this.OR([
      { ALT: () => this.CONSUME(Identifier, { LABEL: 'valueName' }) },
      { ALT: () => this.CONSUME(DoubleQuoteString, { LABEL: 'quotedValue' }) },
    ]);
    this.OPTION(() => {
      this.SUBRULE(this.settingsBlock, { LABEL: 'enumValueSettings' });
    });
  });

  // ---- Ref ----
  private refDef = this.RULE('refDef', () => {
    this.CONSUME(Ref);
    this.OPTION(() => {
      this.CONSUME(Identifier, { LABEL: 'refName' });
    });
    this.OR([
      { ALT: () => {
        this.CONSUME(Colon);
        this.SUBRULE(this.refBody);
      }},
      { ALT: () => {
        this.CONSUME(LCurly);
        this.SUBRULE2(this.refBody);
        this.CONSUME(RCurly);
      }},
    ]);
  });

  private refBody = this.RULE('refBody', () => {
    this.SUBRULE(this.refEndpoint, { LABEL: 'fromEndpoint' });
    this.SUBRULE(this.relationOp, { LABEL: 'relOp' });
    this.SUBRULE2(this.refEndpoint, { LABEL: 'toEndpoint' });
    this.OPTION(() => {
      this.SUBRULE(this.settingsBlock, { LABEL: 'refSettings' });
    });
  });

  private refEndpoint = this.RULE('refEndpoint', () => {
    // Can be: table.col or schema.table.col or table.(col1, col2) or schema.table.(col1, col2)
    this.SUBRULE(this.refPart, { LABEL: 'part1' });
    this.CONSUME(Dot);
    this.OR([
      { ALT: () => {
        this.CONSUME(LParen);
        this.AT_LEAST_ONE_SEP({
          SEP: Comma,
          DEF: () => this.SUBRULE2(this.refPart, { LABEL: 'compositeCol' }),
        });
        this.CONSUME(RParen);
      }},
      { ALT: () => {
        this.SUBRULE3(this.refPart, { LABEL: 'part2' });
        this.OPTION(() => {
          this.CONSUME2(Dot);
          this.OR2([
            { ALT: () => {
              this.CONSUME2(LParen);
              this.AT_LEAST_ONE_SEP2({
                SEP: Comma,
                DEF: () => this.SUBRULE4(this.refPart, { LABEL: 'compositeCol2' }),
              });
              this.CONSUME2(RParen);
            }},
            { ALT: () => this.SUBRULE5(this.refPart, { LABEL: 'part3' }) },
          ]);
        });
      }},
    ]);
  });

  private refPart = this.RULE('refPart', () => {
    this.OR([
      { ALT: () => this.CONSUME(Identifier) },
      { ALT: () => this.CONSUME(DoubleQuoteString) },
    ]);
  });

  private relationOp = this.RULE('relationOp', () => {
    this.OR([
      { ALT: () => this.CONSUME(ManyToMany) },
      { ALT: () => this.CONSUME(LessThan) },
      { ALT: () => this.CONSUME(GreaterThan) },
      { ALT: () => this.CONSUME(Dash) },
    ]);
  });

  // ---- TableGroup ----
  private tableGroupDef = this.RULE('tableGroupDef', () => {
    this.CONSUME(TableGroup);
    this.OR([
      { ALT: () => this.CONSUME(DoubleQuoteString, { LABEL: 'quotedGroupName' }) },
      { ALT: () => this.CONSUME(Identifier, { LABEL: 'groupName' }) },
    ]);
    this.OPTION(() => {
      this.SUBRULE(this.settingsBlock, { LABEL: 'groupSettings' });
    });
    this.CONSUME(LCurly);
    this.MANY(() => {
      this.OR2([
        { ALT: () => this.SUBRULE(this.noteDef) },
        { ALT: () => this.SUBRULE(this.qualifiedName, { LABEL: 'groupTable' }) },
      ]);
    });
    this.CONSUME(RCurly);
  });

  // ---- Sticky Note ----
  private stickyNoteDef = this.RULE('stickyNoteDef', () => {
    this.CONSUME(Note);
    this.CONSUME(Identifier, { LABEL: 'noteName' });
    this.CONSUME(LCurly);
    this.SUBRULE(this.stringValue);
    this.CONSUME(RCurly);
  });

  // ---- Records (Standalone) ----
  private recordsDef = this.RULE('recordsDef', () => {
    this.CONSUME(Records);
    this.CONSUME(Identifier, { LABEL: 'tableName' });
    this.OPTION(() => {
      this.CONSUME(LParen);
      this.AT_LEAST_ONE_SEP({
        SEP: Comma,
        DEF: () => this.CONSUME2(Identifier, { LABEL: 'columnList' }),
      });
      this.CONSUME(RParen);
    });
    this.CONSUME(LCurly);
    // Records body — we skip detailed parsing of data rows for now
    this.MANY(() => {
      this.SUBRULE(this.recordValue);
    });
    this.CONSUME(RCurly);
  });

  // ---- Records (Inner, inside table) ----
  private recordsInnerDef = this.RULE('recordsInnerDef', () => {
    this.CONSUME(Records);
    this.OPTION(() => {
      this.CONSUME(LParen);
      this.AT_LEAST_ONE_SEP({
        SEP: Comma,
        DEF: () => this.CONSUME(Identifier, { LABEL: 'columnList' }),
      });
      this.CONSUME(RParen);
    });
    this.CONSUME(LCurly);
    this.MANY(() => {
      this.SUBRULE(this.recordValue);
    });
    this.CONSUME(RCurly);
  });

  private recordValue = this.RULE('recordValue', () => {
    this.OR([
      { ALT: () => this.CONSUME(NumberLiteral) },
      { ALT: () => this.CONSUME(SingleQuoteString) },
      { ALT: () => this.CONSUME(True) },
      { ALT: () => this.CONSUME(False) },
      { ALT: () => this.CONSUME(Null) },
      { ALT: () => this.CONSUME(BacktickExpression) },
      { ALT: () => {
        // Enum reference: Enum.value
        this.CONSUME(Identifier);
        this.OPTION(() => {
          this.CONSUME(Dot);
          this.CONSUME2(Identifier);
        });
      }},
      { ALT: () => this.CONSUME(Comma) },
    ]);
  });

  // ---- Helpers ----
  private qualifiedName = this.RULE('qualifiedName', () => {
    this.OR([
      { ALT: () => this.CONSUME(Identifier, { LABEL: 'firstName' }) },
      { ALT: () => this.CONSUME(DoubleQuoteString, { LABEL: 'quotedFirstName' }) },
    ]);
    this.OPTION(() => {
      this.CONSUME(Dot);
      this.OR2([
        { ALT: () => this.CONSUME2(Identifier, { LABEL: 'secondName' }) },
        { ALT: () => this.CONSUME2(DoubleQuoteString, { LABEL: 'quotedSecondName' }) },
      ]);
    });
  });

  private stringValue = this.RULE('stringValue', () => {
    this.OR([
      { ALT: () => this.CONSUME(TripleQuoteString) },
      { ALT: () => this.CONSUME(SingleQuoteString) },
      { ALT: () => this.CONSUME(DoubleQuoteString) },
    ]);
  });
}

export const dbmlParser = new DbmlParser();
