import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Coins, 
  ShieldCheck, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Gift, 
  Lock, 
  QrCode, 
  ExternalLink, 
  HelpCircle, 
  Flame, 
  RefreshCw, 
  Coffee, 
  TreePine, 
  Plug, 
  Receipt,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers,
  Award,
  Wallet
} from 'lucide-react';
import { AppPage, InfoDetailMode, UserPersona } from '../../types';

interface Web3GreenCryptoHubProps {
  lang: 'th' | 'en';
  isDarkMode: boolean;
  infoDetailMode: InfoDetailMode;
  onNavigatePage: (page: AppPage) => void;
  persona?: UserPersona;
  userCoins?: number;
}

interface CryptoBlock {
  blockNumber: number;
  date: string;
  kwhSaved: number;
  co2AvoidedKg: number;
  tokensMinted: number;
  hash: string;
  validator: string;
  status: 'confirmed' | 'pending';
}

export const Web3GreenCryptoHub: React.FC<Web3GreenCryptoHubProps> = ({
  lang,
  isDarkMode,
  infoDetailMode,
  onNavigatePage,
  persona = 'student',
  userCoins = 450,
}) => {
  // State for interactive crypto features
  const [ecoBalance, setEcoBalance] = useState<number>(240);
  const [pendingMintTokens, setPendingMintTokens] = useState<number>(38.5);
  const [isMinting, setIsMinting] = useState<boolean>(false);
  const [mintSuccessHash, setMintSuccessHash] = useState<string | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<CryptoBlock | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [redeemedCode, setRedeemedCode] = useState<{ title: string; code: string } | null>(null);

  // Verifiable blockchain blocks
  const [blocks, setBlocks] = useState<CryptoBlock[]>([
    {
      blockNumber: 10482,
      date: 'วันนี้ (Today)',
      kwhSaved: 4.8,
      co2AvoidedKg: 2.4,
      tokensMinted: 4.8,
      hash: '0x9e7b4a2f8c11e3b092a4f6d81234c8f1',
      validator: 'Node-MEA-GreenGrid-BKK',
      status: 'confirmed'
    },
    {
      blockNumber: 10481,
      date: 'เมื่อวาน (Yesterday)',
      kwhSaved: 5.2,
      co2AvoidedKg: 2.6,
      tokensMinted: 5.2,
      hash: '0x3d1a8c4b7e90f21a65c4e8b39922e720',
      validator: 'Node-PEA-SmartCampus-01',
      status: 'confirmed'
    },
    {
      blockNumber: 10480,
      date: '2 วันก่อน (2 days ago)',
      kwhSaved: 6.0,
      co2AvoidedKg: 3.0,
      tokensMinted: 6.0,
      hash: '0x1f5c90b4d823e9a117b6a5c20044a442',
      validator: 'Node-EGAT-Renewable-Hub',
      status: 'confirmed'
    }
  ]);

  // Handler to mint pending energy tokens
  const handleMintTokens = () => {
    if (pendingMintTokens <= 0 || isMinting) return;
    setIsMinting(true);
    setTimeout(() => {
      const newHash = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const minted = pendingMintTokens;
      setEcoBalance(prev => Math.round((prev + minted) * 10) / 10);
      setPendingMintTokens(0);
      setMintSuccessHash(newHash);
      setIsMinting(false);

      const newBlock: CryptoBlock = {
        blockNumber: blocks[0].blockNumber + 1,
        date: 'พึ่งออก (Just now)',
        kwhSaved: Math.round(minted * 10) / 10,
        co2AvoidedKg: Math.round(minted * 0.5 * 10) / 10,
        tokensMinted: minted,
        hash: newHash,
        validator: 'Node-EduEase-PoC-Consensus',
        status: 'confirmed'
      };
      setBlocks([newBlock, ...blocks]);
    }, 1200);
  };

  // Handler to redeem utility rewards
  const handleRedeem = (cost: number, title: string) => {
    if (ecoBalance < cost) {
      alert(lang === 'th' ? 'เหรียญ EcoToken ไม่เพียงพอ' : 'Insufficient EcoTokens');
      return;
    }
    setEcoBalance(prev => prev - cost);
    const code = 'ECO-' + Math.random().toString(36).substring(2, 7).toUpperCase();
    setRedeemedCode({ title, code });
  };

  const faqs = [
    {
      qTh: 'เหรียญ EcoToken ในเว็บนี้คืออะไร? แตกต่างจากคะแนนทั่วไปอย่างไร?',
      qEn: 'What is EcoToken on this web? How is it different from normal reward points?',
      aTh: 'EcoToken คือเหรียญพลังงานสะอาดดิจิทัล (Green Energy Token) ที่ถูกสร้างขึ้นตามสัดส่วนการประหยัดไฟจริง (1 kWh ที่ลดได้ = 1 EcoToken) ความแตกต่างคือมีรหัส Hash ดิจิทัล (SHA-256) ตรวจสอบย้อนกลับได้ ป้องกันการแก้ไขตัวเลขหรือการอ้างประหยัดไฟแบบปลอม (Anti-Greenwashing) และสามารถแลกสิทธิประโยชน์ได้จริง',
      aEn: 'EcoToken is a verified digital green energy token minted proportionally to actual electricity saved (1 kWh = 1 EcoToken). Unlike opaque loyalty points, every token has an auditable cryptographic SHA-256 signature preventing greenwashing and ensuring 100% verified provenance.'
    },
    {
      qTh: 'ต้องเปิดกระเป๋าเงินคริปโต (Crypto Wallet) ที่ยุ่งยากไหม?',
      qEn: 'Do I need a complicated crypto wallet or private keys?',
      aTh: 'ไม่ต้องเลย! ตามหลักการออกแบบ UX ยุคใหม่ (Human-Centered UX) เราสร้างระบบ Smart Energy Vault ให้อัตโนมัติในบัญชีของคุณ คุณสามารถสะสม กดรับเหรียญ และแลกรางวัลได้ง่ายๆ ภายในคลิกเดียว โดยไม่ต้องปวดหัวกับ Seed phrase หรือค่าธรรมเนียม Gas fee',
      aEn: 'Not at all! Following modern human-centered UX heuristics, a built-in Smart Energy Vault is automatically linked to your account. You can mint, hold, and redeem rewards with 1 tap without dealing with private keys or gas fees.'
    },
    {
      qTh: 'มูลค่าและการนำไปใช้งาน (Utility) คืออะไร?',
      qEn: 'What is the real-world value and utility of EcoTokens?',
      aTh: 'คุณสามารถนำ EcoToken ไปแลกเป็น: 1) ส่วนลดบิลค่าไฟ (100 ECO = ฿100), 2) คูปองเครื่องดื่ม/ของว่างประจำวัน, 3) ส่วนลดอุปกรณ์สมาร์ทโฮมประหยัดไฟ, หรือ 4) สิทธิ์ปลูกป่าคาร์บอนเครดิตจริงพร้อมพิกัดดาวเทียม',
      aEn: 'EcoTokens can be redeemed for: 1) Direct electricity bill credits (100 ECO = ฿100), 2) Coffee & snack vouchers, 3) Smart home energy plug discounts, or 4) Certified satellite-tracked tree planting.'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-20 lg:pb-8">
      {/* 1. Sub-Tab Header Bar */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-200/80 dark:bg-slate-800/80 rounded-2xl w-full sm:w-auto self-start border border-slate-300/50 dark:border-slate-700/50 flex-wrap">
        <button
          onClick={() => onNavigatePage('settings')}
          className="py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <span>{lang === 'th' ? 'ตั้งค่าแอป (Settings)' : 'App Settings'}</span>
        </button>
        <button
          onClick={() => onNavigatePage('trust-center')}
          className="py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>{lang === 'th' ? 'ศูนย์ความน่าเชื่อถือ (Trust Center)' : 'Trust Center'}</span>
        </button>
        <button
          onClick={() => onNavigatePage('ux-assessment')}
          className="py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
        >
          <Award className="w-4 h-4 text-blue-500" />
          <span>{lang === 'th' ? 'ประเมิน UX/UI (Senna Labs)' : 'UX/UI Assessment'}</span>
        </button>
        <button
          className="py-2 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-sm"
        >
          <Coins className="w-4 h-4 text-amber-500" />
          <span>{lang === 'th' ? 'เหรียญพลังงาน & Web3 Crypto' : 'Green Crypto & Web3'}</span>
        </button>
      </div>

      {/* 2. Hero Banner: Demystified Clean Energy Crypto */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 sm:p-8 rounded-[2.5rem] border relative overflow-hidden shadow-xl ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-900 via-amber-950/30 to-slate-900 border-amber-500/30 text-white'
            : 'bg-gradient-to-r from-amber-50/80 via-emerald-50/50 to-white border-amber-200 text-slate-800'
        }`}
      >
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
            <Coins className="w-4 h-4" />
            <span>{lang === 'th' ? 'ระบบเหรียญพลังงาน & บล็อกเชนคาร์บอนที่เข้าใจง่าย' : 'Demystified Clean Energy Crypto & Web3'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900 dark:text-white">
            {lang === 'th' ? 'เปลี่ยนทุกหน่วยไฟที่ประหยัดได้ เป็นเหรียญดิจิทัลที่มีค่าจริง' : 'Turn Every Saved kWh into Verifiable Digital Value'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {lang === 'th'
              ? 'หมดปัญหากลโกงและการอ้างประหยัดไฟเลื่อนลอย ด้วยระบบ Proof-of-Conservation (PoC) บันทึกลงบนสมุดบัญชีแยกประเภทที่เข้ารหัสด้วยลายเซ็นดิจิทัล SHA-256 ทุกคนเข้าใจได้ใน 3 ขั้นตอน ไม่ต้องมีความรู้เรื่องคริปโตก็ใช้งานได้ทันที!'
              : 'Zero greenwashing. Every kilowatt-hour saved is verified via Proof-of-Conservation (PoC) on a tamper-proof cryptographic ledger. Designed with modern UX so anyone can earn and spend without crypto friction.'}
          </p>
        </div>
      </motion.div>

      {/* 3. Three-Step Easy Explainer (Human-Centered UX) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`p-5 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800 shadow-sm'
        }`}>
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-black text-lg mb-3">
            1
          </div>
          <h4 className="font-extrabold text-base font-display mb-1">
            {lang === 'th' ? '1. ประหยัดพลังงานจริง' : '1. Real Energy Saved'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {lang === 'th' 
              ? 'ระบบตรวจจับการใช้ไฟผ่านมิเตอร์อัจฉริยะ คำนวณเทียบกับเกณฑ์ฐาน ทุก 1 kWh ที่ลดได้ = หลีกเลี่ยงคาร์บอน 0.5 kg CO₂' 
              : 'Smart telemetry calculates savings vs baseline. Every 1 kWh saved cuts 0.5 kg CO₂ emissions.'}
          </p>
        </div>

        <div className={`p-5 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800 shadow-sm'
        }`}>
          <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-lg mb-3">
            2
          </div>
          <h4 className="font-extrabold text-base font-display mb-1">
            {lang === 'th' ? '2. ผลิตเหรียญ EcoToken อัตโนมัติ' : '2. Auto-Mint EcoTokens'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {lang === 'th' 
              ? 'หน่วยไฟที่ประหยัดได้จะถูกเข้ารหัสสร้างเป็นเหรียญ ECO พร้อมหลักฐาน Hash ดิจิทัล ปลอดภัย ไม่สามารถปลอมแปลงได้' 
              : 'Savings are cryptographically hashed and minted as ECO tokens with tamper-proof cryptographic proofs.'}
          </p>
        </div>

        <div className={`p-5 rounded-3xl border transition-all ${
          isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800 shadow-sm'
        }`}>
          <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black text-lg mb-3">
            3
          </div>
          <h4 className="font-extrabold text-base font-display mb-1">
            {lang === 'th' ? '3. แลกสิทธิประโยชน์จริง' : '3. Spend on Real Perks'}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {lang === 'th' 
              ? 'นำเหรียญไปแลกเป็นส่วนลดบิลค่าไฟ คูปองเครื่องดื่ม หรือสิทธิ์ปลูกต้นไม้จริงทันทีในคลิกเดียว' 
              : 'Redeem tokens for utility bill credits, beverage vouchers, smart plugs, or certified tree planting.'}
          </p>
        </div>
      </div>

      {/* 4. EcoToken Vault & 1-Click Minting Card */}
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border shadow-xl ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-amber-100 text-slate-800'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-3xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 shrink-0">
              <Coins className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                {lang === 'th' ? 'กระเป๋าพลังงานอัจฉริยะ (Smart Energy Vault)' : 'Smart Energy Vault'}
              </span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-slate-900 dark:text-white flex items-baseline gap-2">
                <span>{ecoBalance.toLocaleString()}</span>
                <span className="text-sm font-bold text-amber-500">ECO</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                ≈ {lang === 'th' ? `มูลค่า ฿${ecoBalance.toLocaleString()} บาท / ชดเชย ${ecoBalance * 0.5} kg CO₂` : `฿${ecoBalance.toLocaleString()} THB Value / ${ecoBalance * 0.5} kg CO₂ offset`}
              </span>
            </div>
          </div>

          {/* Pending Mint Card */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">
                {lang === 'th' ? 'เหรียญสะสมรอรับ (Pending Mint จากเดือนนี้):' : 'Pending Mint (from this month):'}
              </span>
              <div className="text-xl font-black font-mono text-amber-600 dark:text-amber-400">
                +{pendingMintTokens} ECO
              </div>
            </div>

            <button
              onClick={handleMintTokens}
              disabled={pendingMintTokens <= 0 || isMinting}
              className={`px-6 py-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                pendingMintTokens > 0 && !isMinting
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20 hover:scale-102'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isMinting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{lang === 'th' ? 'กำลังบันทึกบล็อกเชน...' : 'Cryptographic Minting...'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'th' ? 'กดรับเหรียญทันที (1-Click Mint)' : '1-Click Mint'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mint Success Hash Notice */}
        <AnimatePresence>
          {mintSuccessHash && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono mb-6 flex items-start justify-between gap-3"
            >
              <div className="space-y-1">
                <span className="font-black flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{lang === 'th' ? 'สร้างเหรียญและยืนยันบนสมุดบัญชีดิจิทัลสำเร็จ!' : 'Tokens Minted & Confirmed on Ledger!'}</span>
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 break-all">
                  Transaction Hash: <span className="font-bold">{mintSuccessHash}</span>
                </p>
              </div>
              <button 
                onClick={() => setMintSuccessHash(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-sans font-bold"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. Verifiable Proof-of-Conservation (PoC) Ledger Explorer */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-sm font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>{lang === 'th' ? 'สมุดบัญชีบล็อกเชนตรวจสอบได้ (Verifiable Clean Energy Ledger)' : 'Verifiable Clean Energy Ledger'}</span>
            </h4>
            <span className="text-[10px] font-mono text-slate-400">Consensus: Proof-of-Conservation (PoC)</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[10px] uppercase">
                <tr>
                  <th className="p-3">Block #</th>
                  <th className="p-3">{lang === 'th' ? 'เวลา' : 'Time'}</th>
                  <th className="p-3">{lang === 'th' ? 'ไฟที่ประหยัด (kWh)' : 'Saved (kWh)'}</th>
                  <th className="p-3">CO₂ Avoided</th>
                  <th className="p-3">Minted ECO</th>
                  <th className="p-3">Cryptographic Hash</th>
                  <th className="p-3">Validator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {blocks.map((b) => (
                  <tr 
                    key={b.blockNumber} 
                    onClick={() => setSelectedBlock(b)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="p-3 font-bold text-amber-600 dark:text-amber-400">#{b.blockNumber}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-300 font-sans">{b.date}</td>
                    <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">{b.kwhSaved} kWh</td>
                    <td className="p-3 text-slate-500">{b.co2AvoidedKg} kg</td>
                    <td className="p-3 font-bold text-slate-800 dark:text-white">+{b.tokensMinted} ECO</td>
                    <td className="p-3 text-slate-400 truncate max-w-[150px]">
                      <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {b.hash.substring(0, 10)}...{b.hash.substring(b.hash.length - 4)}
                      </span>
                    </td>
                    <td className="p-3 text-[10px] text-slate-500 font-sans">{b.validator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 6. Utility Marketplace: Redeem EcoTokens for Real Value */}
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border shadow-xl ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
      }`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-black">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-base font-display">
                {lang === 'th' ? 'ตลาดแลกสิทธิประโยชน์ (EcoToken Utility Market)' : 'EcoToken Utility Market'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'ใช้เหรียญที่ได้จากการประหยัดไฟ แลกเป็นมูลค่าจริงได้ทันที' : 'Spend your clean energy tokens on real-world discounts and certified impacts'}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-500 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
            Balance: {ecoBalance} ECO
          </span>
        </div>

        {/* Redeemed Success Modal / Card */}
        <AnimatePresence>
          {redeemedCode && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-5 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 mb-6 text-center space-y-2"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h5 className="font-extrabold text-base text-slate-900 dark:text-white">
                {lang === 'th' ? `แลกรับ ${redeemedCode.title} สำเร็จ!` : `Redeemed ${redeemedCode.title} successfully!`}
              </h5>
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-xs mx-auto font-mono text-base font-black text-emerald-600 dark:text-emerald-400 tracking-wider">
                {redeemedCode.code}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'นำโค้ดนี้ไปกรอกในหน้าชำระเงินหรือแสดงกับพนักงานเพื่อรับสิทธิ์' : 'Present or input this voucher code to claim your discount'}
              </p>
              <button
                onClick={() => setRedeemedCode(null)}
                className="mt-2 text-xs font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 underline cursor-pointer"
              >
                {lang === 'th' ? 'ปิดหน้าต่าง' : 'Close'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Item 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Receipt className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                {lang === 'th' ? 'ส่วนลดบิลค่าไฟ ฿100' : '฿100 Electricity Bill Credit'}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'หักลบจากบิลการไฟฟ้า MEA/PEA สิ้นเดือน' : 'Deducted directly from your monthly utility bill'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="font-mono font-black text-sm text-amber-500">100 ECO</span>
              <button
                onClick={() => handleRedeem(100, lang === 'th' ? 'ส่วนลดบิลค่าไฟ ฿100' : '฿100 Bill Credit')}
                disabled={ecoBalance < 100}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  ecoBalance >= 100
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                {lang === 'th' ? 'แลกเลย' : 'Redeem'}
              </button>
            </div>
          </div>

          {/* Item 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Coffee className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                {lang === 'th' ? 'คูปองเครื่องดื่ม / ชานม 1 แก้ว' : 'Free Beverage / Boba Voucher'}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'ใช้ได้ที่ร้านค้าพันธมิตรในหอพักและมหาวิทยาลัย' : 'Valid at partner cafes across campus & dorms'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="font-mono font-black text-sm text-amber-500">50 ECO</span>
              <button
                onClick={() => handleRedeem(50, lang === 'th' ? 'คูปองเครื่องดื่ม 1 แก้ว' : 'Beverage Voucher')}
                disabled={ecoBalance < 50}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  ecoBalance >= 50
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                {lang === 'th' ? 'แลกเลย' : 'Redeem'}
              </button>
            </div>
          </div>

          {/* Item 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <Plug className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                {lang === 'th' ? 'ส่วนลด 50% Smart Plug Wi-Fi' : '50% Off Smart Plug Wi-Fi'}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'ปลั๊กวัดไฟอัตโนมัติซิงค์กับแอป EduEase ได้ทันที' : 'Smart energy metering plug synced with EduEase'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="font-mono font-black text-sm text-amber-500">150 ECO</span>
              <button
                onClick={() => handleRedeem(150, lang === 'th' ? 'ส่วนลด 50% Smart Plug' : '50% Smart Plug')}
                disabled={ecoBalance < 150}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  ecoBalance >= 150
                    ? 'bg-blue-500 hover:bg-blue-400 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                {lang === 'th' ? 'แลกเลย' : 'Redeem'}
              </button>
            </div>
          </div>

          {/* Item 4 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold">
                <TreePine className="w-5 h-5" />
              </div>
              <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                {lang === 'th' ? 'ใบรับรองปลูกป่าจริง 1 ต้น' : 'Plant 1 Real Certified Tree'}
              </h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'ปลูกป่าชุมชนพร้อมพิกัด GPS ติดตามการเติบโต' : 'Planted in reforestation program with GPS coordinates'}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="font-mono font-black text-sm text-amber-500">80 ECO</span>
              <button
                onClick={() => handleRedeem(80, lang === 'th' ? 'ใบรับรองปลูกป่า 1 ต้น' : 'Certified Tree')}
                disabled={ecoBalance < 80}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  ecoBalance >= 80
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                }`}
              >
                {lang === 'th' ? 'แลกเลย' : 'Redeem'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Interactive Educational Crypto FAQs */}
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border shadow-xl ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 text-slate-800'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6 text-amber-500" />
          <h4 className="font-extrabold text-base font-display">
            {lang === 'th' ? 'คำถามที่พบบ่อยเกี่ยวกับ Web3 & Crypto พลังงาน' : 'Clean Energy Web3 & Crypto FAQ'}
          </h4>
        </div>

        <div className="space-y-3">
          {faqs.map((f, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 cursor-pointer"
              >
                <span>{lang === 'th' ? f.qTh : f.qEn}</span>
                {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {activeFaq === idx && (
                <p className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'th' ? f.aTh : f.aEn}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 8. Block Detail Modal */}
      {selectedBlock && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`p-6 rounded-3xl border shadow-2xl max-w-lg w-full ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-500" />
                <h4 className="font-extrabold text-base font-display">
                  Block #{selectedBlock.blockNumber} Verification Details
                </h4>
              </div>
              <button 
                onClick={() => setSelectedBlock(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="font-bold">{selectedBlock.date}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex justify-between">
                <span className="text-slate-400">Energy Saved:</span>
                <span className="font-bold text-emerald-500">{selectedBlock.kwhSaved} kWh</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex justify-between">
                <span className="text-slate-400">Carbon Offset:</span>
                <span className="font-bold text-emerald-500">{selectedBlock.co2AvoidedKg} kg CO₂</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex justify-between">
                <span className="text-slate-400">Minted Tokens:</span>
                <span className="font-bold text-amber-500">+{selectedBlock.tokensMinted} ECO</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 flex justify-between">
                <span className="text-slate-400">Validator Consensus:</span>
                <span className="font-bold">{selectedBlock.validator}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                <span className="text-slate-400 block mb-1">Merkle Proof SHA-256 Hash:</span>
                <span className="font-bold text-[11px] text-amber-500 break-all">{selectedBlock.hash}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedBlock(null)}
              className="mt-5 w-full py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-300 dark:hover:bg-slate-700 cursor-pointer"
            >
              {lang === 'th' ? 'ปิดหน้านี้' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
