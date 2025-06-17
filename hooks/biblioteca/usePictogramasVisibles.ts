// src/hooks/pictogramas/usePictogramasVisibles.ts

import { useAuth } from '@/context/AuthContext'; // ✅ CAMBIO
import { PictogramaConCategorias, PictogramaSimple } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePictogramasVisibles = () => {
  const { token } = useAuth(); // ✅ CAMBIO
  const [pictogramas, setPictogramas] = useState<PictogramaSimple[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarPictogramas = useCallback(async () => {
    console.log('[usePictogramasVisibles] Intentando cargar pictogramas...');
    if (!token) {
      console.warn('[usePictogramasVisibles] Token no disponible, abortando carga.');
      setCargando(false);
      setError('Token no disponible');
      return;
    }

    try {
      setCargando(true);
      const res = await axios.get<PictogramaConCategorias[]>(`${API_BASE_URL}/pictogramas`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('[usePictogramasVisibles] Respuesta del endpoint:', res);

      if (!Array.isArray(res.data)) {
        throw new Error('La respuesta no es un array: ' + JSON.stringify(res.data));
      }

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
      setPictogramas([]);
    } finally {
      setCargando(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      console.log('[usePictogramasVisibles] Token cargado, ejecutando carga...');
      cargarPictogramas();
    }
  }, [token, cargarPictogramas]);

  return { pictogramas, cargando, error, recargar: cargarPictogramas };
};
