import CategoriaClicable from '@/components/biblioteca/categorias/CategoriaClicable';
import SeccionHorizontal from '@/components/biblioteca/pantallaPrincipal/SeccionBibliteca';
import PictogramaClicable from '@/components/biblioteca/pictogramas/PictogramaClicable';
import { categorias } from '@/data/categorias';
import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';

export default function BibliotecaScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <SeccionHorizontal
        titulo="Categorías"
        datos={categorias.slice(0, 10)}
        onAddPress={() => router.push('/biblioteca/categorias/crear-categoria')}
        onVerMasPress={() => router.push('/biblioteca/categorias/categorias')}
        renderItem={(item) => (
          <CategoriaClicable
            key={item.id}
            id={item.id}
            nombre={item.nombre}
            imagen={item.imagen}
            itemStyle={styles.item}
            emojiStyle={styles.itemEmoji}
            textStyle={styles.itemText}
          />
        )}
      />

      <SeccionHorizontal
        titulo="Pictogramas"
        datos={pictogramas.slice(0, 10)}
        onAddPress={() => router.push('/biblioteca/pictogramas/crear-pictograma')}
        onVerMasPress={() => router.push('/biblioteca/pictogramas/pictogramas')}
        renderItem={(item) => (
          <PictogramaClicable
            key={item.id}
            id={item.id}
            palabra={item.palabra}
            imagen={item.imagen}
            itemStyle={styles.item}
            emojiStyle={styles.itemEmoji}
            textStyle={styles.itemText}
            onPress={() =>
              router.push({
                pathname: '/biblioteca/pictogramas/ver-pictograma',
                params: { id: item.id },
              })
            }
          />
        )}
      />
    </ScrollView>
  );
}
