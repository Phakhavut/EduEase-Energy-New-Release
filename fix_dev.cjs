const fs = require('fs');
let code = fs.readFileSync('src/components/tabs/DevicesTab.tsx', 'utf-8');
code = code.replace(/\{t\("node_compare_btn"\)\} \(\{compareDeviceIds\.length\}\)\n                    <\/button>\n                  <button/g, '{t("node_compare_btn")} ({compareDeviceIds.length})\n                    </button>\n                  )}\n                  <button');
fs.writeFileSync('src/components/tabs/DevicesTab.tsx', code, 'utf-8');
