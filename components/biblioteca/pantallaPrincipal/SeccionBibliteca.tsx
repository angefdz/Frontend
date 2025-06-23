import CabeceraSeccion from '@/components/biblioteca/pantallaPrincipal/CabeceraSeccion';
import ListaScrollHorizontal from '@/components/biblioteca/pantallaPrincipal/ListaScrollHorizontal';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props<T> {
  readonly titulo: string;
  readonly onAddPress: () => void;
  readonly onVerMasPress: () => void;
  readonly datos: T[];
  readonly renderItem: (item: T) => React.ReactNode;
  readonly textoVerMas?: string;
  readonly mensajeVacio?: string;
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
        <Text
          style={{ marginHorizontal: 16, fontStyle: 'italic' }}
          allowFontScaling={true}
        >
          {mensajeVacio}
        </Text>
      ) : (
        <View>
          <ListaScrollHorizontal datos={datos} renderItem={renderItem} />

          <TouchableOpacity
            onPress={onVerMasPress}
            style={styles.verMasButton}
            accessible
            accessibilityRole="button"
            accessibilityLabel={`Ver más ${titulo.toLowerCase()}`}
          >
            <Text
              style={styles.verMasText}
              allowFontScaling={true}
              adjustsFontSizeToFit={false}
            >
              {textoVerMas}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
