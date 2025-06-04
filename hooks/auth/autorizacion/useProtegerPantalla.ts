import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useAutorizarAcceso } from './useAutorizarAcceso';

export const useProtegerPantalla = () => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const router = useRouter();

  useEffect(() => {
    if (!cargandoToken && token === null) {
      router.replace('/inicio-sesion');
    }
  }, [token, cargandoToken, router]);

  return { token, cargandoToken };
};
