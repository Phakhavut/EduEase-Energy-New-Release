const fs = require('fs');
let content = fs.readFileSync('src/components/EnergyMonitoringHub.tsx', 'utf8');

const richerAnalysis = `
          {/* Deep AI Analysis Insights */}
          <div className="mt-8">
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-widest mb-4 flex items-center gap-2">
              <i className="fas fa-microchip text-blue-500"></i>
              {lang === 'th' ? 'ข้อมูลเชิงลึกจากการวิเคราะห์ของ AI (AI Insights)' : 'AI Analytical Insights'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1 */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg">
                      <i className="fas fa-snowflake"></i>
                    </div>
                    <div>
                      <div className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest">{lang === 'th' ? 'ประสิทธิภาพการทำความเย็น' : 'Cooling Efficiency'}</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{lang === 'th' ? 'แอร์ห้องนั่งเล่นทำงานหนัก' : 'Living Room AC Overload'}</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-rose-500/10 text-rose-600 rounded text-xs font-bold uppercase">{lang === 'th' ? 'ความเสี่ยงสูง' : 'High Priority'}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {lang === 'th' ? 'ตรวจพบการใช้พลังงานของคอมเพรสเซอร์แอร์ห้องนั่งเล่นพุ่งสูงผิดปกติในช่วงเวลา 13:00 - 15:00 น. คาดว่าเกิดจากอุณหภูมิภายนอกที่สูงขึ้น หรือมีการรั่วซึมของความเย็น' : 'Detected unusual power spikes in the Living Room AC compressor between 13:00 - 15:00. Likely due to high external temperature or cooling leak.'}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-medium">{lang === 'th' ? 'แนวทางแก้ไข: ปรับอุณหภูมิเป็น 26°C และเปิดพัดลม' : 'Action: Set to 26°C & use fan'}</span>
                  <span className="text-sm text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full">{lang === 'th' ? 'เซฟ: ฿250/ด.' : 'Save: ฿250/mo'}</span>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg">
                      <i className="fas fa-plug"></i>
                    </div>
                    <div>
                      <div className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest">{lang === 'th' ? 'กระแสไฟฟ้ารั่วไหล (Standby)' : 'Vampire Draw Analysis'}</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{lang === 'th' ? 'พบ 5 อุปกรณ์ Standby ทิ้งไว้' : '5 Devices on Standby'}</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-amber-500/10 text-amber-600 rounded text-xs font-bold uppercase">{lang === 'th' ? 'ปานกลาง' : 'Medium Priority'}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {lang === 'th' ? 'มีอุปกรณ์บันเทิง (TV, เครื่องเสียง, เกมคอนโซล) เสียบปลั๊กทิ้งไว้ตลอด 24 ชั่วโมงแม้ไม่ได้ใช้งาน ทำให้เกิดการสูญเสียพลังงานสะสม' : 'Entertainment systems (TV, Sound system, Consoles) are left plugged in 24/7, causing cumulative standby power waste.'}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-medium">{lang === 'th' ? 'แนวทางแก้ไข: ใช้ปลั๊กพ่วงแบบมีสวิตช์ปิด-เปิด' : 'Action: Use smart power strips'}</span>
                  <span className="text-sm text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full">{lang === 'th' ? 'เซฟ: ฿180/ด.' : 'Save: ฿180/mo'}</span>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg">
                      <i className="fas fa-chart-area"></i>
                    </div>
                    <div>
                      <div className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest">{lang === 'th' ? 'การกระจายโหลด (TOU)' : 'TOU Load Shifting'}</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{lang === 'th' ? 'การใช้ไฟกระจุกตัวช่วง Peak' : 'Peak Hour Concentration'}</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-rose-500/10 text-rose-600 rounded text-xs font-bold uppercase">{lang === 'th' ? 'ความเสี่ยงสูง' : 'High Priority'}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {lang === 'th' ? 'คุณมักใช้งานเครื่องซักผ้าและเครื่องทำน้ำอุ่นพร้อมกันในช่วงเวลา 18:00 - 20:00 น. ซึ่งเป็นช่วงเวลาที่ค่าไฟแพงที่สุดของมิเตอร์แบบ TOU' : 'Heavy usage of washing machine and water heater detected between 18:00 - 20:00, which falls into the most expensive TOU peak rate.'}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-medium">{lang === 'th' ? 'แนวทางแก้ไข: เลื่อนซักผ้าไปหลัง 22:00 น.' : 'Action: Shift laundry to after 22:00'}</span>
                  <span className="text-sm text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full">{lang === 'th' ? 'เซฟ: ฿320/ด.' : 'Save: ฿320/mo'}</span>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg">
                      <i className="fas fa-leaf"></i>
                    </div>
                    <div>
                      <div className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest">{lang === 'th' ? 'ความสม่ำเสมอในการใช้ไฟ' : 'Consumption Consistency'}</div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{lang === 'th' ? 'รูปแบบการใช้พลังงานเสถียรดี' : 'Stable Power Patterns'}</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-emerald-500/10 text-emerald-600 rounded text-xs font-bold uppercase">{lang === 'th' ? 'ดีเยี่ยม' : 'Optimal'}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {lang === 'th' ? 'การใช้ตู้เย็นและอุปกรณ์ส่องสว่างของคุณอยู่ในเกณฑ์มาตรฐาน ไม่พบความผิดปกติหรือกระแสไฟกระชากที่อาจก่อให้เกิดความเสียหายกับเครื่องใช้ไฟฟ้า' : 'Refrigerator and lighting consumption patterns are well within standard baselines. No power surges or anomalies detected.'}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 font-medium">{lang === 'th' ? 'แนวทาง: รักษาพฤติกรรมนี้ต่อไป' : 'Action: Maintain current patterns'}</span>
                  <span className="text-sm text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 px-3 py-1 rounded-full">{lang === 'th' ? 'สถานะ: ปลอดภัย' : 'Status: Healthy'}</span>
                </div>
              </div>
            </div>
            
            {/* AI Summary Banner */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 flex items-center gap-4">
               <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center shrink-0">
                  <i className="fas fa-robot text-xl"></i>
               </div>
               <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-200 mb-1">{lang === 'th' ? 'บทสรุปผู้บริหาร' : 'Executive Summary'}</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {lang === 'th' 
                      ? 'หากทำตามคำแนะนำทั้งหมด คาดว่าจะลดค่าไฟรวมได้ประมาณ ฿750 - ฿900 ต่อเดือน (ลดลง 15-20%) โดยไม่กระทบความสะดวกสบาย' 
                      : 'Implementing these AI-driven recommendations could reduce total monthly energy costs by ฿750 - ฿900 (15-20% reduction) without compromising comfort.'}
                  </p>
               </div>
            </div>
          </div>
`;

content = content.replace(/\{\/\* Deep AI Analysis Insights \*\/\}.*?(?=<\/div>\s*<\/div>\s*\{\/\* Expandable Advanced Charts \*\/})/s, richerAnalysis);

fs.writeFileSync('src/components/EnergyMonitoringHub.tsx', content);
