import { useAuth } from '@/context/AuthContext';
import { Alert } from 'react-native';

interface CambiarPasswordPayload {
  passwordActual: string;
  nuevaPassword: string;
  confirmarPassword: string;
}

export const useCambiarPassword = () => {
  const { token } = useAuth(); 

  const cambiarPassword = async ({
    passwordActual,
    nuevaPassword,
    confirmarPassword,
  }: CambiarPasswordPayload): Promise<boolean> => {
    if (!token) {
      Alert.alert('Error', 'No estás autenticada.');
      return false;
    }

    if (!passwordActual || !nuevaPassword || !confirmarPassword) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return false;
    }

    if (nuevaPassword !== confirmarPassword) {
      Alert.alert('Error', 'La nueva contraseña no coincide con la confirmación.');
      return false;
    }

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/cambiar-contrasena`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            contrasenaActual: passwordActual,
            nuevaContrasena: nuevaPassword,
          }),
        }
      );

      if (response.ok) {
        Alert.alert('Contraseña actualizada', 'Tu contraseña ha sido cambiada correctamente.');
        return true;
      } else {
        const error = await response.text();
        Alert.alert('Error', error || 'No se pudo cambiar la contraseña.');
        return false;
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      Alert.alert('Error', 'Ocurrió un problema al cambiar la contraseña.');
      return false;
    }
  };

  return { cambiarPassword };
};
