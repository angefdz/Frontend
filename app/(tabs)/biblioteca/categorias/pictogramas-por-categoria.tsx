import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Alert, Text, View } from 'react-native';

import CabeceraCategoria from '@/components/biblioteca/categorias/CabeceraCategoria';
import BarraBusqueda from '@/components/comunes/BarraBusqueda';
import ItemClicable from '@/components/comunes/ItemClicable';
import ListaGenerica from '@/components/comunes/ListaItems';

import { useAuth } from '@/context/AuthContext'; // ✅ CAMBIO
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasPorCategoria } from '@/hooks/pantallaPrincipal/usePictogramasPorCategoria';

import { styles } from '@/styles/BibliotecaScreen.styles';

export default function PictogramasPorCategoriaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token } = useAuth(); // ✅ CAMBIO

  const {
    categorias,
    cargando: cargandoCategorias,
    marcarCategoriasComoDesactualizadas,
  } = useCategoriasContext();

  const {
    pictogramas,
    cargando: cargandoPictos,
    error: errorPictos,
    recargar: recargarPictogramas,
  } = usePictogramasPorCategoria(id ?? null);

  const [busqueda, setBusqueda] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (recargarPictogramas) {
        recargarPictogramas();
      }
    }, [recargarPictogramas])
  );

  const categoria = categorias.find((c) => c.id === Number(id));
  const esGeneral = !categoria?.usuarioId;

  const manejarEditarCategoria = () => {
    router.push({
      pathname: '/biblioteca/categorias/editar-categoria',
      params: { id },
    });
  };

  const manejarEliminarCategoria = () => {
    if (!categoria?.usuarioId) {
      Alert.alert('No se puede eliminar', 'No puedes eliminar una categoría general.');
      return;
    }

    Alert.alert(
      'Eliminar categoría',
      pictogramas.length > 0
        ? `Esta categoría tiene pictogramas. ¿Estás segura de que quieres eliminarla? Esta acción no se puede deshacer.`
        : `¿Estás segura de que quieres eliminar la categoría "${categoria.nombre}"? Esta acción no se puede deshacer.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(
                `${process.env.EXPO_PUBLIC_API_BASE_URL}/categorias/${id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );

              marcarCategoriasComoDesactualizadas();
              Alert.alert('Eliminada', 'La categoría se ha eliminado correctamente.');
              router.back();
            } catch (error) {
              console.error('❌ Error al eliminar categoría:', error);
              Alert.alert('Error', 'No se pudo eliminar la categoría.');
            }
          },
        },
      ]
    );
  };

  if (cargandoCategorias || !categoria || cargandoPictos) {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 16, color: '#666', textAlign: 'center', marginTop: 32 }}>
          Cargando...
        </Text>
      </View>
    );
  }

  const filtrados = pictogramas.filter((p) =>
    p.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <CabeceraCategoria
        titulo={categoria.nombre}
        onEditar={manejarEditarCategoria}
        onEliminar={manejarEliminarCategoria}
      />

      {esGeneral && (
        <Text style={{ color: '#666', fontStyle: 'italic', marginBottom: 12, textAlign: 'center' }}>
          Esta es una categoría general. Solo puedes modificar los pictogramas asociados.
        </Text>
      )}

      <BarraBusqueda valor={busqueda} setValor={setBusqueda} />

      {errorPictos ? (
        <Text style={{ color: 'red', marginTop: 24 }}>{errorPictos}</Text>
      ) : filtrados.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: '#666', textAlign: 'center' }}>
            No hay pictogramas que coincidan con tu búsqueda.
          </Text>
        </View>
      ) : (
        <ListaGenerica
          items={filtrados}
          renderItem={(p) => (
            <ItemClicable
              key={p.id}
              nombre={p.nombre}
              imagen={p.imagen}
              itemStyle={styles.item}
              textStyle={styles.itemText}
              onPress={() =>
                router.push({
                  pathname: '/biblioteca/pictogramas/ver-pictograma',
                  params: { id: p.id },
                })
              }
            />
          )}
        />
      )}
    </View>
  );
}
