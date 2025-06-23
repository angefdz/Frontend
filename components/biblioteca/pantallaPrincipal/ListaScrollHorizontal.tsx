import { styles } from '@/styles/BibliotecaScreen.styles';
import { ScrollView, View } from 'react-native';

interface Props<T> {
  readonly datos: T[];
  readonly renderItem: (item: T) => React.ReactNode;
}

export default function ListaScrollHorizontal<T>({ datos, renderItem }: Props<T>) {
  const mitad = Math.ceil(datos.length / 2);
  const fila1 = datos.slice(0, mitad);
  const fila2 = datos.slice(mitad);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View>
        <View style={styles.horizontalRow}>
          {fila1.map(renderItem)}
        </View>
        <View style={styles.horizontalRow}>
          {fila2.map(renderItem)}
        </View>
      </View>
    </ScrollView>
  );
}
