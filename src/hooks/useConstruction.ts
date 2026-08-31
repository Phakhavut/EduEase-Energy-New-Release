import { useState, useRef, useEffect, useCallback } from 'react';
import { 
  CityAssetId, 
  CityPlot, 
  CityAssetDefinition, 
  CITY_ASSET_DEFINITIONS,
  validatePlacement,
  getPlotDefinition
} from '../data/cityJourneyData';

export type PlacementPhase = 
  | 'idle' 
  | 'selecting_plot' 
  | 'selecting_asset' 
  | 'previewing' 
  | 'constructing';

export interface UseConstructionOptions {
  plots: CityPlot[];
  userCredits: number;
  cityLevel: number;
  buildOnPlot: (assetId: CityAssetId, plotId: string) => { ok: true } | { ok: false; reason: 'locked-plot' | 'occupied-plot' | 'locked-asset' | 'not-enough-credits' };
  moveCityAsset: (fromPlotId: string, toPlotId: string) => { ok: true } | { ok: false; reason: 'locked-plot' | 'occupied-plot' | 'empty-source' };
  onSuccess?: (assetDef: CityAssetDefinition, plotId: string) => void;
  onError?: (message: string, reason?: string, details?: { creditsNeeded?: number; userCredits?: number; assetDef?: CityAssetDefinition; unlockLevel?: number }) => void;
  lang?: 'th' | 'en';
}

export interface UseConstructionReturn {
  // State
  placementPhase: PlacementPhase;
  selectedPlotId: string | null;
  previewAssetId: CityAssetId | null;
  constructingPlotId: string | null;
  relocateSourcePlotId: string | null;
  isConstructing: boolean;
  constructionSparkles: boolean;
  constructionProgress: number; // 0 to 100%
  validationResult: { valid: true } | { valid: false; reason: 'not-enough-credits' | 'locked-plot' | 'occupied-plot' | 'incompatible-asset' | 'locked-asset' } | null;
  
  // Actions
  selectPlot: (plotId: string) => void;
  selectAssetForPreview: (assetId: CityAssetId, targetPlotId?: string) => void;
  startBuildFlow: (initialAssetId?: CityAssetId, initialPlotId?: string) => void;
  confirmBuild: () => boolean;
  cancelPlacement: () => void;
  openRelocate: (plotId: string) => void;
  cancelRelocate: () => void;
  reset: () => void;
}

