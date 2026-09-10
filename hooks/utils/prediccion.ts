import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePrediccionPictograma = (pictogramaIds: number[], lemas: string[], texto: string, idioma: 'es' | 'en') => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [sugerencia, setSugerencia] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const predecir = async () => {
      if (!token || cargandoToken || lemas.length === 0) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/prediccion`, {
          params: {
            pictogramas: pictogramaIds.join(','),
            lemas: lemas.join('\u001f'),
            texto,
            idioma,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSugerencia(response.data); 
        setError(null);
      } catch (err: any) {
        setError('No se pudo predecir el pictograma');
      }
    };

    predecir();
  }, [pictogramaIds.join(','), lemas.join('\u0000'), texto, idioma, token, cargandoToken]);

  return { sugerencia, error };
};
