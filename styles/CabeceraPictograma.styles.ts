import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A', // ✅ buen contraste
  },
  iconos: {
    flexDirection: 'row',
    gap: 2, // ✅ si está soportado
  },
  botonIcono: {
    padding: 10,
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
