const fs = require('fs');

let calc = fs.readFileSync('src/components/tabs/CalculatorTab.tsx', 'utf-8');

// The ternary is: 
// isUnderBudget ? ( <div className="space-y-3"> ... </div> ) : ( <div className="space-y-3"> ... </div> )
// We need to just close it with `)}` !

calc = calc.replace(/when dormant\."\}\s*<\/p>\s*<\/div>\)[\s\S]*$/, 
`when dormant."}
                            </p>
                          </div>
                        )}
                      </div>
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
console.log('Fixed calc!');
