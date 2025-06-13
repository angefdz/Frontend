import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import { CategoriaConPictogramas } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

export const useCategoriasConPictogramas = () => {
  const { token, usuarioId, cargandoToken } = useAutorizarAcceso();
  const [categorias, setCategorias] = useState<CategoriaConPictogramas[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarCategorias = useCallback(async () => {
    if (!token || !usuarioId) return;
    try {
      setCargando(true);
      const [generalesRes, usuarioRes] = await Promise.all([
        axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/categorias`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/categorias/usuarios/${usuarioId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const generales = generalesRes.data || [];
      const personalizadas = usuarioRes.data || [];

      // ✅ Eliminar duplicados por ID
      const todos = [...generales, ...personalizadas];
      const unicas = todos.filter(
        (cat, index, self) => index === self.findIndex((c) => c.id === cat.id)
      );

      setCategorias(unicas);
    } catch (err: any) {
      console.error('❌ Error al cargar categorías:', err.message);
      setError('No se pudieron cargar las categorías');
    } finally {
      setCargando(false);
    }
  }, [token, usuarioId]);

  useEffect(() => {
    if (!cargandoToken) cargarCategorias();
  }, [cargarCategorias, cargandoToken]);

  return { categorias, cargando, error, cargarCategorias };
};
