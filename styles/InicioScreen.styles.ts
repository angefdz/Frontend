import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const MARGIN = 8;
const NUM_COLUMNS = 3;
const PICTO_WIDTH = (width - MARGIN * 2 * NUM_COLUMNS) / NUM_COLUMNS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    alignItems: 'center',
  },
  pictogramaFrase: {
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 5,
    marginBottom: 5,
  },
  botonesFrase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botonFrase: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  botonFraseTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botonIcono: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 50,
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  pictograma: {
    width: PICTO_WIDTH,
    height: PICTO_WIDTH,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 8,
    overflow: 'hidden',
  },
  pictogramaEmoji: {
    fontSize: 36,
    textAlign: 'center',
  },
  pictogramaTexto: {
    fontSize: 14,
    marginTop: 5,
    color: '#333',
    textAlign: 'center',
    flexShrink: 1,
    maxWidth: '100%',
  },
  pictogramaSugerido: {
    width: 100,
    height: 100,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 10,
    overflow: 'hidden',
  },
  horizontalGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 10,
  },
  page: {
    width,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  botonConEtiqueta: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  etiquetaBoton: {
    marginTop: 4,
    color: 'black',
    fontSize: width*0.05,
  },
  
});
