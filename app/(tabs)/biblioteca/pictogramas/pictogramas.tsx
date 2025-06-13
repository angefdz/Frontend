import ItemClicable from '@/components/comunes/ItemClicable';
import { usePictogramasVisibles } from '@/hooks/biblioteca/usePictogramasVisibles';
import { styles } from '@/styles/GaleriaScreen.styles';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

export default function PictogramasScreen() {
  const router = useRouter();
  const {
    pictogramas,
    cargando,
    error,
    recargar: cargarPictogramas, // ← renombrado
  } = usePictogramasVisibles(); // ← hook actualizado

  useFocusEffect(
    useCallback(() => {
      cargarPictogramas();
    }, [cargarPictogramas])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todos los pictogramas</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {pictogramas.map((item) => (
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
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}
