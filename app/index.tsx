import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { token, cargandoToken } = useAutorizarAcceso();

  useEffect(() => {
    if (!cargandoToken) {
      if (token) {
        router.replace('/(tabs)/pantalla-principal');
      } else {
        router.replace('/inicio-sesion');
      }
    }
  }, [token, cargandoToken]);

  if (cargandoToken) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
