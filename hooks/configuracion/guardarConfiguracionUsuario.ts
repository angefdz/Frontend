import { ConfiguracionPayload } from '@/types'; // importa el tipo desde tu archivo central
import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;


export const guardarConfiguracionUsuario = async (
  token: string,
  configuracion: ConfiguracionPayload
) => {
  if (!token) {
    throw new Error('Token no disponible para actualizar la configuración');
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/configuraciones/${configuracion.id}`,
      configuracion,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error al actualizar configuración del usuario:', error);
    throw error;
  }
};
