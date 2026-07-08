const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  content = content.replace(/\bw-100\b/g, 'w-full');
  content = content.replace(/\bh-100\b/g, 'h-full');
  content = content.replace(/\bborder-top\b/g, 'border-t');
  content = content.replace(/\bborder-bottom-2\b/g, 'border-b-2');
  content = content.replace(/\bborder-bottom\b/g, 'border-b');
  
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed ${filePath}`);
  }
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

walkDir('src');
