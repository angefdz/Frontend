import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import CabeceraPictograma from '@/components/biblioteca/pictogramas/verPictograma/CabeceraPictograma';
import ImagenPictograma from '@/components/biblioteca/pictogramas/verPictograma/ImagenPictograma';

import { useAuth } from '@/context/AuthContext';
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';

import { PictogramaConCategorias } from '@/types';

type Props = {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly pictogramaId: number;
};

export default function ModalVerPictograma({ visible, onClose, pictogramaId }: Props) {
  const { token, usuarioId } = useAuth();
  const { marcarPictogramasComoDesactualizados } = usePictogramasContext();
  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();

  const [pictograma, setPictograma] = useState<PictogramaConCategorias | null>(null);
  const [oculto, setOculto] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible || !token || !pictogramaId || !usuarioId) return;

    const cargar = async () => {
      setCargando(true);
      setError(null);
      try {
        const res = await axios.get(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas/${pictogramaId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPictograma(res.data);

        const ocultoRes = await axios.get(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas-ocultos/es-oculto`,
          {
            params: { pictogramaId, usuarioId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOculto(ocultoRes.data === true);
      } catch (err) {
        console.error('❌ Error al cargar el pictograma:', err);
        setError('No se pudo cargar el pictograma');
      } finally {
        setCargando(false);
      }
    };

    cargar();
  }, [visible, pictogramaId, token, usuarioId]);

  const manejarToggleVisibilidad = async () => {
    if (!pictograma || !usuarioId) return;

    const endpoint = oculto ? 'desocultar' : 'ocultar';
    const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas-ocultos/${endpoint}?pictogramaId=${pictograma.id}`;

    try {
      if (oculto) {
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Alert.alert('✅ Pictograma visible', 'El pictograma se ha desocultado.');
      } else {
        await axios.post(url, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Alert.alert('✅ Pictograma oculto', 'El pictograma se ha ocultado.');
      }

      setOculto((prev) => !prev);
      marcarPictogramasComoDesactualizados();
      marcarCategoriasComoDesactualizadas();
    } catch (err) {
      console.error('Error al cambiar la visibilidad del pictograma:', err);
      Alert.alert('Error', 'No se pudo cambiar la visibilidad.');
    }
  };

  let contenido: React.ReactNode;
  if (cargando) {
    contenido = <ActivityIndicator />;
  } else if (error) {
    contenido = <Text style={{ color: 'red' }}>{error}</Text>;
  } else if (pictograma) {
    contenido = (
      <ScrollView style={{ padding: 16 }}>
        <CabeceraPictograma
          titulo={pictograma.nombre}
          id={pictograma.id}
          oculto={oculto}
          onToggleVisibilidad={manejarToggleVisibilidad}
        />
        <ImagenPictograma uri={pictograma.imagen} nombre={pictograma.nombre} />
      </ScrollView>
    );
  } else {
    contenido = <Text>No hay datos</Text>;
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.modalContent}>{contenido}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    maxHeight: '90%',
  },
});
