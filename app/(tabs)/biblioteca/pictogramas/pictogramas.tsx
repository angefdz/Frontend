import PictogramaClicable from '@/components/biblioteca/pictogramas/PictogramaClicable';
import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/GaleriaScreen.styles';
import { useRouter } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

export default function PictogramasScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todos los pictogramas</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {pictogramas.map((p) => (
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
    </View>
  );
}
