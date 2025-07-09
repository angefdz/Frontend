
import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const { token, cargandoAuth } = useAuth();

  useEffect(() => {
    if (!cargandoAuth) {
      if (token) {
        router.replace('/(tabs)/pantalla-principal');
      } else {
        router.replace('/inicio-sesion');
      }
    }
  }, [token, cargandoAuth]);

  if (cargandoAuth) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return null;
}
