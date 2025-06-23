import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A', // Mejor contraste (AAA)
    flex: 1,
  },
  iconos: {
    flexDirection: 'row',
    alignItems: 'center',
    // Eliminamos gap por compatibilidad, usar marginRight en los hijos si hace falta
  },
  botonIcono: {
    padding: 8,
    minWidth: 48,
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
