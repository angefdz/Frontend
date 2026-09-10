export const palette = {
  primary: '#3157A4',
  primaryPressed: '#24437F',
  primarySoft: '#E9EFFB',
  secondary: '#0F766E',
  secondarySoft: '#E4F4F1',
  background: '#F4F7FB',
  surface: '#FFFFFF',
  surfaceMuted: '#EEF2F7',
  text: '#172033',
  textMuted: '#526178',
  placeholder: '#68758A',
  border: '#B8C2D1',
  focus: '#7C3AED',
  error: '#B42318',
  errorSoft: '#FDECEC',
  warning: '#8A4B08',
  warningSoft: '#FFF3D6',
  destructive: '#B42318',
  disabled: '#D5DBE5',
} as const;

export const radius = {
  small: 10,
  medium: 16,
  large: 24,
  pill: 999,
} as const;

export const shadow = {
  card: {
    shadowColor: '#172033',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 3,
  },
} as const;
