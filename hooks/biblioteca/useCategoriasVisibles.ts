// src/hooks/categorias/useCategoriasVisibles.ts

import { CategoriaSimple } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const useCategoriasVisibles = () => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [categorias, setCategorias] = useState<CategoriaSimple[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarCategorias = useCallback(async () => {
    if (!token) return;

    try {
      setCargando(true);
      const res = await axios.get(`${API_BASE_URL}/categorias/visibles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategorias(res.data);
    } catch (err: any) {
      setError('Error al cargar las categorías');
      console.error('❌ Error al cargar categorías visibles:', err);
    } finally {
      setCargando(false);
    }
  }, [token]);

  useEffect(() => {
    if (!cargandoToken && token) {
      cargarCategorias();
    }
  }, [cargandoToken, token, cargarCategorias]);

  return { categorias, cargando, error, recargar: cargarCategorias };
};
