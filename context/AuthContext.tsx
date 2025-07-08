
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type AuthData = {
  token: string | null;
  usuarioId: number | null;
};

type AuthContextType = {
  token: string | null;
  usuarioId: number | null;
  cargandoAuth: boolean;
  setAuthData: (data: AuthData) => void;
  cerrarSesion: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUsuarioId = await AsyncStorage.getItem('usuarioId');

        if (storedToken && storedUsuarioId) {
          setToken(storedToken);
          setUsuarioId(Number(storedUsuarioId));
        }
      } catch (e) {
        console.error('Error al cargar datos del usuario:', e);
      } finally {
        setCargandoAuth(false);
      }
    };

    cargarDatos();
  }, []);

  const setAuthData = async ({ token, usuarioId }: AuthData) => {
    try {
      setToken(token);
      setUsuarioId(usuarioId);

      if (token && usuarioId !== null) {
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('usuarioId', usuarioId.toString());
      }
    } catch (e) {
      console.error('Error al guardar datos de autenticación:', e);
    }
  };

  const cerrarSesion = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('usuarioId');
    } catch (e) {
      console.error('Error al limpiar datos de sesión:', e);
    }

    setToken(null);
    setUsuarioId(null);
  };

  const value = useMemo(
    () => ({
      token,
      usuarioId,
      cargandoAuth,
      setAuthData,
      cerrarSesion,
    }),
    [token, usuarioId, cargandoAuth]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};
