import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  popup: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    gap: 10,
  },
  boton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  botonActivo: {
    backgroundColor: '#007AFF',
  },
  texto: {
    fontSize: 16,
    color: '#333',
  },
  textoActivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalBotones: {
    position: 'absolute',
    bottom: 160,
    right: 20,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  botonSelector: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
});
