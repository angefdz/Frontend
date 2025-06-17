import { CategoriaConPictogramas, PictogramaSimple } from '@/types';
import React from 'react';
import BotonVolverCategorias from '../BotonVolverCategorias';
import GridCategorias from '../GridCategorias';
import GridPictogramas from '../GridPictogramas';

type Props = {
  modoAgrupado: boolean;
  categorias: CategoriaConPictogramas[];
  pictogramasPredeterminados: PictogramaSimple[];
  categoriaSeleccionada: string | null;
  onSeleccionarCategoria: (id: string | null) => void;
  itemsPerPage: number;
  onSeleccionarPictograma: (p: PictogramaSimple) => void;
};

export default function VistaCategoriasDinamica({
  modoAgrupado,
  categorias,
  pictogramasPredeterminados,
  categoriaSeleccionada,
  onSeleccionarCategoria,
  itemsPerPage,
  onSeleccionarPictograma,
}: Props) {
  const pictosFiltrados = (() => {
    if (modoAgrupado && categoriaSeleccionada) {
      const categoria = categorias.find(c => c.id.toString() === categoriaSeleccionada);
      return categoria?.pictogramas ?? [];
    } else if (!modoAgrupado) {
      return pictogramasPredeterminados;
    }
    return [];
  })();

  return (
    <>
      {modoAgrupado && !categoriaSeleccionada && (
        <GridCategorias
          categorias={categorias}
          itemsPerPage={itemsPerPage}
          onSeleccionar={onSeleccionarCategoria}
        />
      )}

      {modoAgrupado && categoriaSeleccionada && (
        <>
          <BotonVolverCategorias onPress={() => onSeleccionarCategoria(null)} />
          <GridPictogramas
            pictogramas={pictosFiltrados}
            itemsPerPage={itemsPerPage}
            onSeleccionar={onSeleccionarPictograma}
          />
        </>
      )}

      {!modoAgrupado && (
        <GridPictogramas
          pictogramas={pictogramasPredeterminados}
          itemsPerPage={itemsPerPage}
          onSeleccionar={onSeleccionarPictograma}
        />
      )}
    </>
  );
}
