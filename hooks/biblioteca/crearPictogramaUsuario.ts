import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export async function crearPictogramaUsuario(
  nombre: string,
  imagen: string,
  tipo: 'verbo' | 'sustantivo',
  categorias: number[],
  token: string,
  nombreEn?: string
) {
  const payload = {
    nombre,
    imagen,
    tipo,
    categorias,
    traducciones: nombreEn?.trim() ? { en: nombreEn.trim() } : {},
  };

  const response = await axios.post(
    `${API_BASE_URL}/pictogramas/yo`, 
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  );

  return response.data;
}
