import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

interface CategoriaActualizarInput {
  nombre: string;
  imagen: string;
  pictogramas: number[]; 
}

export function useActualizarCategoria() {
  const { token } = useAutorizarAcceso();

  const actualizarCategoria = async (categoriaId: string | number, datos: CategoriaActualizarInput) => {
    if (!token) {
      throw new Error('No se encontró el token de autenticación.');
    }

    await axios.put(`${API_BASE_URL}/categorias/${categoriaId}`, datos, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return { actualizarCategoria };
}
