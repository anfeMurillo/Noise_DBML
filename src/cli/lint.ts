// ============================================================
// Noise DBML — CLI Linter
// ============================================================

import * as fs from 'fs';
import * as path from 'path';
import { lintDbml } from '../parser/visitor';

function main() {
  const args = process.argv.slice(2);
  const files: string[] = [];

  if (args.length === 0) {
    // If no args, look for all .dbml files recursively in current directory
    const findDbmlFiles = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name === '.git') continue;
        const res = path.resolve(dir, entry.name);
        if (entry.isDirectory()) {
          findDbmlFiles(res);
        } else if (entry.name.endsWith('.dbml')) {
          files.push(res);
        }
      }
    };
    findDbmlFiles(process.cwd());
  } else {
    // Otherwise use provided files or directories
    args.forEach(arg => {
      const fullPath = path.resolve(process.cwd(), arg);
      if (fs.existsSync(fullPath)) {
        if (fs.lstatSync(fullPath).isDirectory()) {
          // Add all .dbml files in directory
          fs.readdirSync(fullPath).forEach(f => {
            if (f.endsWith('.dbml')) files.push(path.join(fullPath, f));
          });
        } else if (fullPath.endsWith('.dbml')) {
          files.push(fullPath);
        }
      }
    });
  }

  if (files.length === 0) {
    console.log('No DBML files found to lint.');
    process.exit(0);
  }

  let totalErrors = 0;
  let totalWarnings = 0;

  console.log(`\nLinting ${files.length} DBML files...\n`);

  files.forEach(file => {
    const text = fs.readFileSync(file, 'utf8');
    const { errors } = lintDbml(text);
    const relFile = path.relative(process.cwd(), file);

    if (errors.length > 0) {
      console.log(`\x1b[4m${relFile}\x1b[0m`);
      errors.forEach(err => {
        const type = err.severity === 'error' ? '\x1b[31m[ERROR]\x1b[0m' : '\x1b[33m[WARNING]\x1b[0m';
        if (err.severity === 'error') totalErrors++;
        else totalWarnings++;

        console.log(`  ${err.line}:${err.column}  ${type}  ${err.message}`);
      });
      console.log('');
    }
  });

  if (totalErrors > 0 || totalWarnings > 0) {
    console.log(`Totals: ${totalErrors} errors, ${totalWarnings} warnings`);
    process.exit(totalErrors > 0 ? 1 : 0);
  } else {
    console.log('\x1b[32m✔ No syntax or logic issues found!\x1b[0m\n');
    process.exit(0);
  }
}

main();
