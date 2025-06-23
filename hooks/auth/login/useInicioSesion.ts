import { guardarCredenciales } from '@/hooks/utils/seguridad';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

import { useAuth } from '@/context/AuthContext';
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';
import { useLoginGoogle } from './useLoginGoogle';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const useInicioSesion = () => {
  const router = useRouter();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const { setAuthData } = useAuth();
  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();
  const { marcarPictogramasComoDesactualizados } = usePictogramasContext();

  // Hook de login con Google
  const { promptAsync, resultado } = useLoginGoogle();

  // Si el login con Google devuelve token y usuarioId, lo guardamos
  useEffect(() => {
    if (resultado) {
      const { token, usuarioId } = resultado;

      setAuthData({ token, usuarioId });
      guardarCredenciales(token, usuarioId);

      marcarCategoriasComoDesactualizadas();
      marcarPictogramasComoDesactualizados();

      router.replace('/pantalla-principal');
    }
  }, [resultado]);

  const manejarCambioCorreo = (texto: string) => {
    setCorreo(texto);
    setError('');
  };

  const manejarCambioContrasena = (texto: string) => {
    setContrasena(texto);
    setError('');
  };

  const manejarInicioSesion = async () => {
    if (!correo.trim() || !contrasena.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    setCargando(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo, contrasena }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const { token, usuarioId } = await response.json();

      await guardarCredenciales(token, usuarioId);
      setAuthData({ token, usuarioId });

      marcarCategoriasComoDesactualizadas();
      marcarPictogramasComoDesactualizados();

      router.replace('/pantalla-principal');
    } catch (e) {
      console.error('Error al iniciar sesión:', e);
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const manejarInicioSesionGoogle = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      setError('No se pudo iniciar sesión con Google.');
    }
  };

  const manejarOlvideContrasena = () => {
    router.push('/recuperar-contrasena');
  };

  const manejarIrARegistro = () => {
    router.push('/registro');
  };

  return {
    correo,
    contrasena,
    cargando,
    error,
    manejarCambioCorreo,
    manejarCambioContrasena,
    manejarInicioSesion,
    manejarInicioSesionGoogle,
    manejarOlvideContrasena,
    manejarIrARegistro,
  };
};
