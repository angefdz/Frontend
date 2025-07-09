import { useAuth } from '@/context/AuthContext';
import { Pictograma } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePictogramas = () => {
  const { token } = useAuth();
  const [pictogramas, setPictogramas] = useState<Pictograma[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarPictogramas = useCallback(async () => {
    if (!token) {
      setError('Token no disponible');
      return;
    }

    try {
      setCargando(true);
      const res = await axios.get(`${API_BASE_URL}/pictogramas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPictogramas(res.data);
    } catch (e: any) {
      console.error('Error cargando pictogramas:', e.message);
      setError('No se pudieron cargar los pictogramas');
    } finally {
      setCargando(false);
    }
  }, [token]);

  useEffect(() => {
    cargarPictogramas();
  }, [cargarPictogramas]);

  return { pictogramas, cargando, error, cargarPictogramas };
};
