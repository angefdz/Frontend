// src/hooks/categorias/useCategoriasDePictograma.ts
import { CategoriaSimple } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const useCategoriasDePictograma = (pictogramaId: number | null) => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [categorias, setCategorias] = useState<CategoriaSimple[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pictogramaId || !token || cargandoToken) return;

    const fetch = async () => {
      setCargando(true);
      try {
        const res = await axios.get(
          `${API_BASE_URL}/categorias/pictograma/${pictogramaId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategorias(res.data);
        setError(null);
      } catch (err: any) {
        console.error('❌ Error al obtener categorías del pictograma:', err);
        setError('No se pudieron cargar las categorías');
      } finally {
        setCargando(false);
      }
    };

    fetch();
  }, [pictogramaId, token, cargandoToken]);

  return { categorias, cargando, error };
};
