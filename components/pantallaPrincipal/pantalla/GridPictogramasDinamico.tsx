import { PictogramaSimple } from '@/types';
import React, { useEffect, useState } from 'react';
import GridPictogramas from '../GridPictogramas';

type Props = {
  categoriaSeleccionada: string | null;
  categorias: { id: number; pictogramas: PictogramaSimple[] }[];
  pictogramasSinFiltro: PictogramaSimple[];
  itemsPerPage: number;
  onSeleccionar: (p: PictogramaSimple) => void;
};

export default function GridPictogramasDinamico({
  categoriaSeleccionada,
  categorias,
  pictogramasSinFiltro,
  itemsPerPage,
  onSeleccionar,
}: Props) {
  const [pictos, setPictos] = useState<PictogramaSimple[]>(pictogramasSinFiltro);

  useEffect(() => {
    if (categoriaSeleccionada) {
      const categoria = categorias.find(c => c.id.toString() === categoriaSeleccionada);
      setPictos(categoria?.pictogramas ?? []);
    } else {
      setPictos(pictogramasSinFiltro);
    }
  }, [categoriaSeleccionada, categorias, pictogramasSinFiltro]);

  return (
    <GridPictogramas
      pictogramas={pictos}
      itemsPerPage={itemsPerPage}
      onSeleccionar={onSeleccionar}
    />
  );
}
