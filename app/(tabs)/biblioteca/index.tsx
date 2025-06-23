import SeccionHorizontal from '@/components/biblioteca/pantallaPrincipal/SeccionBibliteca';
import ItemClicable from '@/components/comunes/ItemClicable';
import { useAuth } from '@/context/AuthContext';
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Button, ScrollView, Text, View } from 'react-native';

export default function BibliotecaScreen() {
  const router = useRouter();
  const { token, usuarioId, cargandoAuth } = useAuth();

  const {
    categorias,
    cargando: cargandoCategorias,
    error: errorCategorias,
    recargar: recargarCategorias,
  } = useCategoriasContext();

  const {
    pictogramas,
    cargando: cargandoPictogramas,
    error: errorPictogramas,
    recargar: recargarPictogramas,
  } = usePictogramasContext();

  useEffect(() => {
    if (token && usuarioId) {
      recargarCategorias();
      recargarPictogramas();
    }
  }, [token, usuarioId]);

  if (cargandoAuth) {
    return (
      <View style={styles.container}>
        <Text>Cargando datos de usuario...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
      {errorCategorias && (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text style={{ color: 'red', marginBottom: 8 }}>
            Error al cargar las categorías disponibles
          </Text>
          <Button title="Reintentar" onPress={recargarCategorias} />
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
      {errorPictogramas && (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text style={{ color: 'red', marginBottom: 8 }}>
            Error al cargar los pictogramas disponibles
          </Text>
          <Button title="Reintentar" onPress={recargarPictogramas} />
        </View>
      )}
    </ScrollView>
  );
}
