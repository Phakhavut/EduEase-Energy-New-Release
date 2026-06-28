const fs = require('fs');

function fix(file, replaces) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    for (const [from, to] of replaces) {
      content = content.split(from).join(to);
    }
    fs.writeFileSync(file, content);
  }
}

fix('src/components/UserManual.tsx', [
  ['dark:text-rose-450', 'dark:text-rose-400']
]);

console.log('Fixed UserManual text colors');
