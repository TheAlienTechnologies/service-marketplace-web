export const themes = {
  light: 'light',
  dark: 'dark',
} as const;

export type Theme = typeof themes[keyof typeof themes];

export const marketplaceColors = {
  50: '#CFFCD8',
  100: '#6AEC8E', 
  200: '#55C173',
  300: '#419750',
  400: '#2E6F40',
  500: '#1C4A29',
  600: '#0C2713',
} as const;

export const brandColors = {
  50: '#f0fdf4',
  100: '#dcfce7',
  200: '#bbf7d0',
  300: '#86efac',
  400: '#4ade80',
  500: '#22c55e',
  600: '#16a34a',
  700: '#15803d',
  800: '#166534',
  900: '#14532d',
  950: '#052e16',
} as const;

export const statusColors = {
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
} as const;

export const getThemeColors = (theme: Theme) => {
  const baseColors = {
    brand: brandColors,
    marketplace: marketplaceColors,
    status: statusColors,
  };

  if (theme === 'dark') {
    return {
      ...baseColors,
      background: '#0f172a',
      foreground: '#f8fafc',
      primary: '#4ade80',
      secondary: '#334155',
      muted: '#1e293b',
      border: '#334155',
    };
  }

  return {
    ...baseColors,
    background: '#ffffff',
    foreground: '#0f172a',
    primary: '#22c55e',
    secondary: '#f1f5f9',
    muted: '#f8fafc',
    border: '#e2e8f0',
  };
};
