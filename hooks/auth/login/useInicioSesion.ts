import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useInicioSesion = () => {
  const router = useRouter();

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
      // Simula una llamada a API
      await new Promise((res) => setTimeout(res, 1500));

      // Simula éxito → guarda el "token"
      await AsyncStorage.setItem('token', 'usuario_logueado');

      // Redirige a la pantalla principal
      router.replace('/pantalla-principal');
    } catch (e) {
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
