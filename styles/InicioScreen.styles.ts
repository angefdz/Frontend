import { Dimensions, StyleSheet } from 'react-native';
import { palette, radius, shadow } from '../constants/Theme';

const { width } = Dimensions.get('window');
const MARGIN = 8;
const NUM_COLUMNS = 3;
const PICTO_WIDTH = (width - MARGIN * 2 * NUM_COLUMNS) / NUM_COLUMNS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
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
    backgroundColor: palette.primarySoft,
    borderRadius: radius.small,
    marginRight: 5,
    marginBottom: 5,
  },
  botonesFrase: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  botonFrase: {
    backgroundColor: palette.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: radius.medium,
    marginHorizontal: 5,
  },
  botonFraseTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botonIcono: {
    backgroundColor: palette.primary,
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
    backgroundColor: palette.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: palette.border,
    ...shadow.card,
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
    color: palette.text,
    fontWeight: '600',
    textAlign: 'center',
    flexShrink: 1,
    maxWidth: '100%',
  },
  pictogramaSugerido: {
    width: 100,
    height: 100,
    backgroundColor: palette.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: radius.medium,
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
    backgroundColor: palette.background,
  },
  botonConEtiqueta: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    marginHorizontal: 10,
    flex: 1,
  },
  
  etiquetaBoton: {
    marginTop: 4,
    color: palette.text,
    fontSize: Math.max(15, width * 0.04),
    fontWeight: '600',
  },
  
});
