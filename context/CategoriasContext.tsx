
import { useCategoriasConPictogramas as useCategoriasHook } from '@/hooks/biblioteca/useCategoriasVisibles';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type CategoriasContextType = {
  readonly categorias: any[];
  readonly cargando: boolean;
  readonly error: string | null;
  readonly recargar: () => void;
  readonly marcarCategoriasComoDesactualizadas: () => void;
};

const CategoriasContext = createContext<CategoriasContextType | undefined>(undefined);

export const CategoriasProvider = ({ children }: { children: React.ReactNode }) => {
  const { categorias, cargando, error, recargar } = useCategoriasHook();
  const [desactualizadas, setDesactualizadas] = useState(false);

  const marcarCategoriasComoDesactualizadas = () => setDesactualizadas(true);

  useEffect(() => {
    if (desactualizadas) {
      recargar();
      setDesactualizadas(false);
    }
  }, [desactualizadas, recargar]);

  const value = useMemo(
    () => ({
      categorias,
      cargando,
      error,
      recargar,
      marcarCategoriasComoDesactualizadas,
    }),
    [categorias, cargando, error, recargar]
  );

  return (
    <CategoriasContext.Provider value={value}>
      {children}
    </CategoriasContext.Provider>
  );
};

export const useCategoriasContext = () => {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error('useCategoriasContext debe usarse dentro de un CategoriasProvider');
  }
  return context;
};
