import CabeceraSeccion from '@/components/biblioteca/pantallaPrincipal/CabeceraSeccion';
import ListaScrollHorizontal from '@/components/biblioteca/pantallaPrincipal/ListaScrollHorizontal';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props<T> {
  titulo: string;
  onAddPress: () => void;
  onVerMasPress: () => void;
  datos: T[];
  renderItem: (item: T) => React.ReactNode;
  textoVerMas?: string;
  mensajeVacio?: string;
}

export default function SeccionBiblioteca<T>({
  titulo,
  onAddPress,
  onVerMasPress,
  datos,
  renderItem,
  textoVerMas = `Ver más ${titulo.toLowerCase()}`,
  mensajeVacio = `No hay ${titulo.toLowerCase()} disponibles.`,
}: Props<T>) {
  return (
    <View>
      <CabeceraSeccion titulo={titulo} onAddPress={onAddPress} />

      {datos.length === 0 ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          {mensajeVacio}
        </Text>
      ) : (
        <View>
          <ListaScrollHorizontal datos={datos} renderItem={renderItem} />

          <TouchableOpacity onPress={onVerMasPress} style={styles.verMasButton}>
            <Text style={styles.verMasText}>{textoVerMas}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
