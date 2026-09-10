import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePrediccionPictograma = (pictogramaIds: number[], lemas: string[], texto: string, idioma: 'es' | 'en') => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [sugerenciasIds, setSugerenciasIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let vigente = true;
    const predecir = async () => {
      if (!token || cargandoToken || pictogramaIds.length === 0) {
        setSugerenciasIds([]);
        return;
      }

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

        const ids = Array.isArray(response.data)
          ? response.data.filter((id): id is number => Number.isInteger(id)).slice(0, 3)
          : [];
        if (!vigente) return;
        setSugerenciasIds(ids);
        setError(null);
      } catch {
        if (!vigente) return;
        setSugerenciasIds([]);
        setError('No se pudo predecir el pictograma');
      }
    };

    predecir();
    return () => { vigente = false; };
  }, [pictogramaIds.join(','), lemas.join('\u0000'), texto, idioma, token, cargandoToken]);

  return { sugerenciasIds, error };
};
