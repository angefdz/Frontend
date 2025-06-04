import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Text, View } from 'react-native';

import CabeceraCategoria from '@/components/biblioteca/categorias/CabeceraCategoria';
import PictogramaClicable from '@/components/biblioteca/pictogramas/PictogramaClicable';
import ListaGenerica from '@/components/comunes/ListaItems';
import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/BibliotecaScreen.styles';

export default function PictogramasPorCategoriaScreen() {
  const { id, nombre } = useLocalSearchParams<{ id: string; nombre: string }>();
  const router = useRouter();

  const pictosFiltrados = pictogramas.filter((p) =>
    p.categorias?.includes(Number(id))
  );

  const manejarEditarCategoria = () => {
    router.push({
      pathname: '/biblioteca/categorias/editar-categoria',
      params: { id },
    });
  };

  const manejarEliminarCategoria = () => {
    Alert.alert(
      'Eliminar categoría',
      `¿Estás segura de que quieres eliminar la categoría "${nombre}"? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            console.log(`Categoría ${id} eliminada`);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CabeceraCategoria
        titulo={nombre}
        onEditar={manejarEditarCategoria}
        onEliminar={manejarEliminarCategoria}
      />

      {pictosFiltrados.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
            No hay pictogramas en esta categoría.
          </Text>
        </View>
      ) : (
        <ListaGenerica
          items={pictosFiltrados}
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
