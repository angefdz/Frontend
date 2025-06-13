import { Pictograma } from '@/types';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePictogramas = () => {
  const [pictogramas, setPictogramas] = useState<Pictograma[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargarPictogramas = useCallback(async () => {
    try {
      setCargando(true);
      console.log('📥 Solicitando pictogramas desde:', `${API_BASE_URL}/pictogramas`);
      const res = await axios.get(`${API_BASE_URL}/pictogramas`);
      setPictogramas(res.data);
      console.log('✅ Pictogramas cargados correctamente:', res.data);
    } catch (e: any) {
      console.error('❌ Error cargando pictogramas:', e.message);
      setError('No se pudieron cargar los pictogramas');
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarPictogramas();
  }, [cargarPictogramas]);

  return { pictogramas, cargando, error, cargarPictogramas };
};
