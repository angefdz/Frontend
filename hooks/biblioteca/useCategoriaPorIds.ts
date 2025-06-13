import { CategoriaSimple } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export function useCategoriasPorIds(ids: number[], token: string | null) {
  const [categorias, setCategorias] = useState<CategoriaSimple[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length || !token) {
      setCategorias([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${API_BASE_URL}/categorias/por-ids`,
          ids,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategorias(response.data);
      } catch (err) {
        console.error('❌ Error al obtener categorías por IDs:', err);
        setError('No se pudieron cargar las categorías seleccionadas.');
        setCategorias([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ids, token]);

  return { categorias, loading, error };
}
