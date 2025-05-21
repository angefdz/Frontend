import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function PictogramasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todos los pictogramas</Text>
      <FlatList
        data={pictogramas}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemEmoji}>{item.imagen}</Text>
            <Text style={styles.itemText}>{item.palabra}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
