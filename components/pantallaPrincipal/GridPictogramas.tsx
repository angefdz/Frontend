import GridPaginadoHorizontal from '@/components/pantallaPrincipal/GridPaginaHorizontal';
import { Pictograma } from '@/types';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

type Props = {
  pictogramas: Pictograma[];
  itemsPerPage: number;
  onSeleccionar: (palabra: string) => void;
};

export default function GridPictogramas({
  pictogramas,
  itemsPerPage,
  onSeleccionar,
}: Props) {
  return (
    <GridPaginadoHorizontal
      items={pictogramas}
      itemsPerPage={itemsPerPage}
      renderItem={(p, itemSize) =>
        p ? (
          <TouchableOpacity
            onPress={() => onSeleccionar(p.nombre)}
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
            <Image
              source={{ uri: p.imagen }}
              style={{ width: itemSize * 0.7, height: itemSize * 0.7 }}
              resizeMode="contain"
            />
            <Text style={{ fontSize: itemSize * 0.15 }}>{p.nombre}</Text>
          </TouchableOpacity>
        ) : null
      }
    />
  );
}
