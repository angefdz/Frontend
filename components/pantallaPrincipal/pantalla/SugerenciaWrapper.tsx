// SugerenciaWrapper.tsx
import SugerenciaPictograma from '@/components/pantallaPrincipal/SugerenciaPictograma';
import { PictogramaSimple } from '@/types';
import React from 'react';

interface Props {
  sugerencia: PictogramaSimple;
  itemsPerPage: number;
  onUsar: (p: PictogramaSimple) => void;
}

export default function SugerenciaWrapper({ sugerencia, itemsPerPage, onUsar }: Props) {
  if (!sugerencia) return null;

  return (
    <SugerenciaPictograma
      sugerencia={sugerencia}
      itemsPerPage={itemsPerPage}
      usarSugerencia={() => onUsar(sugerencia)}
    />
  );
}
