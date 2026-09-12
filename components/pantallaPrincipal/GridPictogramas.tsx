import ReorderablePagedGrid from './ReorderablePagedGrid';
import GridItem from '@/components/pantallaPrincipal/GridItem';
import GridPaginadoHorizontal from '@/components/pantallaPrincipal/GridPaginaHorizontal';
import { PictogramaSimple } from '@/types';
import React, { useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';

type Props = {
  readonly editing?: boolean;
  readonly onReorder?: (ids: number[]) => void;
  readonly onDragging?: (dragging: boolean) => void;
  readonly pictogramas: PictogramaSimple[];
  readonly itemsPerPage: number;
  readonly onSeleccionar: (pictograma: PictogramaSimple) => void;
};

function GridPictogramas({
  pictogramas,
  itemsPerPage,
  onSeleccionar, editing = false, onReorder, onDragging,
}: Props) {
  const { height } = useWindowDimensions();
  const { localize } = useLanguage();

  const renderItem = useCallback(
    (p: PictogramaSimple | null, itemSize: number) =>
      p ? (
        <GridItem
          imagen={p.imagen}
          nombre={localize(p)}
          itemSize={itemSize}
          onPress={() => { if (!editing) onSeleccionar(p); }}
        />
      ) : null,
    [onSeleccionar, localize, editing]
  );

  if (editing && onReorder && onDragging) return (
    <ReorderablePagedGrid items={pictogramas} itemsPerPage={itemsPerPage}
      renderItem={renderItem} onReorder={items => onReorder(items.map(item => item.id))}
      onDragging={onDragging} />
  );

  return (
    <GridPaginadoHorizontal
      items={pictogramas ?? []}
      itemsPerPage={itemsPerPage}
      renderItem={renderItem}
      availableHeight={height * 0.6} 
    />
  );
}

export default React.memo(GridPictogramas);
