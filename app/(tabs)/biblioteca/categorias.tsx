import { categorias } from '@/data/categorias';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function CategoriasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todas las categorías</Text>
      <FlatList
        data={categorias}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
