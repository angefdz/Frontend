import { useAuth } from '@/context/AuthContext';
import { PictogramaConCategorias, PictogramaSimple } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePictogramasVisibles = () => {
  const { token } = useAuth(); 
  const [pictogramas, setPictogramas] = useState<PictogramaSimple[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarPictogramas = useCallback(async () => {
    if (!token) {
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

      

      const pictogramasSimples: PictogramaSimple[] = res.data.map(p => ({
        id: p.id,
        nombre: p.nombre,
        imagen: p.imagen,
        tipo: p.tipo,
        usuarioId: p.usuarioId??null
      }));

      setPictogramas(pictogramasSimples);
      setError(null);
    } catch (err: any) {
      setError('Error al cargar los pictogramas visibles');
      setPictogramas([]);
    } finally {
      setCargando(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      cargarPictogramas();
    }
  }, [token, cargarPictogramas]);

  return { pictogramas, cargando, error, recargar: cargarPictogramas };
};
