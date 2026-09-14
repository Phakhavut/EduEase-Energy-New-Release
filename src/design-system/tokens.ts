/**
 * EduEase Energy Unified Design System Tokens
 * Master source of truth for visual language, color semantics, typography, radii, and spacing.
 */

export const DS_TOKENS = {
  colors: {
    brand: {
      primary: '#16A34A',      // Primary CTA, active states, key highlights
      primaryDark: '#15803D',  // Hover states, high-contrast dark green
      primaryLight: '#4ADE80', // Dark mode highlights, glowing accents
      softBg: '#DCFCE7',       // Light badge background
      softDarkBg: 'rgba(22, 163, 74, 0.15)',
    },
    semantic: {
      success: {
        main: '#16A34A',
        light: '#DCFCE7',
        dark: '#4ADE80',
        border: 'rgba(22, 163, 74, 0.25)',
      },
      warning: {
        main: '#D97706',
        light: '#FEF3C7',
        dark: '#FBBF24',
        border: 'rgba(217, 119, 6, 0.25)',
      },
      danger: {
        main: '#DC2626',
        light: '#FEE2E2',
        dark: '#F87171',
        border: 'rgba(220, 38, 38, 0.25)',
      },
      info: {
        main: '#2563EB',
        light: '#DBEAFE',
        dark: '#60A5FA',
        border: 'rgba(37, 99, 235, 0.25)',
      },
      purple: {
        main: '#9333EA',
        light: '#F3E8FF',
        dark: '#C084FC',
        border: 'rgba(147, 51, 234, 0.25)',
      },
    },
    neutral: {
      light: {
        bg: '#F6F8F7',
        surface: '#FFFFFF',
        surfaceElevated: '#F8FAFC',
        surfaceMuted: '#F1F5F3',
        border: '#E2E8E4',
        borderSubtle: '#EDF2EE',
        textPrimary: '#15201A',
        textSecondary: '#53635A',
        textTertiary: '#78857D',
      },
      dark: {
        bg: '#0F141A',
        surface: '#151C23',
        surfaceElevated: '#1B242D',
        surfaceMuted: '#1E2832',
        border: 'rgba(255, 255, 255, 0.08)',
        borderSubtle: 'rgba(255, 255, 255, 0.04)',
        textPrimary: '#F5F7F8',
        textSecondary: '#AAB4BE',
        textTertiary: '#64748B',
      },
    },
  },
  radius: {
    sm: '8px',
    md: '12px',
    card: '16px',
    panel: '20px',
    full: '9999px',
  },
  shadows: {
    cardLight: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
    cardHover: '0 8px 16px -4px rgba(22, 163, 74, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
    cardDark: '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
  },
  typography: {
    fontFamily: {
      display: 'Prompt, sans-serif',
      body: 'Prompt, Inter, sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
  },
};
