export type ThemeMode = 'light' | 'dark';

export type Theme = {
  mode: ThemeMode;
  background: string;
  text: string;
  subtitle: string;
  primary: string;
  card: string;
  border: string;
};

export const lightTheme: Theme = {
  mode: 'light',
  background: '#FFFFFF',
  text: '#1A1A1A',
  subtitle: '#555555',
  primary: '#4A90E2',
  card: '#F5F5F5',
  border: '#E0E0E0',
};

export const darkTheme: Theme = {
  mode: 'dark',
  background: '#121212',
  text: '#F2F2F2',
  subtitle: '#B0B0B0',
  primary: '#6FA8FF',
  card: '#1E1E1E',
  border: '#2C2C2C',
};