const fs = require('fs');
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const targetStr = `              {lang === 'th' ? 'เริ่มใช้งานทันที' : 'Try Demo'}\n            </button>\n`;
const replacementStr = `              {lang === 'th' ? 'เริ่มใช้งานทันที' : 'Try Demo'}
            </button>
            <div className={\`mt-8 flex flex-wrap gap-4 items-center justify-center lg:justify-start text-[0.65rem] font-bold tracking-widest uppercase \${loginDarkMode ? "text-slate-400" : "text-slate-500"}\`}>
              <span className="flex items-center gap-1.5"><i className="fas fa-microchip text-emerald-500"></i> {lang === 'th' ? 'ใช้ AI วิเคราะห์พฤติกรรม' : 'AI Behavior Analysis'}</span>
              <span className="flex items-center gap-1.5"><i className="fas fa-satellite-dish text-sky-500"></i> {lang === 'th' ? 'รับข้อมูลสดจากเซนเซอร์' : 'Live Sensor Sync'}</span>
              <span className="flex items-center gap-1.5"><i className="fas fa-shield-alt text-indigo-500"></i> {lang === 'th' ? 'ความปลอดภัยระดับสูง' : 'Enterprise Security'}</span>
            </div>
`;

content = content.replace(targetStr, replacementStr);
fs.writeFileSync('src/App.tsx', content);
