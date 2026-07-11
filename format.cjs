const fs = require('fs');

function fixFile(file, regex, replacement) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(file, content, 'utf-8');
}

// 1. CalculatorTab
// The end was completely messed up by my script.
// Let's replace the last 20 lines with the right ones.
let calc = fs.readFileSync('src/components/tabs/CalculatorTab.tsx', 'utf-8');
calc = calc.replace(/<p>\s*\{lang === "th"\s*\?\s*"คุณยังคงรักษาวินัยกริดได้อย่างยอดเยี่ยม เพื่อสะสมเหรียญรางวัลเพิ่มขึ้น แนะนำให้ตั้งเวลาประหยัดพลังงานเสริมสำหรับเครื่องปรับอากาศ และปิดสแตนด์บายเครื่องใช้ไฟฟ้าที่ไม่ได้ใช้งานเป็นประจำ"\s*:\s*"You are maintaining high green-grid status. To earn more sustainability tokens, schedule deep Eco modes for home cooling and completely unplug entertainment devices when dormant."\}\s*<\/p>\s*<\/div>\)[\s\S]*$/, 
`<p>
                              {lang === "th"
                                ? "คุณยังคงรักษาวินัยกริดได้อย่างยอดเยี่ยม เพื่อสะสมเหรียญรางวัลเพิ่มขึ้น แนะนำให้ตั้งเวลาประหยัดพลังงานเสริมสำหรับเครื่องปรับอากาศ และปิดสแตนด์บายเครื่องใช้ไฟฟ้าที่ไม่ได้ใช้งานเป็นประจำ"
                                : "You are maintaining high green-grid status. To earn more sustainability tokens, schedule deep Eco modes for home cooling and completely unplug entertainment devices when dormant."}
                            </p>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
    </>
  );
}
`);
fs.writeFileSync('src/components/tabs/CalculatorTab.tsx', calc);

// 2. ManualTab
let man = fs.readFileSync('src/components/tabs/ManualTab.tsx', 'utf-8');
man = man.replace(/onClick=\{onLogout\}\n\s*>\n\s*\{t\("set_terminate"\)\}\n\s*<\/button>\n\s*<\/div>\n\s*\)\n\s*<\/div>\n\s*\)\}\n\s*<\/>\n\s*\);\n\s*\}/, 
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

// 3. StatsTab
let stat = fs.readFileSync('src/components/tabs/StatsTab.tsx', 'utf-8');
// Fix the telemetry_monthly one which still failed
stat = stat.replace(/: "telemetry_monthly",\n\s*<\/button>\n\s*\),/g, 
`: "telemetry_monthly"
                              )}
                            </button>
                          )`);
// Fix the end
stat = stat.replace(/<\/ResponsiveContainer>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*\)\}\n\s*<\/>\n\s*\);\n\s*\}/g,
`</ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}
            </div>
    </>
  );
}
`);
fs.writeFileSync('src/components/tabs/StatsTab.tsx', stat);

console.log('Fixed syntax again!');
