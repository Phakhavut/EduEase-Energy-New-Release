const fs = require('fs');

let noti = fs.readFileSync('src/components/tabs/NotiTab.tsx', 'utf-8');

noti = noti.replace(/<\/p>\n\s*<\/div>\n\s*<\/div>\n\s*\)\)\)<\/div>\n\s*<\/div>\n\s*\) : \(/,
`</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (`);

// And the end of NotiTab.tsx:
noti = noti.replace(/<\/div>\n\s*<\/div>\n\s*<\/div>\n\s*<\/>\n\s*\)\n\s*<\/div>\n\s*<\/div>\n\s*<div/,
`</div>
                    </div>
                  </div>
                </>
              )}
            </div>
    </>
  );
}`);

fs.writeFileSync('src/components/tabs/NotiTab.tsx', noti, 'utf-8');
console.log('Fixed NotiTab!');
