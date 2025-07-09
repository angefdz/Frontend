import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useRecuperarContrasena = () => {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  const manejarCambioCorreo = (texto: string) => {
    setCorreo(texto);
    setError('');
    setMensaje('');
  };

  const manejarRecuperar = async () => {
    if (!correo.trim()) {
      setError('El correo electrónico es obligatorio.');
      return;
    }

    setCargando(true);
    setError('');
    setMensaje('');

    await new Promise((res) => setTimeout(res, 1500));
    setCargando(false);
    setMensaje('Si el correo existe, se ha enviado un enlace de recuperación.');
  };

  const manejarVolver = () => {
    router.replace('/inicio-sesion');
  };

  return {
    correo,
    mensaje,
    error,
    cargando,
    manejarCambioCorreo,
    manejarRecuperar,
    manejarVolver,
  };
};
