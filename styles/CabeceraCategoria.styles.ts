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
    color: '#333',
    flex: 1,
  },
  iconos: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // si tu versión de React Native no soporta gap, puedes usar marginRight/marginLeft
  },
  botonIcono: {
    padding: 8,
  },
});
