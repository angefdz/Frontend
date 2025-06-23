import React from 'react';
import MenuConfiguracion from './MenuConfiguracion';

type Props = {
  readonly modoAgrupado: boolean;
  readonly manejarCambioAgrupado: (nuevo: boolean) => void;
  readonly manejarVolverCategorias: () => void;
  readonly setItemsPerPage: (valor: number) => void;
  readonly itemsPerPage: number;
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
