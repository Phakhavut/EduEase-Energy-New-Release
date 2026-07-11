const fs = require('fs');

let code = fs.readFileSync('src/components/Dashboard.tsx', 'utf-8');

// I just need to replace `</Suspense>` with `</Suspense>\n          )}`
// Because each Suspense is the content of a `{currentPage === "xyz" && (` block!
// Wait, the conditional block expects `)}`.

code = code.replace(/<\/Suspense>/g, '</Suspense>\n          )}');

fs.writeFileSync('src/components/Dashboard.tsx', code, 'utf-8');
console.log('Fixed missing conditionals ends!');
