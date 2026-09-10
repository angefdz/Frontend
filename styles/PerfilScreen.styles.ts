
import { Dimensions, StyleSheet } from 'react-native';
import { palette, radius, shadow } from '../constants/Theme';

const { width } = Dimensions.get('window');
const baseFont = width * 0.045;

export const styles = StyleSheet.create({
  inner: {
    padding: width * 0.05,
    alignItems: 'center',
    backgroundColor: palette.background,
  },
  container: {
    flex: 1,
    paddingTop: width * 0.05,
    paddingHorizontal: width * 0.05,
    backgroundColor: palette.background,
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: width * 0.05,
    paddingHorizontal: width * 0.05,
    backgroundColor: palette.background,
    alignItems: 'center',
  },
  
  label: {
    alignSelf: 'flex-start',
    marginBottom: width * 0.01,
    fontWeight: '600',
    fontSize: baseFont,
    color: palette.text,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.medium,
    padding: width * 0.03,
    marginBottom: width * 0.04,
    fontSize: baseFont,
    backgroundColor: palette.surface,
    color: palette.text,
  },
  voiceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: width * 0.04,
    gap: 10,
  },
  voiceButton: {
    paddingVertical: width * 0.025,
    paddingHorizontal: width * 0.04,
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
  },
  voiceButtonSelected: {
    backgroundColor: palette.primary,
    borderColor: palette.primary,
  },
  voiceButtonText: {
    color: palette.text,
    fontSize: baseFont,
  },
  voiceButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    paddingVertical: width * 0.035,
    minHeight: 54,
    justifyContent: 'center',
    borderRadius: radius.medium,
    backgroundColor: palette.primary,
    ...shadow.card,
    marginBottom: width * 0.03,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: baseFont,
    fontWeight: '600',
    color: '#fff',
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    zIndex: 1000,
    height: width * 0.1,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 14,
    zIndex: 999,
  },
  dropdownText: {
    fontSize: baseFont,
  },
  content: {
    width: '100%',
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.1,
    alignItems: 'center',
  },
  iconoEditarContainer: {
    alignSelf: 'flex-end',
    padding: width * 0.025,
  },
  dropdownWrapper: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  dropdownItem: {
    fontSize: 16,
  },
});
