import { styles } from '@/styles/BibliotecaScreen.styles';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface Props<T> {
  titulo: string;
  onAddPress: () => void;
  onVerMasPress: () => void;
  datos: T[];
  renderItem: (item: T) => React.ReactNode;
}

export default function SeccionHorizontal<T>({
  titulo,
  onAddPress,
  onVerMasPress,
  datos,
  renderItem,
}: Props<T>) {
  const mitad = Math.ceil(datos.length / 2);
  const fila1 = datos.slice(0, mitad);
  const fila2 = datos.slice(mitad);

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{titulo}</Text>
        <TouchableOpacity onPress={onAddPress}>
          <Text style={styles.addButton}>＋</Text>
        </TouchableOpacity>
      </View>

      {datos.length > 0 && (
        <View>
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

          <TouchableOpacity onPress={onVerMasPress} style={styles.verMasButton}>
            <Text style={styles.verMasText}>Ver más {titulo.toLowerCase()}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
