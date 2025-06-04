import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mensaje: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  item: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemEmoji: {
    fontSize: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
