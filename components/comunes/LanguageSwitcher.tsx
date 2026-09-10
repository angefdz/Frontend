import { palette, radius } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const insets = useSafeAreaInsets();
  const nextLanguage = language === 'es' ? 'en' : 'es';

  return (
    <TouchableOpacity
      onPress={() => setLanguage(nextLanguage)}
      accessibilityRole="button"
      accessibilityLabel={language === 'es' ? 'Change language to English' : 'Cambiar idioma a español'}
      style={[styles.button, { top: insets.top + 8 }]}
    >
      <Text style={styles.text}>{language === 'es' ? 'English' : 'Español'}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 20,
    zIndex: 10,
    elevation: 10,
    minHeight: 48,
    minWidth: 96,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: palette.primary,
    borderRadius: radius.medium,
    backgroundColor: palette.surface,
  },
  text: {
    color: palette.primary,
    fontSize: 16,
    fontWeight: '700',
  },
});
