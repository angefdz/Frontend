import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePrediccionPictograma = (frase: string[]) => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [sugerencia, setSugerencia] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const predecir = async () => {
      if (!token || cargandoToken || frase.length === 0) return;

      try {
        const texto = frase.join(' ');

        const response = await axios.get(`${API_BASE_URL}/prediccion`, {
          params: { frase: texto },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSugerencia(response.data); 
        setError(null);
      } catch (err: any) {
        console.error('Error al predecir pictograma:', err);
        setError('No se pudo predecir el pictograma');
      }
    };

    predecir();
  }, [frase, token, cargandoToken]);

  return { sugerencia, error };
};
