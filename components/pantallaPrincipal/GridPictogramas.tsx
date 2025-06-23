import GridItem from '@/components/pantallaPrincipal/GridItem';
import GridPaginadoHorizontal from '@/components/pantallaPrincipal/GridPaginaHorizontal';
import { PictogramaSimple } from '@/types';
import React, { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';

type Props = {
  readonly pictogramas: PictogramaSimple[];
  readonly itemsPerPage: number;
  readonly onSeleccionar: (pictograma: PictogramaSimple) => void;
};

function GridPictogramas({
  pictogramas,
  itemsPerPage,
  onSeleccionar,
}: Props) {
  const { height } = useWindowDimensions();

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
      availableHeight={height * 0.6} // Ajusta este valor si necesitas más o menos espacio vertical
    />
  );
}

export default React.memo(GridPictogramas);
