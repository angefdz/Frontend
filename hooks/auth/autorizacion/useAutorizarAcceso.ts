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
        console.error('Error al cargar el token o el usuarioId:', err); 

        console.warn('Token inválido o expirado. Redirigiendo a login...');
        try {
          await AsyncStorage.clear();
        } catch (clearErr) {
          console.error('Error al limpiar AsyncStorage:', clearErr);
        }
        router.replace('/inicio-sesion');
      } finally {
        setCargandoToken(false);
      }
    };

    cargarToken();
  }, []);

  const cerrarSesion = async () => {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.error('Error al cerrar sesión limpiando AsyncStorage:', err);
    }
    setToken(null);
    setUsuarioId(null);
    router.replace('/inicio-sesion');
  };

  return { token, usuarioId, cargandoToken, cerrarSesion };
};
