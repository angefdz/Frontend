// src/hooks/pictogramas/usePictogramasVisibles.ts

import { PictogramaConCategorias, PictogramaSimple } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePictogramasVisibles = () => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [pictogramas, setPictogramas] = useState<PictogramaSimple[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarPictogramas = useCallback(async () => {
    if (!token) return;

    try {
      setCargando(true);
      const res = await axios.get<PictogramaConCategorias[]>(`${API_BASE_URL}/pictogramas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mapea para devolver solo propiedades de PictogramaSimple
      const pictogramasSimples: PictogramaSimple[] = res.data.map(p => ({
        id: p.id,
        nombre: p.nombre,
        imagen: p.imagen,
        tipo: p.tipo
      }));

      setPictogramas(pictogramasSimples);
      setError(null);
    } catch (err: any) {
      console.error('❌ Error al cargar pictogramas visibles:', err);
      setError('Error al cargar los pictogramas visibles');
    } finally {
      setCargando(false);
    }
  }, [token]);

  useEffect(() => {
    if (!cargandoToken && token) {
      cargarPictogramas();
    }
  }, [cargandoToken, token, cargarPictogramas]);

  return { pictogramas, cargando, error, recargar: cargarPictogramas };
};
