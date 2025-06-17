import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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

import { useAuth } from '@/context/AuthContext';
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';
import { useCategoriasDePictograma } from '@/hooks/biblioteca/useCategoriasDePictograma';
import { useEliminarPictograma } from '@/hooks/biblioteca/useEliminarPictograma';

import { styles } from '@/styles/BibliotecaScreen.styles';
import { PictogramaConCategorias } from '@/types';

export default function VerPictogramaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { token, usuarioId } = useAuth();
  const { eliminarPictograma } = useEliminarPictograma();
  const { marcarPictogramasComoDesactualizados } = usePictogramasContext();
  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();

  const [pictograma, setPictograma] = useState<PictogramaConCategorias | null>(null);
  const [oculto, setOculto] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    categorias,
    cargando: cargandoCategorias,
    error: errorCategorias,
    refetch: refetchCategorias,
  } = useCategoriasDePictograma(pictograma?.id ?? null);

  useEffect(() => {
    if (!id || !token || !usuarioId) return;

    const cargarDatos = async () => {
      setCargando(true);
      try {
        const pictogramaRes = await axios.get(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
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
        refetchCategorias();
      } catch (err: any) {
        console.error('❌ Error al cargar datos:', err);
        setError('No se pudo cargar el pictograma');
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id, token, usuarioId, refetchCategorias]);

  const manejarEditar = () => {
    if (!pictograma) return;

    if (!pictograma.usuarioId) {
      Alert.alert(
        'Pictograma general',
        'Este pictograma es compartido por todos los usuarios. Solo se permite modificar las categorías a las que pertenece, no su nombre, imagen ni tipo.',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Editar categorías',
            onPress: () =>
              router.push({
                pathname: '/biblioteca/pictogramas/editar-pictograma',
                params: { id: pictograma.id.toString() },
              }),
          },
        ]
      );
      return;
    }

    router.push({
      pathname: '/biblioteca/pictogramas/editar-pictograma',
      params: { id: pictograma.id.toString() },
    });
  };

  const manejarEliminar = async () => {
    if (!pictograma) return;

    const esPersonalizado = !!pictograma.usuarioId;
    await eliminarPictograma(pictograma.id, token, esPersonalizado, () => {
      marcarPictogramasComoDesactualizados();
      marcarCategoriasComoDesactualizadas();
    });
  };

  const manejarToggleVisibilidad = async () => {
    if (!pictograma || !usuarioId) return;

    const endpoint = oculto ? 'desocultar' : 'ocultar';
    const url = `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas-ocultos/${endpoint}?pictogramaId=${pictograma.id}`;

    try {
      if (oculto) {
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Alert.alert('✅ Pictograma visible', 'El pictograma se ha desocultado correctamente.');
      } else {
        await axios.post(url, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Alert.alert('✅ Pictograma oculto', 'El pictograma se ha ocultado correctamente.');
      }

      setOculto((prev) => !prev);
      marcarPictogramasComoDesactualizados();
      marcarCategoriasComoDesactualizadas();
    } catch (err) {
      console.error('❌ Error cambiando visibilidad:', err);
      Alert.alert('Error', 'No se pudo cambiar la visibilidad.');
    }
  };

  if (cargando) {
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
        onEditar={manejarEditar}
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
              onPress={() =>
                router.push({
                  pathname: '/biblioteca/categorias/pictogramas-por-categoria',
                  params: { id: cat.id },
                })
              }
            />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
