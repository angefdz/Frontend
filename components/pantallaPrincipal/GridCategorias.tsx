import GridPaginadoHorizontal from '@/components/pantallaPrincipal/GridPaginaHorizontal';
import { Categoria } from '@/types';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  categorias: Categoria[];
  itemsPerPage: number;
  onSeleccionar: (id: string) => void;
};

export default function GridCategorias({
  categorias,
  itemsPerPage,
  onSeleccionar,
}: Props) {
  return (
    <GridPaginadoHorizontal
      items={categorias}
      itemsPerPage={itemsPerPage}
      renderItem={(cat, itemSize) =>
        cat ? (
          <TouchableOpacity
            onPress={() => onSeleccionar(cat.id.toString())}
            style={{
              width: itemSize,
              height: itemSize,
              backgroundColor: '#f2f2f2',
              borderRadius: 8,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 4,
            }}
          >
            <Text style={{ fontSize: itemSize * 0.5 }}>{cat.imagen}</Text>
            <Text style={{ fontSize: itemSize * 0.15 }}>{cat.nombre}</Text>
          </TouchableOpacity>
        ) : null
      }
    />
  );
}
