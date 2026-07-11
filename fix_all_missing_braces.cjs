const fs = require('fs');

const fixes = [
  {
    file: 'src/components/tabs/CalculatorTab.tsx',
    find: '                          </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n            </div>\n    </>',
    replace: '                          </div>\n                      </div>\n                    </div>\n                  </div>\n                </div>\n            </div>\n            )}\n    </>'
  },
  {
    file: 'src/components/tabs/DevicesTab.tsx',
    find: '                    </button>\n                  <button\n                    className="btn btn-white',
    replace: '                    </button>\n                  )}\n                  <button\n                    className="btn btn-white'
  },
  {
    file: 'src/components/tabs/ManualTab.tsx',
    find: '                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n    </>',
    replace: '                      </div>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              )}\n    </>'
  },
  {
    file: 'src/components/tabs/NotiTab.tsx',
    find: '                                </span>\n                              </div>\n                            </div>',
    replace: '                                </span>\n                              )}\n                              </div>\n                            </div>'
  },
  {
    file: 'src/components/tabs/NotiTab.tsx',
    find: '                            </div>\n                        </div>\n                      ))\n                    ) : (\n                      <div',
    replace: '                            </div>\n                        </div>\n                      ))\n                    ) : (\n                      <div'
  },
  {
    file: 'src/components/tabs/StatsTab.tsx',
    find: '                          />\n                        </BarChart>\n                      </ResponsiveContainer>\n                    </div>\n                  </div>\n                </div>\n              </div>\n    </>',
    replace: '                          />\n                        </BarChart>\n                      </ResponsiveContainer>\n                    </div>\n                  </div>\n                </div>\n              </div>\n              )}\n    </>'
  }
];

fixes.forEach(f => {
  let code = fs.readFileSync(f.file, 'utf-8');
  code = code.replace(f.find, f.replace);
  fs.writeFileSync(f.file, code, 'utf-8');
});
console.log('Fixed more braces!');
