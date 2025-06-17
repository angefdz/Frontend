import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export const useAutorizarAcceso = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [cargandoToken, setCargandoToken] = useState(true);

  useEffect(() => {
    const cargarToken = async () => {
      try {
        const t = await AsyncStorage.getItem('token');
        const id = await AsyncStorage.getItem('usuarioId');

        if (!t || !id) throw new Error('Faltan datos');

        setToken(t);
        setUsuarioId(parseInt(id));
      } catch (err) {
        console.warn('Token inválido o expirado. Redirigiendo a login...');
        await AsyncStorage.clear();
        router.replace('/inicio-sesion');
      } finally {
        setCargandoToken(false);
      }
    };

    cargarToken();
  }, []);

  // Esta función solo limpia token y redirige
  const cerrarSesion = async () => {
    await AsyncStorage.clear();
    setToken(null);
    setUsuarioId(null);
    router.replace('/inicio-sesion');
  };

  return { token, usuarioId, cargandoToken, cerrarSesion };
};
