import { PictogramaSimple } from '@/types'; // Asegúrate de que este tipo está definido
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export function usePictogramasPorIds(ids: number[], token: string | null) {
  const [pictogramas, setPictogramas] = useState<PictogramaSimple[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ids.length || !token) {
      setPictogramas([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${API_BASE_URL}/pictogramas/por-ids`,
          ids,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPictogramas(response.data);
      } catch (err) {
        console.error('❌ Error al obtener pictogramas por IDs:', err);
        setError('No se pudieron cargar los pictogramas seleccionados.');
        setPictogramas([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ids, token]);

  return { pictogramas, loading, error };
}
