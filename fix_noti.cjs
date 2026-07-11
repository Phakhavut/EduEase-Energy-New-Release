const fs = require('fs');

let noti = fs.readFileSync('src/components/tabs/NotiTab.tsx', 'utf-8');
noti = noti.replace(/Simulated <\/span>\n\s*\)\n\s*\)\}\n\s*<\/div>/g, 'Simulated </span>\n                              )}\n                            </div>\n                          )}');

// Fix the map )
noti = noti.replace(/<\/p>\n\s*<\/div>\n\s*\)\n\s*<\/div>\n\s*<\/div>\n\s*<div/g, '</p>\n                          </div>\n                        </div>\n                      ))\n                    ) : (\n                      <div');

fs.writeFileSync('src/components/tabs/NotiTab.tsx', noti, 'utf-8');
console.log('Fixed NotiTab!');
