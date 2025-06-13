import { PictogramaSimple } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePictogramasFiltrados = (categoriaId: string | null) => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [pictogramas, setPictogramas] = useState<PictogramaSimple[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cargandoToken || !token) return;

    const cargar = async () => {
      setCargando(true);
      try {
        let url = `${API_BASE_URL}/pictogramas`;
        if (categoriaId) url = `${API_BASE_URL}/pictogramas/por-categoria/${categoriaId}`;
        const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
        setPictogramas(res.data);
        setError(null);
      } catch (e: any) {
        setError('Error cargando pictogramas');
        console.error(e);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, [categoriaId, token, cargandoToken]);

  return { pictogramas, cargando, error };
};
