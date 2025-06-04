import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import PictogramaClicable from '@/components/biblioteca/pictogramas/PictogramaClicable';
import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import ListaItems from '@/components/comunes/ListaItems';
import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/BibliotecaScreen.styles';

export default function SeleccionarPictogramasScreen() {
  const router = useRouter();
  const { seleccionados } = useLocalSearchParams<{ seleccionados?: string }>();

  const [seleccionadosIds, setSeleccionadosIds] = useState<number[]>([]);

  useEffect(() => {
    if (seleccionados) {
      try {
        const ids = JSON.parse(seleccionados);
        setSeleccionadosIds(Array.isArray(ids) ? ids : []);
      } catch {
        setSeleccionadosIds([]);
      }
    }
  }, [seleccionados]);

  const toggleSeleccion = (id: number) => {
    setSeleccionadosIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const manejarConfirmar = () => {
    router.replace({
      pathname: '/biblioteca/categorias/crear-categoria',
      params: { seleccionados: JSON.stringify(seleccionadosIds) },
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListaItems
          items={pictogramas}
          renderItem={(pic) => (
            <PictogramaClicable
              key={pic.id}
              id={pic.id}
              palabra={pic.palabra}
              imagen={pic.imagen}
              onPress={() => toggleSeleccion(pic.id)}
              itemStyle={{
                width: 90,
                height: 90,
                backgroundColor: seleccionadosIds.includes(pic.id)
                  ? '#007AFF'
                  : '#f2f2f2',
                borderRadius: 8,
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              emojiStyle={styles.itemEmoji}
              textStyle={styles.itemText}
            />
          )}
        />
      </ScrollView>

      <BotonPrincipal texto="Confirmar selección" onPress={manejarConfirmar} />
    </View>
  );
}
