// app/biblioteca/pictogramas/ver-pictograma.tsx

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
  const { pictogramas, marcarPictogramasComoDesactualizados } = usePictogramasContext();
  const { categorias, cargando, error, marcarCategoriasComoDesactualizadas } = useCategoriasContext();

  const pictograma: PictogramaSimple | undefined = pictogramas.find(
    (p) => p.id === Number(id)
  );
  const [oculto, setOculto] = useState(false);

  const categoriasDelPictograma: CategoriaConPictogramas[] = useMemo(() => {
    if (!pictograma) return [];
    return categorias.filter((cat) =>
      cat.pictogramas?.some((p: PictogramaSimple) => p.id === pictograma.id)
    );
  }, [categorias, pictograma?.id]);

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

  const manejarEditar = () => {
    if (!pictograma) return;

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
  
        // Mostramos el mensaje y luego vamos hacia atrás
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
          Pictograma no encontrado
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

      {cargando ? (
        <ActivityIndicator style={{ marginTop: 16 }} />
      ) : error ? (
        <Text style={{ color: 'red', marginHorizontal: 16 }}>{error}</Text>
      ) : categoriasDelPictograma.length === 0 ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          Este pictograma no está asignado a ninguna categoría.
        </Text>
      ) : (
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
      )}
    </ScrollView>
  );
}
