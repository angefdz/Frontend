import CategoriaClicable from '@/components/biblioteca/categorias/CategoriaClicable';
import { categorias } from '@/data/categorias';
import { styles } from '@/styles/GaleriaScreen.styles';
import { ScrollView, Text, View } from 'react-native';

export default function CategoriasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todas las categorías</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {categorias.map((c) => (
            <CategoriaClicable
              key={c.id}
              id={c.id}
              nombre={c.nombre}
              imagen={c.imagen}
              itemStyle={styles.item}
              emojiStyle={styles.itemEmoji}
              textStyle={styles.itemText}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
