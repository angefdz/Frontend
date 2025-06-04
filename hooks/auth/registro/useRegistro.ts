import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useRegistro = () => {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarRegistro = async () => {
    if (!nombre || !correo || !contrasena || !confirmacion) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (contrasena !== confirmacion) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setError('');
    setCargando(true);

    try {
      const response = await fetch('http://192.168.1.216:8080/auth/register', {
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
        const errorData = await response.json();
        setError(errorData || 'Error en el registro');
        setCargando(false);
        return;
      }

      // Registro exitoso
      setCargando(false);
      router.replace('/inicio-sesion');
    } catch (e) {
      setError('Error en la conexión con el servidor');
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
