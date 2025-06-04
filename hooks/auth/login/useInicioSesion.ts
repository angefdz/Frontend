import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAutorizarAcceso } from '../autorizacion/useAutorizarAcceso'; // Ajusta ruta

export const useInicioSesion = () => {
  const router = useRouter();
  const { guardarToken } = useAutorizarAcceso();  // IMPORTANTE: Usamos el hook aquí

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

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
      // Aquí llama al backend con el correo y contraseña reales, p.ej:
      const response = await fetch('http://192.168.1.216:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: correo, contrasena: contrasena }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas');
      }

      const token = await response.text();

      // Guarda el token usando el hook que creamos
      await guardarToken(token);

      // Redirige a la pantalla principal
      router.replace('/pantalla-principal');
    } catch (e) {
      setError('Error al iniciar sesión. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  // El resto igual...
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
