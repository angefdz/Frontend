import GridItem from '@/components/pantallaPrincipal/GridItem';
import GridPaginadoHorizontal from '@/components/pantallaPrincipal/GridPaginaHorizontal';
import { CategoriaSimple } from '@/types';
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

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
  const { localizeCategory } = useLanguage();
  return (
    <GridPaginadoHorizontal
      items={categorias ?? []}
      itemsPerPage={itemsPerPage}
      renderItem={(cat, itemSize) =>
        cat ? (
          <GridItem
            imagen={cat.imagen}
            nombre={localizeCategory(cat)}
            itemSize={itemSize}
            onPress={() => onSeleccionar(cat.id.toString())}
          />
        ) : null
      }
    />
  );
}
