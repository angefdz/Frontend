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

        // Aquí puedes hacer una verificación opcional del JWT con una llamada al backend si quieres
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

  return { token, usuarioId, cargandoToken };
};
