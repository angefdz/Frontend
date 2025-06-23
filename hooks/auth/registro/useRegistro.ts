import { useRouter } from 'expo-router';
import { useState } from 'react';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const useRegistro = () => {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const esCorreoValido = (correo: string) => {
    const regexRFC5322 = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/;
    return regexRFC5322.test(correo);
  };

  const manejarRegistro = async () => {
    if (!nombre || !correo || !contrasena || !confirmacion) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (!esCorreoValido(correo)) {
      setError('El correo no tiene un formato válido.');
      return;
    }
    if (contrasena !== confirmacion) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');
    setCargando(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email: correo,
          contrasena,
        }),
      });

      if (!response.ok) {
        let mensajeError = 'Error desconocido';
        try {
          const json = await response.json();
          mensajeError = json.error || json.message || JSON.stringify(json);
        } catch {
          const text = await response.text();
          mensajeError = text;
        }
        setError(mensajeError);
        setCargando(false);
        return;
      }

      setCargando(false);
      router.replace('/inicio-sesion');
    } catch (e) {
      console.error('Error en la conexión con el servidor:', e);
      setError('Error en la conexión con el servidor. Por favor, intenta de nuevo.');
      setCargando(false);
    }
  };

  const manejarVolver = () => {
    router.replace('/inicio-sesion');
  };

  return {
    nombre,
    correo,
    contrasena,
    confirmacion,
    error,
    cargando,
    setNombre,
    setCorreo,
    setContrasena,
    setConfirmacion,
    manejarRegistro,
    manejarVolver,
  };
};
