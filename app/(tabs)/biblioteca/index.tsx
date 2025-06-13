import SeccionHorizontal from '@/components/biblioteca/pantallaPrincipal/SeccionBibliteca';
import ItemClicable from '@/components/comunes/ItemClicable';
import { useCategoriasVisibles } from '@/hooks/biblioteca/useCategoriasVisibles';
import { usePictogramasConCategorias } from '@/hooks/biblioteca/usePictogramasConCategorias';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';

export default function BibliotecaScreen() {
  const router = useRouter();

  const {
    categorias,
    cargando: cargandoCategorias,
    error: errorCategorias,
    recargar: cargarCategorias,
  } = useCategoriasVisibles();

  const {
    pictogramas,
    cargando: cargandoPictogramas,
    error: errorPictogramas,
    cargarPictogramas,
  } = usePictogramasConCategorias();

  useFocusEffect(
    useCallback(() => {
      cargarCategorias();
      cargarPictogramas();
    }, [cargarCategorias, cargarPictogramas])
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {errorCategorias && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: 'red' }}>{errorCategorias}</Text>
        </View>
      )}

      <SeccionHorizontal
        titulo="Categorías"
        datos={cargandoCategorias ? [] : categorias.slice(0, 30)}
        onAddPress={() => router.push('/biblioteca/categorias/crear-categoria')}
        onVerMasPress={() => router.push('/biblioteca/categorias/categorias')}
        renderItem={(item) => (
          <ItemClicable
            key={item.id}
            nombre={item.nombre}
            imagen={item.imagen}
            itemStyle={styles.item}
            textStyle={styles.itemText}
            onPress={() =>
              router.push({
                pathname: '/biblioteca/categorias/pictogramas-por-categoria',
                params: { id: item.id },
              })
            }
          />
        )}
      />

      {errorPictogramas && (
        <View style={{ padding: 16 }}>
          <Text style={{ color: 'red' }}>{errorPictogramas}</Text>
        </View>
      )}

      <SeccionHorizontal
        titulo="Pictogramas"
        datos={cargandoPictogramas ? [] : pictogramas.slice(0, 30)}
        onAddPress={() => router.push('/biblioteca/pictogramas/crear-pictograma')}
        onVerMasPress={() => router.push('/biblioteca/pictogramas/pictogramas')}
        renderItem={(item) => (
          <ItemClicable
            key={item.id}
            nombre={item.nombre}
            imagen={item.imagen}
            itemStyle={styles.item}
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
