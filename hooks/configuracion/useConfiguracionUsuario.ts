
import axiosInstance from '@/hooks/utils/axiosInstance';
import { Configuracion } from '@/types';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;



interface UseConfiguracionUsuarioResult {
  configuracion: Configuracion | null;
  cargandoConfiguracion: boolean;
  errorConfiguracion: string | null;
  recargarConfiguracion: () => void;
}

export const useConfiguracionUsuario = (
  token: string | null
): UseConfiguracionUsuarioResult => {
  const [configuracion, setConfiguracion] = useState<Configuracion | null>(null);
  const [cargandoConfiguracion, setCargandoConfiguracion] = useState(true);
  const [errorConfiguracion, setErrorConfiguracion] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const recargarConfiguracion = () => setRefetchIndex(prev => prev + 1);

  useEffect(() => {
    const fetchConfiguracion = async () => {
      if (!token) {
        console.log('⚠️ No hay token disponible. No se carga la configuración.');
        setCargandoConfiguracion(false);
        return;
      }

      setCargandoConfiguracion(true);
      setErrorConfiguracion(null);

      try {
        const response = await axiosInstance.get<Configuracion>(
          `${API_BASE_URL}/configuraciones/usuario/yo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConfiguracion(response.data);
        console.log('Configuración cargada con éxito.');
      } catch (err) {
        console.error('Error al cargar la configuración:', err);
        if (isAxiosError(err) && err.response) {
          setErrorConfiguracion(
            `Error ${err.response.status}: ${
              err.response.data?.message ?? 'No se pudo cargar la configuración.'
            }`
          );
        } else {
          setErrorConfiguracion('Error inesperado al cargar la configuración.');
        }
        setConfiguracion(null);
      } finally {
        setCargandoConfiguracion(false);
      }
    };

    fetchConfiguracion();
  }, [token, refetchIndex]);

  return {
    configuracion,
    cargandoConfiguracion,
    errorConfiguracion,
    recargarConfiguracion,
  };
};
