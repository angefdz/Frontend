import { useState } from 'react';
import { categorias } from '../../data/categorias';
import { pictogramas } from '../../data/pictogramas';

export const useBiblioteca = () => {
  const [verMasCategorias, setVerMasCategorias] = useState(false);
  const [verMasPictogramas, setVerMasPictogramas] = useState(false);

  const categoriasVisibles = verMasCategorias ? categorias : categorias.slice(0, 4);
  const pictogramasVisibles = verMasPictogramas ? pictogramas : pictogramas.slice(0, 9);

  return {
    categoriasVisibles,
    pictogramasVisibles,
    verMasCategorias,
    verMasPictogramas,
    setVerMasCategorias,
    setVerMasPictogramas,
  };
};
