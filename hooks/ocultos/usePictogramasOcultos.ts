// src/hooks/ocultos/usePictogramasOcultos.ts
import { PictogramaConCategorias } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePictogramasOcultos = () => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [pictogramas, setPictogramas] = useState<PictogramaConCategorias[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!token) return;
    setCargando(true);
    try {
      const res = await axios.get(
        `${API_BASE_URL}/pictogramas-ocultos/usuario`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPictogramas(res.data);
      setError(null);
    } catch (err: any) {
      console.error('❌ Error al cargar pictogramas ocultos:', err);
      setError('No se pudieron cargar los pictogramas');
    } finally {
      setCargando(false);
    }
  }, [token]);

  useEffect(() => {
    if (!cargandoToken && token) {
      fetch();
    }
  }, [token, cargandoToken, fetch]);

  return {
    pictogramas,
    cargando,
    error,
    recargarPictogramas: fetch,
  };
};
