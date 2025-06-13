import GridItem from '@/components/pantallaPrincipal/GridItem';
import GridPaginadoHorizontal from '@/components/pantallaPrincipal/GridPaginaHorizontal';
import { PictogramaSimple } from '@/types';
import React from 'react';

type Props = {
  pictogramas: PictogramaSimple[];
  itemsPerPage: number;
  onSeleccionar: (pictograma: PictogramaSimple) => void; // ✅ cambia aquí
};

export default function GridPictogramas({
  pictogramas,
  itemsPerPage,
  onSeleccionar,
}: Props) {
  return (
    <GridPaginadoHorizontal
      items={pictogramas ?? []}
      itemsPerPage={itemsPerPage}
      renderItem={(p, itemSize) =>
        p ? (
          <GridItem
            imagen={p.imagen}
            nombre={p.nombre}
            itemSize={itemSize}
            onPress={() => onSeleccionar(p)} // ✅ y aquí
          />
        ) : null
      }
    />
  );
}
