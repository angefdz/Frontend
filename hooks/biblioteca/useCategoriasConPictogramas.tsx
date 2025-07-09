import { CategoriaConPictogramas } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const useCategoriasConPictogramas = () => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [categorias, setCategorias] = useState<CategoriaConPictogramas[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarCategorias = useCallback(async () => {
    if (!token) return;

    setCargando(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/categorias/con-pictogramas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(res.data);
    } catch (err: any) {
      console.error('Error al cargar categorías con pictogramas:', err);
      setError('No se pudieron cargar las categorías');
    } finally {
      setCargando(false);
    }
  }, [token]); 

  useEffect(() => {
    if (!cargandoToken && token) {
      cargarCategorias();
    }
  }, [token, cargandoToken, cargarCategorias]);

  return { categorias, cargando, error, recargar: cargarCategorias };
};
