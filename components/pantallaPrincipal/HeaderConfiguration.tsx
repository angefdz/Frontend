import React from 'react';
import MenuConfiguracion from './MenuConfiguracion';

type Props = {
  modoAgrupado: boolean;
  manejarCambioAgrupado: (nuevo: boolean) => void;
  manejarVolverCategorias: () => void;
  setItemsPerPage: (valor: number) => void;
  itemsPerPage: number;
};

const HeaderConfiguracion = React.memo(function HeaderConfiguracion({
  modoAgrupado,
  manejarCambioAgrupado,
  manejarVolverCategorias,
  setItemsPerPage,
  itemsPerPage,
}: Props) {
  return (
    <MenuConfiguracion
      modoAgrupado={modoAgrupado}
      setModoAgrupado={manejarCambioAgrupado}
      resetearCategoria={manejarVolverCategorias}
      setItemsPerPage={setItemsPerPage}
      itemsPerPage={itemsPerPage}
    />
  );
});

export default HeaderConfiguracion;
