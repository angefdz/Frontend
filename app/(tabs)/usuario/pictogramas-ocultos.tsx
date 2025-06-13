// src/app/biblioteca/pictogramas/PictogramasOcultosScreen.tsx
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';

import ItemClicable from '@/components/comunes/ItemClicable';
import ListaGenerica from '@/components/comunes/ListaItems';
import { usePictogramasOcultos } from '@/hooks/ocultos/usePictogramasOcultos';
import { styles } from '@/styles/BibliotecaScreen.styles';

export default function PictogramasOcultosScreen() {
  const router = useRouter();
  const { pictogramas, cargando, error, recargarPictogramas } = usePictogramasOcultos();

  useFocusEffect(
    useCallback(() => {
      recargarPictogramas();
    }, [])
  );

  if (cargando) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginTop: 32 }}>
          Cargando...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16, color: 'red', textAlign: 'center', marginTop: 32 }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Pictogramas ocultos</Text>

      {pictogramas.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
            No tienes pictogramas ocultos.
          </Text>
        </View>
      ) : (
        <ListaGenerica
          items={pictogramas}
          renderItem={(p) => (
            <ItemClicable
              nombre={p.nombre}
              imagen={p.imagen}
              itemStyle={styles.item}
              textStyle={styles.itemText}
              onPress={() =>
                router.push({
                  pathname: '/biblioteca/pictogramas/ver-pictograma',
                  params: {
                    id: p.id,
                    origen: 'ocultos', // 👈 identificamos que viene desde aquí
                  },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}
