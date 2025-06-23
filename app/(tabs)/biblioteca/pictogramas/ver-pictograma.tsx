// VerPictogramaScreen.tsx
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
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
import { Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

import { useAuth } from '@/context/AuthContext';
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';
import { useEliminarPictograma } from '@/hooks/biblioteca/useEliminarPictograma';

import { styles } from '@/styles/BibliotecaScreen.styles';
import { CategoriaConPictogramas, PictogramaSimple } from '@/types';

export default function VerPictogramaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { token, usuarioId } = useAuth();
  const { eliminarPictograma } = useEliminarPictograma();
  const { marcarPictogramasComoDesactualizados, pictogramas } = usePictogramasContext();
  const { categorias, cargando, error, marcarCategoriasComoDesactualizadas } = useCategoriasContext();

  const [esPersonalizado, setEsPersonalizado] = useState(false);
  const [oculto, setOculto] = useState(false);

  const pictograma = useMemo(() => {
    return pictogramas.find((p) => p.id === Number(id)) ?? null;
  }, [pictogramas, id]);

  useEffect(() => {
    const cargarUsuarioId = async () => {
      if (!id || !token) return;

      try {
        const res = await axios.get(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas/${id}/con-categorias`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.usuarioId) {
          setEsPersonalizado(true);
        }
      } catch (err) {
        console.error('❌ Error al comprobar si el pictograma es personalizado:', err);
      }
    };

    cargarUsuarioId();
  }, [id, token]);

  useEffect(() => {
    const comprobarOculto = async () => {
      if (!pictograma || !usuarioId) return;

      try {
        const res = await fetch(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas-ocultos/es-oculto?pictogramaId=${pictograma.id}&usuarioId=${usuarioId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setOculto(data === true);
      } catch (error) {
        console.error('Error al comprobar visibilidad del pictograma', error);
      }
    };

    comprobarOculto();
  }, [pictograma?.id, usuarioId]);

  const categoriasDelPictograma: CategoriaConPictogramas[] = useMemo(() => {
    if (!pictograma) return [];
    return categorias.filter((cat) =>
      cat.pictogramas?.some((p: PictogramaSimple) => p.id === pictograma.id)
    );
  }, [categorias, pictograma?.id]);

  const manejarEditar = () => {
    if (!pictograma) return;
    router.push({
      pathname: '/biblioteca/pictogramas/editar-pictograma',
      params: { id: pictograma.id.toString() },
    });
  };

  const manejarEliminar = async () => {
    if (!pictograma) return;

    if (!esPersonalizado) {
      Alert.alert('No se puede eliminar', 'Este pictograma es general y no se puede eliminar.');
      return;
    }

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
        await fetch(url, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
        Alert.alert('✅ Pictograma visible', 'El pictograma se ha desocultado correctamente.');
        setOculto(false);
      } else {
        await fetch(url, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });

        Alert.alert('✅ Pictograma oculto', 'El pictograma se ha ocultado correctamente.', [
          {
            text: 'OK',
            onPress: () => {
              setOculto(true);
              marcarPictogramasComoDesactualizados();
              marcarCategoriasComoDesactualizadas();
              router.back();
            },
          },
        ]);
        return;
      }

      marcarPictogramasComoDesactualizados();
      marcarCategoriasComoDesactualizadas();
    } catch (err) {
      console.error('❌ Error cambiando visibilidad:', err);
      Alert.alert('Error', 'No se pudo cambiar la visibilidad.');
    }
  };

  if (!pictograma) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 32, color: 'red' }}>
          Cargando pictograma...
        </Text>
      </View>
    );
  }

  let contenidoCategorias;

  if (cargando) {
    contenidoCategorias = <ActivityIndicator style={{ marginTop: 16 }} />;
  } else if (error) {
    contenidoCategorias = (
      <Text style={{ color: 'red', marginHorizontal: 16 }}>{error}</Text>
    );
  } else if (categoriasDelPictograma.length === 0) {
    contenidoCategorias = (
      <Text
  style={{
    marginHorizontal: width * 0.05,
    fontStyle: 'italic',
    fontSize: width * 0.035,
    textAlign: 'center',
    marginTop: height * 0.015,
    color: '#555',
  }}
>
  Este pictograma no está asignado a ninguna categoría.
</Text>
    );
  } else {
    contenidoCategorias = (
      <View style={styles.grid}>
        {categoriasDelPictograma.map((cat) => (
          <ItemClicable
            key={cat.id}
            nombre={cat.nombre}
            imagen={cat.imagen}
            itemStyle={styles.item}
            textStyle={styles.itemText}
            onPress={() =>
              router.push({
                pathname: '/biblioteca/categorias/pictogramas-por-categoria',
                params: { id: cat.id.toString() },
              })
            }
          />
        ))}
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

{!esPersonalizado && (
  <Text
    style={{
      color: '#666',
      fontStyle: 'italic',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      padding: width * 0.03,
      borderRadius: width * 0.02,
      marginHorizontal: width * 0.05,
      marginBottom: height * 0.015,
      fontSize: width * 0.035,
    }}
    accessible
    accessibilityRole="text"
  >
    Este es un pictograma general. No puedes editar su nombre, imagen ni tipo, pero sí puedes modificar sus categorías.
  </Text>
)}


      <ImagenPictograma uri={pictograma.imagen} nombre={pictograma.nombre} />

      <Text style={styles.sectionTitle}>Tipo:</Text>
      <Text style={{ fontSize: width* 0.035, marginLeft:8}}>
        {pictograma.tipo === 'verbo' ? 'Verbo' : 'Sustantivo'}
      </Text>

      <CabeceraSeccion texto="Categorías del pictograma" />

      {contenidoCategorias}
    </ScrollView>
  );
}