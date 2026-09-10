import { useAuth } from '@/context/AuthContext';
import { Alert } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';

interface CambiarPasswordPayload {
  passwordActual: string;
  nuevaPassword: string;
  confirmarPassword: string;
}

export const useCambiarPassword = () => {
  const { language } = useLanguage();
  const { token } = useAuth(); 

  const cambiarPassword = async ({
    passwordActual,
    nuevaPassword,
    confirmarPassword,
  }: CambiarPasswordPayload): Promise<boolean> => {
    if (!token) {
      Alert.alert('Error', language === 'en' ? 'You are not signed in.' : 'No estás autenticada.');
      return false;
    }

    if (!passwordActual || !nuevaPassword || !confirmarPassword) {
      Alert.alert('Error', language === 'en' ? 'Please complete all fields.' : 'Por favor, completa todos los campos.');
      return false;
    }

    if (nuevaPassword !== confirmarPassword) {
      Alert.alert('Error', language === 'en' ? 'The new passwords do not match.' : 'La nueva contraseña no coincide con la confirmación.');
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
        Alert.alert(language === 'en' ? 'Password updated' : 'Contraseña actualizada', language === 'en' ? 'Your password has been changed.' : 'Tu contraseña ha sido cambiada correctamente.');
        return true;
      } else {
        const error = await response.text();
        Alert.alert('Error', error || 'No se pudo cambiar la contraseña.');
        return false;
      }
    } catch (error) {
      Alert.alert('Error', language === 'en' ? 'There was a problem changing your password.' : 'Ocurrió un problema al cambiar la contraseña.');
      return false;
    }
  };

  return { cambiarPassword };
};
