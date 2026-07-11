const fs = require('fs');

let calc = fs.readFileSync('src/components/tabs/CalculatorTab.tsx', 'utf-8');
calc = calc.replace(/<\/div>\n            <\/div>\n    <\/>/g, '</div>\n            </div>\n            )}\n    </>');
fs.writeFileSync('src/components/tabs/CalculatorTab.tsx', calc);

let noti = fs.readFileSync('src/components/tabs/NotiTab.tsx', 'utf-8');
noti = noti.replace(/Gemini Core\n                                <\/span>\n                              <\/div>\n                            <\/div>/g, 'Gemini Core\n                                </span>\n                              )}\n                              </div>\n                            </div>');
fs.writeFileSync('src/components/tabs/NotiTab.tsx', noti);

let dev = fs.readFileSync('src/components/tabs/DevicesTab.tsx', 'utf-8');
dev = dev.replace(/<\/button>\n                  <button\n                    className="btn btn-white/g, '</button>\n                  )}\n                  <button\n                    className="btn btn-white');
fs.writeFileSync('src/components/tabs/DevicesTab.tsx', dev);

let man = fs.readFileSync('src/components/tabs/ManualTab.tsx', 'utf-8');
man = man.replace(/<\/div>\n              <\/div>\n    <\/>/g, '</div>\n              </div>\n              )}\n    </>');
fs.writeFileSync('src/components/tabs/ManualTab.tsx', man);

let stat = fs.readFileSync('src/components/tabs/StatsTab.tsx', 'utf-8');
stat = stat.replace(/<\/div>\n              <\/div>\n    <\/>/g, '</div>\n              </div>\n              )}\n    </>');
fs.writeFileSync('src/components/tabs/StatsTab.tsx', stat);

console.log('Fixed braces!');
