const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `            <button
              className={\`lg:hidden p-2 rounded-xl transition-all \${isDarkMode ? 'text-white/70 hover:bg-white/10' : 'text-slate-600 hover:bg-slate-200/50'}\`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <i className={\`fas \${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg\`}></i>
            </button>`;

const mobileMenuStr = `<div className={\`lg:hidden absolute top-0 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-2xl transition-all duration-500 z-40 overflow-hidden \${isMobileMenuOpen ? 'h-auto max-h-[100dvh] opacity-100 py-24' : 'max-h-0 opacity-0 py-0'}\`}>
           
        </div>`;

code = code.replace(targetStr, '');
code = code.replace(mobileMenuStr, '');

fs.writeFileSync('src/App.tsx', code, 'utf-8');
console.log('done');
