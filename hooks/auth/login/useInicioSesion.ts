import { guardarCredenciales } from '@/hooks/utils/seguridad';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { useAuth } from '@/context/AuthContext'; // <-- Importa el hook global de autenticación
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const useInicioSesion = () => {
  const router = useRouter();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();
  const { marcarPictogramasComoDesactualizados } = usePictogramasContext();
  const { setAuthData } = useAuth(); // <-- Hook para actualizar contexto global

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

      // Actualiza el contexto global para que todas las pantallas usen el token actualizado
      setAuthData({ token, usuarioId });

      // Marca categorías y pictogramas como desactualizados para recarga
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

  const manejarInicioSesionGoogle = () => {
    console.log('Google login (a implementar)');
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
