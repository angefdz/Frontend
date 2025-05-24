import PictogramaClicable from '@/components/biblioteca/pictogramas/PictogramaClicable';
import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/GaleriaScreen.styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

export default function PictogramasPorCategoriaScreen() {
  const { id, nombre } = useLocalSearchParams<{ id: string; nombre: string }>();
  const router = useRouter();

  const pictosFiltrados = pictogramas.filter((p) =>
    p.categorias?.includes(Number(id))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Pictogramas de "{nombre}"</Text>

      {pictosFiltrados.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
            No hay pictogramas en esta categoría.
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {pictosFiltrados.map((p) => (
              <PictogramaClicable
                key={p.id}
                id={p.id}
                palabra={p.palabra}
                imagen={p.imagen}
                onPress={() =>
                  router.push({
                    pathname: '/biblioteca/pictogramas/ver-pictograma',
                    params: { id: p.id },
                  })
                }
                itemStyle={styles.item}
                emojiStyle={styles.itemEmoji}
                textStyle={styles.itemText}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
