import axios from '@/hooks/utils/axiosInstance';

export const guardarFrase = async (token: string, texto: string) => {
  try {
    const response = await axios.post(
      `${process.env.EXPO_PUBLIC_API_BASE_URL}/frases`,
      { texto }, // Solo enviamos el campo texto
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('❌ Error al guardar la frase:', error);
    throw error;
  }
};
