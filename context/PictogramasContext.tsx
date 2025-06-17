import { usePictogramasVisibles as usePictogramasHook } from '@/hooks/biblioteca/usePictogramasVisibles';
import React, { createContext, useContext, useEffect, useState } from 'react';

type PictogramasContextType = {
  pictogramas: any[];
  cargando: boolean;
  error: string | null;
  recargar: () => void;
  marcarPictogramasComoDesactualizados: () => void;
};

const PictogramasContext = createContext<PictogramasContextType | undefined>(undefined);

export const PictogramasProvider = ({ children }: { children: React.ReactNode }) => {
  const { pictogramas, cargando, error, recargar } = usePictogramasHook();
  const [desactualizados, setDesactualizados] = useState(false);

  const marcarPictogramasComoDesactualizados = () => {
    setDesactualizados(true);
  };

  useEffect(() => {
    if (desactualizados) {
      recargar();
      setDesactualizados(false);
    }
  }, [desactualizados, recargar]);

  return (
    <PictogramasContext.Provider
      value={{
        pictogramas,
        cargando,
        error,
        recargar,
        marcarPictogramasComoDesactualizados,
      }}
    >
      {children}
    </PictogramasContext.Provider>
  );
};

export const usePictogramasContext = () => {
  const context = useContext(PictogramasContext);
  if (!context) {
    throw new Error('usePictogramasContext debe usarse dentro de un PictogramasProvider');
  }
  return context;
};
