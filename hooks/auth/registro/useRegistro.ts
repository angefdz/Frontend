import { useRouter } from 'expo-router';
import { useState } from 'react';

// Asegúrate de que esta variable de entorno esté configurada en tu proyecto Expo
// Por ejemplo, en un archivo .env o en app.config.js de Expo
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
      // Usamos API_BASE_URL para construir la URL de registro
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email: correo, // Asegúrate de que tu backend espera 'email' y no 'correo'
          contrasena,
        }),
      });

      if (!response.ok) {
        try {
          const errorData = await response.json();
          const errorMessage = errorData.message ?? errorData.error ?? JSON.stringify(errorData);
          
          setError(errorMessage);
        } catch (jsonError) {
          console.error('❌ Error al parsear JSON del servidor:', jsonError);
          setError(`Error ${response.status}: ${response.statusText}`);
        }
        setCargando(false);
        return;
      }
      

      // Registro exitoso
      setCargando(false);
      router.replace('/inicio-sesion');
    } catch (e) {
      // Manejo de errores de red o cualquier otra excepción durante la petición
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