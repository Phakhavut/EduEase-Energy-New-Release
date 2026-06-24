import { useMemo } from 'react';

/**
 * Calculates the relative luminance of a standard hex color.
 * Relative luminance is defined as the relative brightness of any point in a colorspace,
 * normalized to 0 for darkest black and 1 for lightest white.
 * Formula source: W3C WCAG 2.x relative luminance.
 */
export function calculateRelativeLuminance(hex: string): number {
  let sanitized = hex.trim().replace(/^#/, '');

  if (sanitized.length === 3) {
    sanitized = sanitized.split('').map(char => char + char).join('');
  }

  if (sanitized.length !== 6) {
    // Default fallback to neutral background (mid-level)
    return 0.5;
  }

  const r = parseInt(sanitized.substring(0, 2), 16) / 255;
  const g = parseInt(sanitized.substring(2, 4), 16) / 255;
  const b = parseInt(sanitized.substring(4, 6), 16) / 255;

  const rLinear = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
  const gLinear = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
  const bLinear = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}

/**
 * Calculates the exact WCAG contrast ratio between two relative luminances.
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 * Range is 1 to 21. Target for standard body text is >= 4.5:1 (WCAG AA).
 */
export function calculateContrastRatio(lum1: number, lum2: number): number {
  const bright = Math.max(lum1, lum2);
  const dark = Math.min(lum1, lum2);
  return (bright + 0.05) / (dark + 0.05);
}

/**
 * Custom React Hook to compute ideal contrasting text colors for a given background color.
 * It dynamically analyzes relative luminance to return CSS styles or raw Hex values
 * that guarantee WCAG AA-compliant legibility (contrast ratio >= 4.5:1).
 *
 * @param bgHex The background color in Hex format (e.g., "#ffffff" or "#1e293b").
 * @param preferredLightText Optional customized bright text color (defaults to #FFFFFF).
 * @param preferredDarkText Optional customized dark text color (defaults to #0F172A).
 */
export function useContrastAdjustment(
  bgHex: string,
  preferredLightText: string = '#FFFFFF',
  preferredDarkText: string = '#0F172A'
) {
  return useMemo(() => {
    // Clean up key words like 'transparent'
    let cleanBg = bgHex;
    if (bgHex === 'transparent') {
      cleanBg = '#FFFFFF';
    }

    // Default to slate-500 if the string is not a proper hex color
    if (!cleanBg.startsWith('#')) {
      // Map basic color names to hex
      const baseColors: Record<string, string> = {
        white: '#FFFFFF',
        black: '#000000',
        primary: '#3b82f6',
        sky: '#0ea5e9',
        amber: '#f59e0b',
        rose: '#f43f5e',
        emerald: '#10b981',
      };
      cleanBg = baseColors[cleanBg.toLowerCase()] || '#64748b';
    }

    const bgLuminance = calculateRelativeLuminance(cleanBg);
    
    // Calculate luminance of our text options to evaluate contrast ratios
    const lightTextLum = calculateRelativeLuminance(preferredLightText);
    const darkTextLum = calculateRelativeLuminance(preferredDarkText);

    const contrastWithLight = calculateContrastRatio(bgLuminance, lightTextLum);
    const contrastWithDark = calculateContrastRatio(bgLuminance, darkTextLum);

    // Select the option providing superior contrast, ensuring target >= 4.5 is achieved
    const idealTextColor = contrastWithLight >= contrastWithDark ? preferredLightText : preferredDarkText;
    const activeContrastRatio = Math.max(contrastWithLight, contrastWithDark);

    return {
      textColor: idealTextColor,
      contrastRatio: parseFloat(activeContrastRatio.toFixed(2)),
      isBgLight: bgLuminance > 0.179, // Standard threshold for human perception
      style: {
        backgroundColor: cleanBg,
        color: idealTextColor,
      },
      badgeStyle: {
        backgroundColor: `${idealTextColor}15`, // subtle semi-transparent background
        color: idealTextColor,
        borderColor: `${idealTextColor}30`,
      }
    };
  }, [bgHex, preferredLightText, preferredDarkText]);
}
