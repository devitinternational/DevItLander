import fs from 'fs';
import path from 'path';

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('from "framer-motion"')) {
        content = content.replace(/import\s*\{([^}]*\b)motion(\b[^}]*)\}\s*from\s+["']framer-motion["']/g, (match, prefix, suffix) => {
            return `import {${prefix}m as motion${suffix}} from "framer-motion"`;
        });
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}
walkDir('src/components');
console.log('Motion imports refactored');
