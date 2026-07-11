const fs = require('fs');
let noti = fs.readFileSync('src/components/tabs/NotiTab.tsx', 'utf-8');
noti = noti.replace(/<\/>\n\s*<\/div>\n\s*<\/>\n\s*\);\n\s*\}/, 
`                </>
              )}
            </div>
    </>
  );
}`);
fs.writeFileSync('src/components/tabs/NotiTab.tsx', noti, 'utf-8');
