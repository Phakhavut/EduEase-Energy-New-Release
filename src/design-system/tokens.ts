/**
 * EduEase Energy Unified Design System Tokens
 * Master source of truth for visual language, color semantics, typography, radii, and spacing.
 */

export const DS_TOKENS = {
  colors: {
    brand: {
      primary: '#2563EB',      // Royal Electric Blue (matching EZUP centerpiece)
      primaryDark: '#1D4ED8',  // Deep Royal Blue
      primaryLight: '#3B82F6', // Bright Electric Blue
      sky: '#38BDF8',          // Cyber Sky Blue (EZUP Cyan)
      softBg: '#EFF6FF',       // Light badge background
      softDarkBg: 'rgba(37, 99, 235, 0.18)',
    },
    semantic: {
      success: {
        main: '#10B981',       // Neon Mint (ระบบสังกัด gauge)
        light: '#ECFDF5',
        dark: '#34D399',
        border: 'rgba(16, 185, 129, 0.3)',
      },
      warning: {
        main: '#F59E0B',       // Streamer Amber & Solar
        light: '#FFFBEB',
        dark: '#FBBF24',
        border: 'rgba(245, 158, 11, 0.3)',
      },
      danger: {
        main: '#F43F5E',       // Alert Red
        light: '#FFF1F2',
        dark: '#FB7185',
        border: 'rgba(244, 63, 94, 0.3)',
      },
      info: {
        main: '#38BDF8',       // Cyber Sky Blue (QR & IoT)
        light: '#F0F9FF',
        dark: '#7DD3FC',
        border: 'rgba(56, 189, 248, 0.3)',
      },
      eco: {
        main: '#10B981',
        light: '#ECFDF5',
        dark: '#34D399',
        border: 'rgba(16, 185, 129, 0.3)',
      },
      solar: {
        main: '#F59E0B',
        light: '#FFFBEB',
        dark: '#FBBF24',
        border: 'rgba(245, 158, 11, 0.3)',
      },
      purple: {
        main: '#6366F1',       // 67 Challenge & 2FA Purple
        light: '#EEF2FF',
        dark: '#818CF8',
        border: 'rgba(99, 102, 241, 0.3)',
      },
    },
    neutral: {
      light: {
        bg: '#F1F5F9',
        surface: '#FFFFFF',
        surfaceElevated: '#F8FAFC',
        surfaceMuted: '#E2E8F0',
        border: '#CBD5E1',
        borderSubtle: '#F1F5F9',
        textPrimary: '#0A1128',
        textSecondary: '#475569',
        textTertiary: '#94A3B8',
      },
      dark: {
        bg: '#060A18',         // Midnight abyss space
        surface: '#0B132B',    // Deep bento card navy
        surfaceElevated: '#101B3B',
        surfaceMuted: '#0E1838',
        border: 'rgba(59, 130, 246, 0.2)', // Electric blue rim
        borderSubtle: 'rgba(59, 130, 246, 0.1)',
        textPrimary: '#FFFFFF',
        textSecondary: '#94A3B8',
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
    cardHover: '0 8px 16px -4px rgba(26, 162, 152, 0.12), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
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
