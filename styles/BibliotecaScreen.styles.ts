// BibliotecaScreen.styles.ts
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const itemSize = (width - 20 * 2 - 10 * 3) / 4; // 4 items por fila con padding y gap

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: width * 0.08,
    backgroundColor: '#fff',
  },
  // BibliotecaScreen.styles.ts
sectionTitle: {
  fontSize: width * 0.055,
  fontWeight: 'bold',
  color: '#1A1A1A',
  marginBottom: width * 0.03,
},
sectionHeader: {
  flexDirection: 'row',
  alignItems: 'center', // ya está bien
  justifyContent: 'space-between',
  paddingTop: 20,
  paddingBottom: 10,
},

addButton: {
  fontSize: width * 0.07,            // antes era 28 fijo
  color: '#007AFF',
  fontWeight: 'bold',
  marginLeft: 10,
  minHeight: width * 0.12,           // escalado proporcional
  minWidth: width * 0.12,            // escalado proporcional
  textAlign: 'center',
  textAlignVertical: 'center',
},
  horizontalRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  item: {
    width: itemSize,
    height: itemSize,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 48,
    minWidth: 48,
  },
  itemEmoji: {
    fontSize: itemSize * 0.4,
    marginBottom: 5,
    textAlign: 'center',
  },
  itemText: {
    fontSize: itemSize * 0.14, // antes era 16 fijo
    color: '#1A1A1A',
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  verMasText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04, // o ajusta 0.04 según el tamaño que quieras

  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
    fontSize: width * 0.04, // o 0.045

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
    paddingHorizontal: width * 0.05,
    paddingBottom: width * 0.06,
    gap: 10,
  },
  
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: width * 0.025,
    marginHorizontal: width * 0.05,
  },
  
});
