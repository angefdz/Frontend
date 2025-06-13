import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  inner: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    marginBottom: 4,
    fontWeight: '600',
    fontSize: 16,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
  },
  voiceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 10,
  },
  voiceButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
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
    fontSize: 16,
  },
  voiceButtonTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    marginBottom: 12,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    zIndex: 1000,
  },
  
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 8,
    zIndex: 999,
  },
  
  dropdownText: {
    fontSize: 16,
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  iconoEditarContainer: {
    alignSelf: 'flex-end',
    padding: 10,
  },

  
  
  
  
});
