import { categorias } from '@/data/categorias';
import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function BibliotecaScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* CATEGORÍAS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categorías</Text>
        <TouchableOpacity onPress={() => router.push('/biblioteca/crear-categoria')}>
          <Text style={styles.addButton}>＋</Text>
        </TouchableOpacity>
      </View>

      {categorias.length > 0 && (
        <View>
          {(() => {
            const catsMostradas = categorias.slice(0, 10);
            const mitad = Math.ceil(catsMostradas.length / 2);
            const fila1 = catsMostradas.slice(0, mitad);
            const fila2 = catsMostradas.slice(mitad);

            return (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.horizontalRow}>
                    {fila1.map((item) => (
                      <TouchableOpacity key={item.id} style={styles.item}>
                        <Text style={styles.itemEmoji}>{item.imagen}</Text>
                        <Text style={styles.itemText}>{item.nombre}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.horizontalRow}>
                    {fila2.map((item) => (
                      <TouchableOpacity key={item.id} style={styles.item}>
                        <Text style={styles.itemEmoji}>{item.imagen}</Text>
                        <Text style={styles.itemText}>{item.nombre}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>
            );
          })()}

          <TouchableOpacity
            onPress={() => router.push('/biblioteca/categorias')}
            style={styles.verMasButton}
          >
            <Text style={styles.verMasText}>Ver más categorías</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* PICTOGRAMAS */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Pictogramas</Text>
        <TouchableOpacity onPress={() => router.push('/biblioteca/crear-pictograma')}>
          <Text style={styles.addButton}>＋</Text>
        </TouchableOpacity>
      </View>

      {pictogramas.length > 0 && (
        <View>
          {(() => {
            const pictosMostrados = pictogramas.slice(0, 10);
            const mitad = Math.ceil(pictosMostrados.length / 2);
            const fila1 = pictosMostrados.slice(0, mitad);
            const fila2 = pictosMostrados.slice(mitad);

            return (
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View>
                  <View style={styles.horizontalRow}>
                    {fila1.map((item) => (
                      <TouchableOpacity key={item.id} style={styles.item}>
                        <Text style={styles.itemEmoji}>{item.imagen}</Text>
                        <Text style={styles.itemText}>{item.palabra}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <View style={styles.horizontalRow}>
                    {fila2.map((item) => (
                      <TouchableOpacity key={item.id} style={styles.item}>
                        <Text style={styles.itemEmoji}>{item.imagen}</Text>
                        <Text style={styles.itemText}>{item.palabra}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>
            );
          })()}

          <TouchableOpacity
            onPress={() => router.push('/biblioteca/pictogramas')}
            style={styles.verMasButton}
          >
            <Text style={styles.verMasText}>Ver más pictogramas</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
