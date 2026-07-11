const fs = require('fs');
let man = fs.readFileSync('src/components/tabs/ManualTab.tsx', 'utf-8');
man = man.replace(/onClick=\{onLogout\}[\s\S]*$/, 
`onClick={onLogout}
                  >
                    {t("set_terminate")}
                  </button>
                </div>
              )}
            </div>
    </>
  );
}
`);
fs.writeFileSync('src/components/tabs/ManualTab.tsx', man);