export const useConstruction = ({
  plots,
  userCredits,
  cityLevel,
  buildOnPlot,
  moveCityAsset,
  onSuccess,
  onError,
  lang = 'th'
}: UseConstructionOptions): UseConstructionReturn => {
  const [placementPhase, setPlacementPhase] = useState<PlacementPhase>('idle');
  const [selectedPlotId, setSelectedPlotId] = useState<string | null>(null);
  const [previewAssetId, setPreviewAssetId] = useState<CityAssetId | null>(null);
  const [constructingPlotId, setConstructingPlotId] = useState<string | null>(null);
  const [relocateSourcePlotId, setRelocateSourcePlotId] = useState<string | null>(null);
  
  // Construction phase feedback states
  const [isConstructing, setIsConstructing] = useState<boolean>(false);
  const [constructionSparkles, setConstructionSparkles] = useState<boolean>(false);
  const [constructionProgress, setConstructionProgress] = useState<number>(0);

  const constructionTimerRef = useRef<number | null>(null);
  const progressIntervalRef = useRef<number | null>(null);

  // Clear timers on unmount
  useEffect(() => {
    return () => {
      if (constructionTimerRef.current) window.clearTimeout(constructionTimerRef.current);
      if (progressIntervalRef.current) window.clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Validation calculation
  const occupiedPlotIds = new Set(plots.filter(p => !!p.assetId).map(p => p.id));
  const validationResult = (previewAssetId && selectedPlotId)
    ? validatePlacement(previewAssetId, selectedPlotId, userCredits, cityLevel, occupiedPlotIds)
    : null;

  // 1. Select Plot
  const selectPlot = useCallback((plotId: string) => {
    if (typeof plotId !== 'string') return;
    const plot = plots.find(p => p.id === plotId);
    if (!plot) return;

    // Relocation destination handling
    if (relocateSourcePlotId) {
      if (plotId === relocateSourcePlotId) {
        setRelocateSourcePlotId(null);
        return;
      }
      if (!plot.unlocked) {
        onError?.(lang === 'th' ? 'แปลงนี้ยังไม่ปลดล็อก' : 'This plot is still locked', 'locked-plot');
        return;
      }
      if (plot.assetId) {
        onError?.(lang === 'th' ? 'แปลงนี้มีสิ่งก่อสร้างอยู่แล้ว กรุณาเลือกแปลงว่าง' : 'This plot is already occupied, please choose an empty plot', 'occupied-plot');
        return;
      }

      const res = moveCityAsset(relocateSourcePlotId, plotId);
      if (res.ok) {
        setRelocateSourcePlotId(null);
        setSelectedPlotId(plotId);
        onSuccess?.(
          CITY_ASSET_DEFINITIONS[plot.assetId || 'solar-roof'],
          plotId
        );
      } else {
        onError?.(lang === 'th' ? 'ไม่สามารถย้ายได้' : 'Failed to move building');
      }
      return;
    }

    // Standard plot selection handling
    if (placementPhase === 'selecting_plot' || placementPhase === 'idle') {
      if (plot.assetId) {
        // Occupied plot selected -> view inspector
        setSelectedPlotId(plotId);
        setPlacementPhase('idle');
        setPreviewAssetId(null);
      } else if (plot.unlocked) {
        // Empty unlocked plot -> select and pick asset
        setSelectedPlotId(plotId);
        setPlacementPhase('selecting_asset');
        setPreviewAssetId(null);
      } else {
        onError?.(lang === 'th' ? `แปลงนี้ปลดล็อกที่เมือง Lv.${plot.unlockLevel}` : `Plot unlocks at City Lv.${plot.unlockLevel}`, 'locked-plot');
      }
    } else if (placementPhase === 'selecting_asset' || placementPhase === 'previewing') {
      if (plot.unlocked && !plot.assetId) {
        setSelectedPlotId(plotId);
      } else {
        onError?.(lang === 'th' ? 'กรุณาเลือกแปลงว่างเพื่อวางสิ่งก่อสร้าง' : 'Please select an empty unlocked plot');
      }
    }
  }, [plots, relocateSourcePlotId, placementPhase, moveCityAsset, onSuccess, onError, lang]);

  // 2. Select Asset for Preview
  const selectAssetForPreview = useCallback((assetId: CityAssetId, targetPlotId?: string) => {
    if (typeof assetId !== 'string' || !(assetId in CITY_ASSET_DEFINITIONS)) return;
    setPreviewAssetId(assetId);
    if (typeof targetPlotId === 'string') {
      setSelectedPlotId(targetPlotId);
    }
    setPlacementPhase('previewing');
  }, []);

  // 3. Start Build Flow (safeguarded against SyntheticEvent if passed directly to onClick)
  const startBuildFlow = useCallback((initialAssetId?: unknown, initialPlotId?: unknown) => {
    const safeAssetId = (typeof initialAssetId === 'string' && initialAssetId in CITY_ASSET_DEFINITIONS)
      ? (initialAssetId as CityAssetId)
      : undefined;
    const safePlotId = typeof initialPlotId === 'string' ? initialPlotId : undefined;

    if (safeAssetId) {
      setPreviewAssetId(safeAssetId);
      if (safePlotId) {
        setSelectedPlotId(safePlotId);
        setPlacementPhase('previewing');
        return;
      }
      // Find compatible empty plot for this asset
      const compatiblePlot = plots.find(p => p.unlocked && !p.assetId);
      if (compatiblePlot) {
        setSelectedPlotId(compatiblePlot.id);
        setPlacementPhase('previewing');
      } else {
        setPlacementPhase('selecting_plot');
      }
      return;
    }

    // Default flow: find first empty unlocked plot
    const emptyPlot = plots.find(p => p.unlocked && !p.assetId);
    if (emptyPlot) {
      setSelectedPlotId(emptyPlot.id);
      setPlacementPhase('selecting_asset');
    } else {
      setPlacementPhase('selecting_plot');
    }
  }, [plots]);

  // 4. Cancel Placement / Reset
  const cancelPlacement = useCallback(() => {
    setPlacementPhase('idle');
    setPreviewAssetId(null);
    setSelectedPlotId(null);
    setRelocateSourcePlotId(null);
  }, []);

  const reset = useCallback(() => {
    setPlacementPhase('idle');
    setSelectedPlotId(null);
    setPreviewAssetId(null);
    setConstructingPlotId(null);
    setRelocateSourcePlotId(null);
    setIsConstructing(false);
    setConstructionSparkles(false);
    setConstructionProgress(0);
  }, []);

  // 5. Confirm Build with 2-Second Non-Blocking Construction Phase & Sparkles
  const confirmBuild = useCallback((): boolean => {
    if (!selectedPlotId || !previewAssetId) return false;

    const targetPlotId = selectedPlotId;
    const targetAssetId = previewAssetId;
    const assetDef = CITY_ASSET_DEFINITIONS[targetAssetId];

    const result = buildOnPlot(targetAssetId, targetPlotId);

    if (result.ok) {
      // Begin 2-second construction phase
      setConstructingPlotId(targetPlotId);
      setPlacementPhase('constructing');
      setIsConstructing(true);
      setConstructionSparkles(true);
      setConstructionProgress(0);

      // Start 2000ms progress ticker
      const startTime = Date.now();
      const durationMs = 2000;

      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = window.setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(100, Math.round((elapsed / durationMs) * 100));
        setConstructionProgress(progress);
        if (elapsed >= durationMs) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        }
      }, 50);

      if (constructionTimerRef.current) clearTimeout(constructionTimerRef.current);
      constructionTimerRef.current = window.setTimeout(() => {
        // Complete construction
        setConstructingPlotId(null);
        setPlacementPhase('idle');
        setPreviewAssetId(null);
        setIsConstructing(false);
        setConstructionSparkles(false);
        setConstructionProgress(100);

        onSuccess?.(assetDef, targetPlotId);
      }, durationMs);

      return true;
    } else {
      const failureReason = 'reason' in result ? result.reason : undefined;
      if (failureReason === 'not-enough-credits') {
        const diff = assetDef.costCredits - userCredits;
        onError?.(
          lang === 'th' 
            ? `Eco Credits ไม่เพียงพอ (ต้องการ ${assetDef.costCredits} แต่คุณมี ${userCredits} Credits, ขาดอีก ${diff} Cr) ทำภารกิจเพื่อรับเครดิตเพิ่ม!` 
            : `Not enough Eco Credits! (Requires ${assetDef.costCredits}, you have ${userCredits} Cr, need ${diff} more). Complete habits to earn more.`,
          failureReason,
          { creditsNeeded: assetDef.costCredits, userCredits, assetDef }
        );
      } else if (failureReason === 'occupied-plot') {
        onError?.(
          lang === 'th' 
            ? 'แปลงนี้มีสิ่งก่อสร้างอยู่แล้ว กรุณาเลือกแปลงว่าง' 
            : 'Plot is already occupied. Please select an empty plot.', 
          failureReason,
          { assetDef }
        );
      } else if (failureReason === 'locked-plot') {
        const plotDef = getPlotDefinition(targetPlotId);
        onError?.(
          lang === 'th' 
            ? `แปลงนี้ยังไม่ปลดล็อก (ปลดล็อกที่เมือง Lv.${plotDef.unlockLevel})` 
            : `Plot is still locked (Unlocks at City Lv.${plotDef.unlockLevel})`, 
          failureReason,
          { unlockLevel: plotDef.unlockLevel, assetDef }
        );
      } else if (failureReason === 'locked-asset') {
        onError?.(
          lang === 'th' 
            ? `สิ่งก่อสร้างนี้ปลดล็อกที่เมือง Lv.${assetDef.unlockLevel}` 
            : `This building unlocks at City Lv.${assetDef.unlockLevel}`, 
          failureReason,
          { unlockLevel: assetDef.unlockLevel, assetDef }
        );
      } else {
        onError?.(
          lang === 'th' ? 'ไม่สามารถสร้างสิ่งก่อสร้างนี้ได้' : 'Cannot build this asset', 
          failureReason,
          { assetDef }
        );
      }
      return false;
    }
  }, [selectedPlotId, previewAssetId, buildOnPlot, onSuccess, onError, lang]);

  // 6. Relocation
  const openRelocate = useCallback((plotId: string) => {
    setRelocateSourcePlotId(plotId);
    setSelectedPlotId(null);
    setPlacementPhase('idle');
  }, []);

  const cancelRelocate = useCallback(() => {
    setRelocateSourcePlotId(null);
  }, []);

  return {
    placementPhase,
    selectedPlotId,
    previewAssetId,
    constructingPlotId,
    relocateSourcePlotId,
    isConstructing,
    constructionSparkles,
    constructionProgress,
    validationResult,
    selectPlot,
    selectAssetForPreview,
    startBuildFlow,
    confirmBuild,
    cancelPlacement,
    openRelocate,
    cancelRelocate,
    reset
  };
};
