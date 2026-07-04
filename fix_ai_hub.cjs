const fs = require('fs');
let content = fs.readFileSync('src/components/EnergyMonitoringHub.tsx', 'utf8');

const additionalAnalysis = `
          {/* Deep AI Analysis Insights */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 md:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-blue-500/30 transition-colors">
              <div className="text-blue-500 mb-3"><i className="fas fa-snowflake text-xl"></i></div>
              <div className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest mb-1.5">{lang === 'th' ? 'พฤติกรรมทำความเย็น' : 'Cooling Inefficiency'}</div>
              <div className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight mb-2">{lang === 'th' ? 'แอร์ห้องนั่งเล่นทำงานหนักเกินไปในช่วงบ่าย' : 'Living room AC overworking during peak afternoon.'}</div>
              <div className="text-xs text-emerald-500 font-bold bg-emerald-500/10 inline-block px-2 py-1 rounded-md">{lang === 'th' ? 'ประหยัดได้: ฿150/เดือน' : 'Potential Savings: ฿150/mo'}</div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 md:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-amber-500/30 transition-colors">
              <div className="text-amber-500 mb-3"><i className="fas fa-plug text-xl"></i></div>
              <div className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest mb-1.5">{lang === 'th' ? 'กระแสไฟฟ้ารั่วไหล' : 'Vampire Draw'}</div>
              <div className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight mb-2">{lang === 'th' ? 'พบ 3 อุปกรณ์เสียบปลั๊กทิ้งไว้ตลอดคืน' : '3 devices left on standby overnight.'}</div>
              <div className="text-xs text-emerald-500 font-bold bg-emerald-500/10 inline-block px-2 py-1 rounded-md">{lang === 'th' ? 'ประหยัดได้: ฿85/เดือน' : 'Potential Savings: ฿85/mo'}</div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 md:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-purple-500/30 transition-colors">
              <div className="text-purple-500 mb-3"><i className="fas fa-chart-area text-xl"></i></div>
              <div className="text-[0.65rem] text-slate-500 font-bold uppercase tracking-widest mb-1.5">{lang === 'th' ? 'การกระจุกตัวของโหลด' : 'Peak Demand Density'}</div>
              <div className="font-bold text-slate-800 dark:text-slate-200 text-sm leading-tight mb-2">{lang === 'th' ? 'มีการใช้เครื่องซักผ้าในช่วง Peak (14:00)' : 'Heavy appliances running during Peak hours.'}</div>
              <div className="text-xs text-emerald-500 font-bold bg-emerald-500/10 inline-block px-2 py-1 rounded-md">{lang === 'th' ? 'ประหยัดได้: ฿120/เดือน' : 'Potential Savings: ฿120/mo'}</div>
            </div>
          </div>
`;

content = content.replace(
  /(\s*)(<\/div>\s*<\/div>\s*\{\/\* Expandable Advanced Charts \*\/})/,
  (match, p1, p2) => {
    return p1 + additionalAnalysis + p2;
  }
);

fs.writeFileSync('src/components/EnergyMonitoringHub.tsx', content);
