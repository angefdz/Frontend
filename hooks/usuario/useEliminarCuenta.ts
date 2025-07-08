import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

export const useEliminarCuenta = () => {
  const router = useRouter();
  const { token, cerrarSesion } = useAutorizarAcceso();

  const eliminarCuenta = () => {
    Alert.alert(
      'Eliminar cuenta',
      '¿Estás segura de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_BASE_URL}/usuarios/me`,
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 204) {
                Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente.');
                cerrarSesion(); 
                router.replace('/inicio-sesion');
              } else {
                Alert.alert('Error', 'No se pudo eliminar la cuenta.');
              }
            } catch (error) {
              console.error('Error al eliminar cuenta:', error);
              Alert.alert('Error', 'Hubo un problema al eliminar la cuenta.');
            }
          },
        },
      ]
    );
  };

  return { eliminarCuenta };
};
