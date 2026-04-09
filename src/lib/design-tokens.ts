/**
 * Design Tokens for Minimalist Modern Design System
 * Uttara University Landing Page
 */

export const designTokens = {
    colors: {
        background: '#FAFAFA',
        foreground: '#0F172A',
        muted: '#F1F5F9',
        mutedForeground: '#64748B',
        accent: '#0052FF',
        accentSecondary: '#4D7CFF',
        accentForeground: '#FFFFFF',
        border: '#E2E8F0',
        card: '#FFFFFF',
        ring: '#0052FF',
    },
    fonts: {
        display: '"Calistoga", Georgia, serif',
        body: '"Inter", system-ui, sans-serif',
        mono: '"JetBrains Mono", monospace',
    },
    spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
        '4xl': '4rem',
        '5xl': '5rem',
    },
    borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.875rem',
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        full: '9999px',
    },
    shadows: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px rgba(0, 0, 0, 0.07)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.08)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
        accent: '0 4px 14px rgba(0, 82, 255, 0.25)',
        accentLg: '0 8px 24px rgba(0, 82, 255, 0.35)',
    },
    animation: {
        duration: {
            fast: '200ms',
            normal: '300ms',
            slow: '700ms',
        },
        easing: {
            easeOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
            easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            easeIn: 'cubic-bezier(0.4, 0, 0.2, 0.4)',
        },
    },
};

export type DesignTokens = typeof designTokens;
