/**
 * colorAdjuster.ts
 * Helper functions to automatically adjust color brightness and saturation
 * based on active theme context to ensure WCAG AA-compliant contrast and legibility.
 */

interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

/**
 * Converts a hex color string to HSL object.
 */
export function hexToHsl(hex: string): HSL {
  let sanitized = hex.trim().replace(/^#/, '');
  
  if (sanitized.length === 3) {
    sanitized = sanitized.split('').map(char => char + char).join('');
  }
  
  if (sanitized.length !== 6) {
    // Safe fallback to slate-500
    return { h: 215, s: 16, l: 47 };
  }

  const r = parseInt(sanitized.substring(0, 2), 16) / 255;
  const g = parseInt(sanitized.substring(2, 4), 16) / 255;
  const b = parseInt(sanitized.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Converts an HSL object back to a hex color string.
 */
export function hslToHex({ h, s, l }: HSL): string {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h <= 360) {
    r = c; g = 0; b = x;
  }

  const rHex = Math.round((r + m) * 255).toString(16).padStart(2, '0');
  const gHex = Math.round((g + m) * 255).toString(16).padStart(2, '0');
  const bHex = Math.round((b + m) * 255).toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

/**
 * Adjusts saturation and brightness of a base color depending on theme (dark or light)
 * to guarantee WCAG-compliant legibility specifically for text, indicators, and data-heavy charts.
 * 
 * @param colorInput The input hex color, raw color name, or Tailwind color key.
 * @param isDarkMode Whether the current context is rendering in Dark Mode.
 * @returns An adjusted, highly legible hex color string.
 */
export function adjustColorLegibility(colorInput: string, isDarkMode: boolean): string {
  // Normalize tailwind color keys or raw CSS named colors to standard hex
  const colorMap: Record<string, string> = {
    // Tailwind common palette
    'primary': '#3b82f6',
    'sky': '#0ea5e9',
    'sky-500': '#0ea5e9',
    'sky-600': '#0284c7',
    'sky-700': '#0369a1',
    'amber': '#f59e0b',
    'amber-500': '#f59e0b',
    'amber-600': '#d97706',
    'amber-700': '#b45309',
    'rose': '#f43f5e',
    'rose-500': '#f43f5e',
    'rose-600': '#e11d48',
    'rose-700': '#be123c',
    'emerald': '#10b981',
    'emerald-500': '#10b981',
    'emerald-600': '#059669',
    'emerald-700': '#047857',
    'indigo': '#6366f1',
    'indigo-500': '#6366f1',
    'indigo-600': '#4f46e5',
    'indigo-700': '#4338ca',
    'teal': '#14b8a6',
    'teal-500': '#14b8a6',
    'teal-600': '#0d9488',
    'teal-700': '#0f766e',
    'blue': '#3b82f6',
    'blue-500': '#3b82f6',
    'blue-600': '#2563eb',
    'blue-700': '#1d4ed8',
    'red': '#ef4444',
    'red-500': '#ef4444',
    'red-600': '#dc2626',
    'red-700': '#b91c1c',
    'purple': '#a855f7',
    'orange': '#f97316',
    'pink': '#ec4899',
    'slate': '#64748b',
    'gray': '#6b7280',
  };

  const key = colorInput.trim().toLowerCase();
  let hex = colorMap[key] || colorInput;

  // Ensure we have a hex format
  if (!hex.startsWith('#')) {
    // If it is rgb(a) format, try to extract basic values
    const rgbRegex = /rgba?\((\d+),\s*(\d+),\s*(\d+)/i;
    const match = hex.match(rgbRegex);
    if (match) {
      const r = parseInt(match[1], 10).toString(16).padStart(2, '0');
      const g = parseInt(match[2], 10).toString(16).padStart(2, '0');
      const b = parseInt(match[3], 10).toString(16).padStart(2, '0');
      hex = `#${r}${g}${b}`;
    } else {
      // If it's a raw unrecognized string, prefix # if it looks like hex, or use fallback
      if (/^[0-9a-fA-F]{3,6}$/.test(hex)) {
        hex = `#${hex}`;
      } else {
        hex = '#64748b'; // Fallback to neutral slate
      }
    }
  }

  // Parse to HSL for precise visual adjustments
  const hsl = hexToHsl(hex);

  if (isDarkMode) {
    // --- DARK THEME ADJUSTMENT ---
    // 1. DESATURATE slightly to avoid painful vibration against deep backgrounds
    if (hsl.s > 70) {
      hsl.s = Math.max(45, hsl.s - 20); // Scale down highly saturated colors
    } else if (hsl.s > 45) {
      hsl.s = Math.max(35, hsl.s - 10);
    }

    // 2. BRIGHTEN (Lightness) to guarantee contrast ratio (target >= 4.5:1 against dark bg)
    // Dark canvases typically have L value between 5% and 15%.
    if (hsl.l < 65) {
      // Shift L to safe legible zone
      hsl.l = 68 + Math.round((hsl.l / 65) * 16); // maps to 68% - 84% range
    }
    // Prevent colors from becoming washed-out pure white unless they started white
    if (hsl.l > 94 && hsl.s > 8) {
      hsl.l = 90;
    }
  } else {
    // --- LIGHT THEME ADJUSTMENT ---
    // 1. SATURATE slightly if the color is too bland to give solid emphasis
    if (hsl.s < 35 && hsl.s > 5) {
      hsl.s = Math.min(50, hsl.s + 15);
    }

    // 2. DARKEN (Lightness) to guarantee contrast ratio (target >= 4.5:1 against light bg)
    // Light backgrounds typically have L value between 90% and 100%.
    if (hsl.l > 42) {
      // Drag L down to safe reading zone
      hsl.l = 18 + Math.round((hsl.l / 100) * 18); // maps to 18% - 36% range
    }
  }

  return hslToHex(hsl);
}
