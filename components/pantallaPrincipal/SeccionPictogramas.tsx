import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import BotonVolverCategorias from './BotonVolverCategorias';
import GridCategorias from './GridCategorias';
import GridPictogramas from './GridPictogramas';

import { CategoriaSimple, PictogramaSimple } from '@/types';

interface Props {
  modoAgrupado: boolean;
  categoriaSeleccionada: string | null;
  setCategoriaSeleccionada: (id: string | null) => void;
  pictogramas: PictogramaSimple[];
  cargandoPictos: boolean;
  categorias: CategoriaSimple[];
  itemsPerPage: number;
  onSeleccionar: (nombre: string) => void;
}

export default function SeccionPictogramas({
  modoAgrupado,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  pictogramas,
  cargandoPictos,
  categorias,
  itemsPerPage,
  onSeleccionar,
}: Props) {
  if (modoAgrupado && !categoriaSeleccionada) {
    return (
      <GridCategorias
        categorias={categorias}
        itemsPerPage={itemsPerPage}
        onSeleccionar={setCategoriaSeleccionada}
      />
    );
  }

  if (modoAgrupado && categoriaSeleccionada) {
    return (
      <>
        <BotonVolverCategorias onPress={() => setCategoriaSeleccionada(null)} />

        {cargandoPictos ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={{ marginTop: 10 }}>Cargando pictogramas...</Text>
          </View>
        ) : pictogramas.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 16, color: '#666', fontStyle: 'italic' }}>
              No hay pictogramas en esta categoría.
            </Text>
          </View>
        ) : (
          <GridPictogramas
            pictogramas={pictogramas}
            itemsPerPage={itemsPerPage}
            onSeleccionar={(p) => onSeleccionar(p.nombre)}
          />
        )}
      </>
    );
  }

  return (
    <GridPictogramas
      pictogramas={pictogramas}
      itemsPerPage={itemsPerPage}
      onSeleccionar={(p) => onSeleccionar(p.nombre)}
    />
  );
}
