import { PictogramaSimple } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePictogramasPorCategoria = (categoriaId: string | null) => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [pictogramas, setPictogramas] = useState<PictogramaSimple[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargarPictogramas = useCallback(async () => {
    if (cargando || !token || !categoriaId) return;

    try {
      setCargando(true);
      console.log('Cargando pictogramas para categoría:', categoriaId);
      const res = await axios.get(`${API_BASE_URL}/pictogramas/por-categoria/${categoriaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPictogramas(res.data);
      setError(null);
    } catch (err: any) {
      console.error('Error al cargar pictogramas por categoría:', err.message);
      setError('No se pudieron cargar los pictogramas');
    } finally {
      setCargando(false);
    }
  }, [token, categoriaId]); 

  useEffect(() => {
    if (!cargandoToken && token && categoriaId) {
      cargarPictogramas();
    }
  }, [cargandoToken, token, categoriaId, cargarPictogramas]);

  return { pictogramas, cargando, error, recargar: cargarPictogramas };
};
