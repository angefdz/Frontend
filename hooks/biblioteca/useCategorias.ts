
import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import { Categoria } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const useCategorias = () => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cargandoToken || !token) return;

    const cargarCategorias = async () => {
      try {
        const res = await axios.get(`${process.env.EXPO_PUBLIC_API_BASE_URL}/categorias`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategorias(res.data);
      } catch (err: any) {
        console.error('Error al cargar categorías generales:', err.message);
        setError('No se pudieron cargar las categorías generales');
      } finally {
        setCargando(false);
      }
    };

    cargarCategorias();
  }, [token, cargandoToken]);

  return { categorias, cargando, error };
};
