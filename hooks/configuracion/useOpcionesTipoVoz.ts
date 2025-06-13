import axios from 'axios';
import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const useOpcionesTipoVoz = (token: string | null) => {
  const [opciones, setOpciones] = useState<{ label: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    const fetchOpciones = async () => {
      try {
        const res = await axios.get<string[]>(`${API_BASE_URL}/configuraciones/tipos-voz`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const opcionesFormateadas = res.data.map((valor) => ({
          label: valor.charAt(0).toUpperCase() + valor.slice(1),
          value: valor,
        }));

        setOpciones(opcionesFormateadas);
      } catch (err) {
        setError('Error al cargar las opciones de voz');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOpciones();
  }, [token]);

  return { opciones, loading, error };
};
