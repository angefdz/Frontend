import { useWindowDimensions } from 'react-native';

export default function useResponsive() {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  // Escalado más suave
  const scaleFont = (size: number) => (isTablet ? size * 1.15 : size);
  const scaleSpacing = (value: number) => (isTablet ? value * 1.1 : value);
  const scaleIcon = (size: number) => (isTablet ? size * 1.2 : size);

  return { isTablet, scaleFont, scaleSpacing, scaleIcon };
}
