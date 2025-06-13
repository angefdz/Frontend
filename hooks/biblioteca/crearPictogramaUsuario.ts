import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function crearPictogramaUsuario(
  nombre: string,
  imagen: string,
  tipo: 'verbo' | 'sustantivo',
  usuarioId: number,
  categorias: number[],
  token: string
) {
  const payload = {
    nombre,
    imagen,
    tipo,
    categorias,
  };

  const response = await axios.post(
    `${API_BASE_URL}/pictogramas/usuarios/${usuarioId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
}
