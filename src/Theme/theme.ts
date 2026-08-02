export type ThemeMode = 'light' | 'dark';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const typography = {
  title: {
    fontSize: 24,
    fontWeight: 'bold' as const,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'normal' as const,
  },
  body: {
    fontSize: 14,
    fontWeight: 'normal' as const,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    letterSpacing: 0.5,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
  },
};

export type Theme = {
  mode: ThemeMode;
  background: string;
  text: string;
  subtitle: string;
  primary: string;
  card: string;
  border: string;
  buttonText: string;
  spacing: typeof spacing;
  radius: typeof radius;
  typography: typeof typography;
};

export const lightTheme: Theme = {
  mode: 'light',
  background: '#FFFFFF',
  text: '#1A1A1A',
  subtitle: '#555555',
  primary: '#4A90E2',
  card: '#F5F5F5',
  border: '#E0E0E0',
  buttonText: '#FFFFFF',
  spacing,
  radius,
  typography,
};

export const darkTheme: Theme = {
  mode: 'dark',
  background: '#121212',
  text: '#F2F2F2',
  subtitle: '#B0B0B0',
  primary: '#ff1111',
  card: '#1E1E1E',
  border: '#2C2C2C',
  buttonText: '#FFFFFF',
  spacing,
  radius,
  typography,
};