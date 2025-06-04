import { Pictograma } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const usePictogramas = () => {
  const [pictogramas, setPictogramas] = useState<Pictograma[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await axios.get('http://192.168.1.216:8080/pictogramas');
        setPictogramas(res.data);
      } catch (e) {
        console.error('Error cargando pictogramas:', e);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  return { pictogramas, cargando };
};
