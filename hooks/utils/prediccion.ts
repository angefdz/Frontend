import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAutorizarAcceso } from '../auth/autorizacion/useAutorizarAcceso';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePrediccionPictograma = (pictogramaIds: number[], lemas: string[], texto: string, idioma: 'es' | 'en') => {
  const { token, cargandoToken } = useAutorizarAcceso();
  const [sugerenciasIds, setSugerenciasIds] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [contextoResuelto, setContextoResuelto] = useState('');
  const pictogramasSerializados = pictogramaIds.join(',');
  const lemasSerializados = lemas.join('\u001f');
  const tienePictogramas = pictogramasSerializados.length > 0;
  const contextoActual = `${idioma}:${pictogramasSerializados}`;

  useEffect(() => {
    let vigente = true;
    const predecir = async () => {
      if (!token || cargandoToken || !tienePictogramas) {
        setSugerenciasIds([]);
        setContextoResuelto(!tienePictogramas ? contextoActual : '');
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/prediccion`, {
          params: {
            pictogramas: pictogramasSerializados,
            lemas: lemasSerializados,
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
        setContextoResuelto(contextoActual);
        setError(null);
      } catch {
        if (!vigente) return;
        setSugerenciasIds([]);
        setContextoResuelto(contextoActual);
        setError('No se pudo predecir el pictograma');
      }
    };

    predecir();
    return () => { vigente = false; };
  }, [pictogramasSerializados, lemasSerializados, texto, idioma, token, cargandoToken, contextoActual, tienePictogramas]);

  const cargando = tienePictogramas && contextoResuelto !== contextoActual;
  return { sugerenciasIds, error, cargando };
};
