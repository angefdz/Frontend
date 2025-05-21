import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 70,
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
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    padding: 10,
  },
  pictogramaEmoji: {
    fontSize: 40,
  },
  pictogramaTexto: {
    fontSize: 14,
    marginTop: 5,
    color: '#333',
  },
  pictogramaSugerido: {
    backgroundColor: '#FFECA8', // color de fondo suave para destacar
    borderColor: '#FFC107',     // borde dorado
    borderWidth: 2,
  },
  
});
