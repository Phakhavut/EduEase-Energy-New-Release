import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Coins, 
  Zap, 
  Sparkles, 
  Check, 
  X, 
  AlertCircle, 
  Lock, 
  RotateCcw,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { 
  CityAssetId, 
  CityAssetDefinition, 
  CITY_ASSET_DEFINITIONS, 
  PLOT_DEFINITIONS,
  getPlotDefinition,
  validatePlacement,
  CityPlot
} from '../../../data/cityJourneyData';
import { CityAssetSprite } from './GreenCityVisualAssets';
import { PlacementPhase } from './CityScene';

interface CityBuildTrayProps {
  placementPhase: PlacementPhase;
  selectedPlotId: string | null;
  previewAssetId: CityAssetId | null;
  relocateSourcePlotId: string | null;
  plots: CityPlot[];
  userCredits: number;
  cityLevel: number;
  onSelectAssetForPreview: (assetId: CityAssetId) => void;
  onConfirmBuild: () => void;
  onCancelPlacement: () => void;
  onCancelRelocate: () => void;
  onStartBuildFlow: () => void;
  onInvalidAction?: (message: string, reason?: string) => void;
  lang: 'th' | 'en';
  isDarkMode: boolean;
}

export const CityBuildTray: React.FC<CityBuildTrayProps> = ({
  placementPhase,
  selectedPlotId,
  previewAssetId,
  relocateSourcePlotId,
  plots,
  userCredits,
  cityLevel,
  onSelectAssetForPreview,
  onConfirmBuild,
  onCancelPlacement,
  onCancelRelocate,
  onStartBuildFlow,
  onInvalidAction,
  lang,
  isDarkMode
}) => {
  const selectedPlotDef = selectedPlotId ? getPlotDefinition(selectedPlotId) : null;
  const previewAssetDef = previewAssetId ? CITY_ASSET_DEFINITIONS[previewAssetId] : null;
  const relocateSourcePlot = relocateSourcePlotId ? plots.find(p => p.id === relocateSourcePlotId) : null;
  const relocateAssetDef = relocateSourcePlot?.assetId ? CITY_ASSET_DEFINITIONS[relocateSourcePlot.assetId] : null;

  // Filter compatible assets for selected plot
  const compatibleAssetIds: CityAssetId[] = selectedPlotDef ? selectedPlotDef.accepts : ['solar-roof', 'community-garden', 'eco-home'];
  
  // Validation for previewed asset
  const occupiedPlotIds = new Set(plots.filter(p => !!p.assetId).map(p => p.id));
  const placementValidation = previewAssetId && selectedPlotId 
    ? validatePlacement(previewAssetId, selectedPlotId, userCredits, cityLevel, occupiedPlotIds)
    : null;

  return (
    <div className="w-full">
      {/* 1. RELOCATION BANNER */}
      <AnimatePresence>
        {relocateSourcePlotId && relocateAssetDef && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-amber-900 dark:text-amber-200"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20">
                <RotateCcw className="w-5 h-5 text-amber-600 dark:text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              </div>
              <div>
                <h4 className="text-sm font-extrabold">
                  {lang === 'th' ? `กำลังย้าย: ${relocateAssetDef.nameTh}` : `Relocating: ${relocateAssetDef.nameEn}`}
                </h4>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  {lang === 'th' ? 'แตะเลือกแปลงว่างบนแผนที่เพื่อวางสิ่งก่อสร้างใหม่ (ฟรี 0 เครดิต)' : 'Tap any empty unlocked plot on the map to relocate (Cost: 0 Credits)'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onCancelRelocate()}
              className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. PREVIEWING CONFIRMATION MODAL / DEDICATED CONFIRMATION CARD */}
      <AnimatePresence>
        {placementPhase === 'previewing' && previewAssetDef && selectedPlotDef && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`p-5 rounded-3xl border shadow-2xl backdrop-blur-xl ${
              isDarkMode 
                ? 'bg-slate-900/95 border-emerald-500/40 text-white' 
                : 'bg-white/95 border-emerald-500/40 text-slate-800'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-1 flex items-center justify-center">
                  <CityAssetSprite assetId={previewAssetDef.id} isDarkMode={isDarkMode} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      {lang === 'th' ? 'พรีวิวสิ่งก่อสร้าง' : 'Preview Construction'}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
                      {lang === 'th' ? selectedPlotDef.labelTh : selectedPlotDef.labelEn}
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold font-display">
                    {lang === 'th' ? previewAssetDef.nameTh : previewAssetDef.nameEn}
                  </h3>

                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <span className="flex items-center gap-1 font-extrabold text-amber-500">
                      <Coins className="w-3.5 h-3.5" />
                      <span>{previewAssetDef.costCredits} Eco Credits</span>
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                      <Zap className="w-3.5 h-3.5" />
                      <span>{lang === 'th' ? previewAssetDef.impactTh : previewAssetDef.impactEn}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onCancelPlacement()}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>{lang === 'th' ? 'ยกเลิก' : 'Cancel'}</span>
                </button>

                <button
                  onClick={() => {
                    if (placementValidation && !placementValidation.valid) {
                      const reason = 'reason' in placementValidation ? placementValidation.reason : undefined;
                      if (reason === 'not-enough-credits') {
                        onInvalidAction?.(
                          lang === 'th' 
                            ? `Eco Credits ไม่เพียงพอ (ต้องการ ${previewAssetDef?.costCredits} แต่คุณมี ${userCredits} Credits) ทำภารกิจเพื่อรับเครดิตเพิ่ม!` 
                            : `Not enough Eco Credits (Requires ${previewAssetDef?.costCredits}, you have ${userCredits} Credits). Complete habits to earn more!`,
                          'not-enough-credits'
                        );
                      } else {
                        onInvalidAction?.(
                          lang === 'th' ? 'แปลงนี้ไม่รองรับสิ่งก่อสร้างนี้ หรือแปลงยังไม่ปลดล็อก' : 'Plot is incompatible or locked',
                          reason
                        );
                      }
                      return;
                    }
                    onConfirmBuild();
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs font-extrabold shadow-lg transition-all flex items-center gap-2 cursor-pointer ${
                    placementValidation && !placementValidation.valid
                      ? 'bg-amber-500/80 hover:bg-amber-500 text-slate-950 shadow-amber-500/20'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/25 active:scale-95'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {placementValidation && !placementValidation.valid
                      ? (lang === 'th' ? 'ตรวจสอบเครดิต / เงื่อนไข' : 'Check Requirements')
                      : (lang === 'th' ? 'ยืนยันการก่อสร้าง' : 'Confirm Build')}
                  </span>
                </button>
              </div>
            </div>

            {/* Validation warning if not enough credits */}
            {placementValidation && !placementValidation.valid && (
              <div className="mt-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2 text-xs font-bold text-rose-600 dark:text-rose-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>
                  {'reason' in placementValidation && placementValidation.reason === 'not-enough-credits'
                    ? (lang === 'th' ? `เครดิตไม่พอ (ต้องการ ${previewAssetDef.costCredits} แต่คุณมี ${userCredits} Credits)` : `Not enough credits (Requires ${previewAssetDef.costCredits}, you have ${userCredits})`)
                    : (lang === 'th' ? 'แปลงนี้ไม่รองรับสิ่งก่อสร้างนี้ หรือแปลงยังไม่ปลดล็อก' : 'Plot is incompatible or locked')}
                </span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. SELECTING ASSET DRAWER (Shown when a plot is chosen or in selecting_asset phase) */}
      {placementPhase === 'selecting_asset' && selectedPlotDef && (
        <div className={`p-5 rounded-3xl border shadow-xl ${
          isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-slate-200/80'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">
                {lang === 'th' ? 'เลือกสิ่งก่อสร้างสำหรับ' : 'Choose Building For'}
              </span>
              <h3 className="text-base font-extrabold font-display">
                {lang === 'th' ? selectedPlotDef.labelTh : selectedPlotDef.labelEn}
              </h3>
            </div>

            <button
              onClick={() => onCancelPlacement()}
              className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {compatibleAssetIds.slice(0, 3).map((assetId) => {
              const def = CITY_ASSET_DEFINITIONS[assetId];
              const isLocked = def.unlockLevel > cityLevel + 1;
              const hasCredits = userCredits >= def.costCredits;

              return (
                <div
                  key={`tray-item-${def.id}`}
                  className={`relative p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isLocked
                      ? 'opacity-60 bg-slate-100/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700'
                      : previewAssetId === def.id
                      ? 'bg-emerald-500/10 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                      : isDarkMode
                      ? 'bg-slate-800/80 hover:bg-slate-800 border-slate-700/80'
                      : 'bg-slate-50 hover:bg-white border-slate-200/80'
                  }`}
                >
                  <div>
                    {/* Top Asset Preview Model */}
                    <div className="w-full h-24 mb-2 flex items-center justify-center p-1">
                      <CityAssetSprite assetId={def.id} isDarkMode={isDarkMode} />
                    </div>

                    <h4 className="text-sm font-extrabold leading-tight">
                      {lang === 'th' ? def.nameTh : def.nameEn}
                    </h4>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {lang === 'th' ? def.descriptionTh : def.descriptionEn}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span className="flex items-center gap-1 text-amber-500">
                        <Coins className="w-3.5 h-3.5" />
                        <span>{def.costCredits} Cr</span>
                      </span>
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400">
                        +{def.savingBahtMonth} ฿/mo
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        if (isLocked) {
                          onInvalidAction?.(
                            lang === 'th' 
                              ? `สิ่งก่อสร้างนี้ปลดล็อกที่เมือง Lv.${def.unlockLevel} (ระดับเมืองปัจจุบัน Lv.${cityLevel})` 
                              : `This building unlocks at City Lv.${def.unlockLevel} (Current City Lv.${cityLevel})`,
                            'locked-asset'
                          );
                          return;
                        }
                        onSelectAssetForPreview(def.id);
                      }}
                      className={`w-full py-2 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isLocked
                          ? 'bg-slate-200/80 dark:bg-slate-700/80 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-500 dark:text-slate-300'
                          : 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-sm'
                      }`}
                    >
                      {isLocked ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>{lang === 'th' ? `ปลดล็อก Lv.${def.unlockLevel}` : `Locked Lv.${def.unlockLevel}`}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{lang === 'th' ? 'ดูตัวอย่างบนแปลง' : 'Preview on Plot'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. IDLE QUICK BUILD INITIATOR BUTTON (When no plot is selected) */}
      {placementPhase === 'idle' && !relocateSourcePlotId && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 border border-emerald-500/20">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold font-display">
                {lang === 'th' ? 'ขยายและพัฒนาเมืองสีเขียว' : 'Expand Your Eco City'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'th' ? 'สร้างสิ่งก่อสร้างพลังงานหมุนเวียนและพื้นที่สีเขียวเพื่อลดค่าไฟ' : 'Construct renewable arrays & green spaces to maximize sustainability'}
              </p>
            </div>
          </div>

          <button
            onClick={() => onStartBuildFlow()}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-extrabold shadow-md shadow-emerald-500/20 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
          >
            <span>{lang === 'th' ? '+ เริ่มการก่อสร้าง' : '+ Start Construction'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
