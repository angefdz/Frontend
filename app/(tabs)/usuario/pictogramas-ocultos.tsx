import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import PictogramaClicable from '@/components/biblioteca/pictogramas/PictogramaClicable';
import ListaGenerica from '@/components/comunes/ListaItems';
import { styles } from '@/styles/PictogramasOucltosScreen.styles';

// Pictogramas ocultos de prueba
const pictogramasOcultos = [
  { id: 101, palabra: 'Silencio', imagen: '🤫' },
  { id: 102, palabra: 'Privado', imagen: '🔒' },
  { id: 103, palabra: 'Secreto', imagen: '🤐' },
];

export default function PictogramasOcultosScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pictogramas ocultos</Text>

      {pictogramasOcultos.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.mensaje}>No tienes pictogramas ocultos.</Text>
        </View>
      ) : (
        <ListaGenerica
          items={pictogramasOcultos}
          renderItem={(p) => (
            <PictogramaClicable
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
          )}
        />
      )}
    </View>
  );
}
