import { useAuth } from '@/context/AuthContext';
import axios from '@/hooks/utils/axiosInstance';
import { useEffect, useState } from 'react';

export interface UsuarioSimple {
  id: number;
  correo: string;
  nombre: string;
}

export const useUsuarioActual = () => {
  const { token } = useAuth(); 
  const [usuario, setUsuario] = useState<UsuarioSimple | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsuario = async () => {
    if (!token) return;

    try {
      const res = await axios.get('/usuarios/yo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuario(res.data);
      setError(null);
    } catch (err) {
      setError('No se pudo cargar el usuario');
      setUsuario(null);
      console.error(err);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsuario();
    }
  }, [token]); 

  return { usuario, cargando, error, recargarUsuario: fetchUsuario };
};
