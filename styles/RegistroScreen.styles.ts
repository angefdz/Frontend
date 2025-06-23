import { Dimensions, StyleSheet } from 'react-native';

const {width} = Dimensions.get('window');
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  content: {
    paddingHorizontal: width * 0.03,
  },

  title: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },

  input: {
    height: width * 0.12,
    borderWidth: width * 0.004,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: width * 0.04,
  },

  errorText: {
    color: '#D32F2F',
    marginBottom: 10,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#007AFF',
    paddingVertical: width * 0.04,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },

  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },

  backButtonText: {
    color: '#007AFF',
    fontSize: width * 0.04,
  },
});
