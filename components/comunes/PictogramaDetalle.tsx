// src/components/pictogramas/PictogramaDetalle.tsx

import axios from 'axios';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Text,
    View,
} from 'react-native';

import CabeceraPictograma from '@/components/biblioteca/pictogramas/verPictograma/CabeceraPictograma';
import ImagenPictograma from '@/components/biblioteca/pictogramas/verPictograma/ImagenPictograma';
import CabeceraSeccion from '@/components/comunes/CabeceraSeccion';
import ItemClicable from '@/components/comunes/ItemClicable';

import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import { useCategoriasDePictograma } from '@/hooks/biblioteca/useCategoriasDePictograma';
import { useEliminarPictograma } from '@/hooks/biblioteca/useEliminarPictograma';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { PictogramaConCategorias } from '@/types';

interface Props {
  id: string;
  onEditar: (id: number) => void;
  onVolverCategoria: (categoriaId: number) => void;
}

export default function PictogramaDetalle({ id, onEditar, onVolverCategoria }: Props) {
  const { token, usuarioId, cargandoToken } = useAutorizarAcceso();
  const { eliminarPictograma } = useEliminarPictograma();

  const [pictograma, setPictograma] = useState<PictogramaConCategorias | null>(null);
  const [oculto, setOculto] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { categorias, cargando: cargandoCategorias, error: errorCategorias } =
    useCategoriasDePictograma(pictograma?.id ?? null);

  const cargarDatos = useCallback(async () => {
    if (!id || !token || !usuarioId) return;

    setCargando(true);
    try {
      const pictogramaRes = await axios.get(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPictograma(pictogramaRes.data);

      const ocultoRes = await axios.get(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas-ocultos/es-oculto`,
        {
          params: { pictogramaId: pictogramaRes.data.id, usuarioId },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOculto(ocultoRes.data === true);
    } catch (err: any) {
      console.error('❌ Error al cargar datos:', err);
      setError('No se pudo cargar el pictograma');
    } finally {
      setCargando(false);
    }
  }, [id, token, usuarioId]);

  useFocusEffect(
    useCallback(() => {
      if (!cargandoToken) {
        cargarDatos();
      }
    }, [cargarDatos, cargandoToken])
  );

  const manejarToggleVisibilidad = async () => {
    if (!pictograma || !usuarioId) return;

    const endpoint = oculto ? 'desocultar' : 'ocultar';
    const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas-ocultos/${endpoint}?pictogramaId=${pictograma.id}&usuarioId=${usuarioId}`;

    try {
      if (oculto) {
        await axios.delete(url, { headers: { Authorization: `Bearer ${token}` } });
        Alert.alert('✅ Pictograma visible', 'El pictograma se ha desocultado correctamente.');
      } else {
        await axios.post(url, null, { headers: { Authorization: `Bearer ${token}` } });
        Alert.alert('✅ Pictograma oculto', 'El pictograma se ha ocultado correctamente.');
      }

      setOculto((prev) => !prev);
    } catch (err) {
      console.error('❌ Error cambiando visibilidad:', err);
      Alert.alert('Error', 'No se pudo cambiar la visibilidad.');
    }
  };

  const manejarEliminar = async () => {
    if (!pictograma) return;

    const esPersonalizado = !!pictograma.usuarioId;
    await eliminarPictograma(pictograma.id, token, esPersonalizado);
  };

  if (cargando || cargandoToken) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#999" style={{ marginTop: 32 }} />
      </View>
    );
  }

  if (error || !pictograma) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 32, color: 'red' }}>
          {error ?? 'Pictograma no encontrado'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CabeceraPictograma
        titulo={pictograma.nombre}
        id={pictograma.id}
        oculto={oculto}
        onToggleVisibilidad={manejarToggleVisibilidad}
        onEditar={() => onEditar(pictograma.id)}
        onEliminar={manejarEliminar}
      />

      <ImagenPictograma uri={pictograma.imagen} />

      <CabeceraSeccion texto="Categorías del pictograma" />

      {cargandoCategorias ? (
        <ActivityIndicator style={{ marginTop: 16 }} />
      ) : errorCategorias ? (
        <Text style={{ color: 'red', marginHorizontal: 16 }}>{errorCategorias}</Text>
      ) : categorias.length === 0 ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          Este pictograma no está asignado a ninguna categoría.
        </Text>
      ) : (
        <View style={styles.grid}>
          {categorias.map((cat) => (
            <ItemClicable
              key={cat.id}
              nombre={cat.nombre}
              imagen={cat.imagen}
              itemStyle={styles.item}
              textStyle={styles.itemText}
              onPress={() => onVolverCategoria(cat.id)}
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
