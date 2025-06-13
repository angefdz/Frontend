import ItemClicable from '@/components/comunes/ItemClicable';
import { useCategoriasVisibles } from '@/hooks/biblioteca/useCategoriasVisibles'; // ✅ actualizado
import { styles } from '@/styles/GaleriaScreen.styles';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

export default function CategoriasScreen() {
  const router = useRouter();
  const { categorias, cargando, error, recargar: cargarCategorias } = useCategoriasVisibles(); // ✅ actualizado

  useFocusEffect(
    useCallback(() => {
      cargarCategorias();
    }, [cargarCategorias])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todas las categorías</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {categorias.map((item) => (
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
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
