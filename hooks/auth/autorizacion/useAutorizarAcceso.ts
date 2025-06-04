import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useAutorizarAcceso = () => {
  const [token, setToken] = useState<string | null>(null);
  const [cargandoToken, setCargandoToken] = useState(true);

  useEffect(() => {
    const cargarToken = async () => {
      try {
        const tokenGuardado = await AsyncStorage.getItem('token');
        setToken(tokenGuardado);
      } catch (error) {
        console.error('Error cargando el token', error);
      } finally {
        setCargandoToken(false);
      }
    };

    cargarToken();
  }, []);

  const guardarToken = async (nuevoToken: string) => {
    try {
      await AsyncStorage.setItem('token', nuevoToken);
      setToken(nuevoToken);
    } catch (error) {
      console.error('Error guardando el token', error);
    }
  };

  const eliminarToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
    } catch (error) {
      console.error('Error eliminando el token', error);
    }
  };

  return { token, cargandoToken, guardarToken, eliminarToken };
};
