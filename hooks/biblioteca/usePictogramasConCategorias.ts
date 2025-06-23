import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import { PictogramaConCategorias } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const usePictogramasConCategorias = () => {
  const { token, usuarioId, cargandoToken } = useAutorizarAcceso();
  const [pictogramas, setPictogramas] = useState<PictogramaConCategorias[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filtrarUnicosPorId = (arr: PictogramaConCategorias[]) => {
    return arr.filter((item, index, self) =>
      index === self.findIndex((p) => p.id === item.id)
    );
  };

  const cargarPictogramas = useCallback(async () => {
    if (!token || !usuarioId) return;

    try {
      setCargando(true);

      const [generalesRes, personalizadosRes, ocultosRes] = await Promise.all([
        axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas/usuarios/${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas-ocultos/usuario/${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const generales: PictogramaConCategorias[] = generalesRes.data ?? [];
const personalizados: PictogramaConCategorias[] = personalizadosRes.data ?? [];
const ocultos: PictogramaConCategorias[] = ocultosRes.data ?? [];

      const idsOcultos = new Set(ocultos.map(p => p.id));
      const todos = [...generales, ...personalizados];
      const unicos = filtrarUnicosPorId(todos);
      const visibles = unicos.filter(p => !idsOcultos.has(p.id));

      setPictogramas(visibles);
    } catch (err: any) {
      console.error('❌ Error al cargar pictogramas:', err.message);
      setError('No se pudieron cargar los pictogramas');
    } finally {
      setCargando(false);
    }
  }, [token, usuarioId]);

  useEffect(() => {
    if (!cargandoToken) cargarPictogramas();
  }, [cargarPictogramas, cargandoToken]);

  return { pictogramas, cargando, error, cargarPictogramas };
};
