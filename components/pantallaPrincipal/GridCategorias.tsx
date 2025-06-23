import GridItem from '@/components/pantallaPrincipal/GridItem';
import GridPaginadoHorizontal from '@/components/pantallaPrincipal/GridPaginaHorizontal';
import { CategoriaSimple } from '@/types'; // <-- actualizado
import React from 'react';

type Props = {
  readonly categorias: CategoriaSimple[]; 
  readonly itemsPerPage: number;
  readonly onSeleccionar: (id: string) => void;
};

export default function GridCategorias({
  categorias,
  itemsPerPage,
  onSeleccionar,
}: Props) {
  return (
    <GridPaginadoHorizontal
      items={categorias ?? []}
      itemsPerPage={itemsPerPage}
      renderItem={(cat, itemSize) =>
        cat ? (
          <GridItem
            imagen={cat.imagen}
            nombre={cat.nombre}
            itemSize={itemSize}
            onPress={() => onSeleccionar(cat.id.toString())}
          />
        ) : null
      }
    />
  );
}
