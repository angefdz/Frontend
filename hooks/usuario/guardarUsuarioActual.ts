import axios from '@/hooks/utils/axiosInstance';
import { UsuarioSimple } from '@/types';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const guardarUsuarioActual = async (
  token: string,
  usuario: UsuarioSimple
) => {
  if (!token) {
    throw new Error('Token no disponible para actualizar el usuario');
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/usuarios/yo`,
      usuario,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al actualizar datos del usuario:', error);
    throw error;
  }
};
