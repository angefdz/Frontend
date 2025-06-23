// context/PictogramasContext.tsx
import { useAuth } from '@/context/AuthContext';
import { usePictogramasVisibles as usePictogramasHook } from '@/hooks/biblioteca/usePictogramasVisibles';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type PictogramasContextType = {
  readonly pictogramas: any[];
  readonly cargando: boolean;
  readonly error: string | null;
  readonly recargar: () => void;
  readonly marcarPictogramasComoDesactualizados: () => void;
  readonly usuarioId: number | null;
};

const PictogramasContext = createContext<PictogramasContextType | undefined>(undefined);

export const PictogramasProvider = ({ children }: { children: React.ReactNode }) => {
  const { pictogramas, cargando, error, recargar } = usePictogramasHook();
  const [desactualizados, setDesactualizados] = useState(false);

  const { usuarioId } = useAuth();

  const marcarPictogramasComoDesactualizados = () => {
    setDesactualizados(true);
  };

  useEffect(() => {
    if (desactualizados) {
      recargar();
      setDesactualizados(false);
    }
  }, [desactualizados, recargar]);

  const value = useMemo(
    () => ({
      pictogramas,
      cargando,
      error,
      recargar,
      marcarPictogramasComoDesactualizados,
      usuarioId,
    }),
    [pictogramas, cargando, error, recargar, usuarioId]
  );

  return (
    <PictogramasContext.Provider value={value}>
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
