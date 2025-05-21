import { router } from 'expo-router';
import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    const estaLogueado = false;

    if (estaLogueado) {
      router.replace('/(tabs)/pantalla-principal');
    } else {
      router.replace('/inicio-sesion');
    }
  }, []);

  return null;
}
