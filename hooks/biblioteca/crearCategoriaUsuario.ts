import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const crearCategoriaUsuario = async (
  nombre: string,
  imagen: string,
  usuarioId: number,
  pictogramas: number[],
  token: string
) => {
  const payload = {
    nombre,
    imagen,
    usuarioId,
    pictogramas,
  };

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  console.log('📦 Payload enviado:', JSON.stringify(payload, null, 2));
  console.log('📬 Headers enviados:', headers);
  console.log('🌐 URL:', `${API_BASE_URL}/categorias/usuario`);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/categorias/usuario`,
      payload,
      { headers }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error al crear la categoría:', error.response?.data);
      throw error; 
    } else {
      console.error('Error desconocido:', error);
      throw error;
    }
  }
};
