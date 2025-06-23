// src/context/VozContext.tsx
import { useConfiguracionUsuario } from '@/hooks/configuracion/useConfiguracionUsuario';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

type VozContextType = {
  tipoVoz: string;
  setTipoVoz: (voz: string) => void;
};

const VozContext = createContext<VozContextType | undefined>(undefined);

export const VozProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const { configuracion } = useConfiguracionUsuario(token);
  const [tipoVoz, setTipoVoz] = useState('femenina');

  useEffect(() => {
    if (configuracion?.tipoVoz) {
      setTipoVoz(configuracion.tipoVoz);
    }
  }, [configuracion]);

  const value = useMemo(
    () => ({ tipoVoz, setTipoVoz }),
    [tipoVoz]
  );

  return (
    <VozContext.Provider value={value}>
      {children}
    </VozContext.Provider>
  );
};

export const useVoz = () => {
  const context = useContext(VozContext);
  if (!context) {
    throw new Error('useVoz debe usarse dentro de VozProvider');
  }
  return context;
};
