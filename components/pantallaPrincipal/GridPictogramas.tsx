import GridItem from '@/components/pantallaPrincipal/GridItem';
import GridPaginadoHorizontal from '@/components/pantallaPrincipal/GridPaginaHorizontal';
import { PictogramaSimple } from '@/types';
import React, { useCallback } from 'react';

type Props = {
  pictogramas: PictogramaSimple[];
  itemsPerPage: number;
  onSeleccionar: (pictograma: PictogramaSimple) => void;
};

function GridPictogramas({
  pictogramas,
  itemsPerPage,
  onSeleccionar,
}: Props) {
  const renderItem = useCallback(
    (p: PictogramaSimple | null, itemSize: number) =>
      p ? (
        <GridItem
          imagen={p.imagen}
          nombre={p.nombre}
          itemSize={itemSize}
          onPress={() => onSeleccionar(p)}
        />
      ) : null,
    [onSeleccionar]
  );

  return (
    <GridPaginadoHorizontal
      items={pictogramas ?? []}
      itemsPerPage={itemsPerPage}
      renderItem={renderItem}
    />
  );
}

export default React.memo(GridPictogramas);
