import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },
  addButton: {
    fontSize: 28,
    color: '#007AFF',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  horizontalRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10, // si tu versión de RN lo permite; si no, añade marginRight al item
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
  verMasButton: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  verMasText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 15,
    zIndex: 10, // para que no se superponga mal
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderRadius: 8,
    zIndex: 1000, // asegúrate que el contenedor tenga prioridad visual
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
