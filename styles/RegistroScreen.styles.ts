import { Dimensions, StyleSheet } from 'react-native';
import { palette, radius, shadow } from '../constants/Theme';

const {width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
    justifyContent: 'center',
  },

  content: {
    marginHorizontal: 20,
    paddingHorizontal: 24,
    paddingVertical: 28,
    backgroundColor: palette.surface,
    borderRadius: radius.large,
    ...shadow.card,
  },

  title: {
    fontSize: Math.max(28, width * 0.07),
    fontWeight: '800',
    marginBottom: 25,
    textAlign: 'center',
    color: palette.text,
  },

  input: {
    minHeight: 56,
    borderWidth: 1.5,
    borderColor: palette.border,
    borderRadius: radius.medium,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 17,
    color: palette.text,
    backgroundColor: palette.surface,
  },

  errorText: {
    color: palette.error,
    backgroundColor: palette.errorSoft,
    borderRadius: radius.small,
    padding: 12,
    marginBottom: 10,
    textAlign: 'center',
  },

  button: {
    backgroundColor: palette.primary,
    minHeight: 56,
    justifyContent: 'center',
    borderRadius: radius.medium,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },

  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },

  backButtonText: {
    color: palette.primary,
    fontSize: 16,
    fontWeight: '700',
    paddingVertical: 12,
  },
});
