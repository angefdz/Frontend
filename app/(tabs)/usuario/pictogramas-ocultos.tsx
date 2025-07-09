
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Text, View } from 'react-native';

import ItemClicable from '@/components/comunes/ItemClicable';
import ListaGenerica from '@/components/comunes/ListaItems';
import ModalVerPictograma from '@/components/ocultos/ModalVerPictograma';
import { usePictogramasOcultos } from '@/hooks/ocultos/usePictogramasOcultos';
import { styles } from '@/styles/BibliotecaScreen.styles';

export default function PictogramasOcultosScreen() {
  const { pictogramas, cargando, error, recargarPictogramas } = usePictogramasOcultos();

  const [modalVisible, setModalVisible] = useState(false);
  const [pictogramaSeleccionadoId, setPictogramaSeleccionadoId] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      recargarPictogramas();
    }, [recargarPictogramas])
  );

  const abrirModal = (id: number) => {
    setPictogramaSeleccionadoId(id);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setPictogramaSeleccionadoId(null);
    recargarPictogramas(); 
  };

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
              key={p.id}
              nombre={p.nombre}
              imagen={p.imagen}
              itemStyle={styles.item}
              textStyle={styles.itemText}
              onPress={() => abrirModal(p.id)}
            />
          )}
        />
      )}

      {pictogramaSeleccionadoId !== null && (
        <ModalVerPictograma
          visible={modalVisible}
          onClose={cerrarModal}
          pictogramaId={pictogramaSeleccionadoId}
        />
      )}
    </View>
  );
}
