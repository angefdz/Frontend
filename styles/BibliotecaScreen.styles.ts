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
    color: '#1A1A1A',
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
    minHeight: 48,
    minWidth: 48,
  },
  horizontalRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  item: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    minWidth: 48,
  },
  itemEmoji: {
    fontSize: 30,
    marginBottom: 5,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#1A1A1A', // mejor contraste
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
    minHeight: 48,
    justifyContent: 'center', // ← Añadido
  alignItems: 'center',
  },
  verMasText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#999', // mejor contraste
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#fff',
    minHeight: 48,
    color: '#1A1A1A',
  },
  dropdown: {
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    marginBottom: 15,
    zIndex: 10,
  },
  dropdownContainer: {
    borderColor: '#999',
    borderRadius: 8,
    zIndex: 1000,
  },
  dropdownText: {
    fontSize: 16,
    color: '#1A1A1A',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 10,
  },
  flat: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginHorizontal: 10,
  },
});
