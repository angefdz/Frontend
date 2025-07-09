
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const baseFont = width * 0.045;

export const styles = StyleSheet.create({
  inner: {
    padding: width * 0.05,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: width * 0.05,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingTop: width * 0.05,
    paddingHorizontal: width * 0.05,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  
  label: {
    alignSelf: 'flex-start',
    marginBottom: width * 0.01,
    fontWeight: '600',
    fontSize: baseFont,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: width * 0.03,
    marginBottom: width * 0.04,
    fontSize: baseFont,
    backgroundColor: '#F9F9F9',
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  voiceButtonSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  voiceButtonText: {
    color: '#333',
    fontSize: baseFont,
  },
  voiceButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    paddingVertical: width * 0.035,
    borderRadius: 8,
    backgroundColor: '#007AFF',
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
