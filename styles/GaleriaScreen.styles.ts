import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
  },
  sectionTitle: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 15
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  
  item: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#f2f2f2',
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
  },
  itemEmoji: {
    fontSize: width*0.08,
  },
  itemText: {
    fontSize: width * 0.035,
    marginTop: 5,
    color: '#333',
  },
  contenedorBoton: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  
  botonFlotanteResponsive: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  
  
});