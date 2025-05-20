import { useRouter } from 'expo-router';
import { useState } from 'react';

export const useInicioSesion = () => {
  const router = useRouter();
  
  // Estado para los campos del formulario
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Manejadores de cambios en los inputs
  const manejarCambioCorreo = (texto: string) => {
    setCorreo(texto);
    setError(''); // Limpiar error cuando el usuario escribe
  };

  const manejarCambioContrasena = (texto: string) => {
    setContrasena(texto);
    setError(''); // Limpiar error cuando el usuario escribe
  };

  // Validación del formulario
  const validarFormulario = () => {
    if (!correo.trim()) {
      setError('El correo es requerido');
      return false;
    }
    if (!contrasena.trim()) {
      setError('La contraseña es requerida');
      return false;
    }
    return true;
  };

  // Manejador de inicio de sesión
  const manejarInicioSesion = async () => {
    if (!validarFormulario()) return;

    setCargando(true);
    setError('');

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular inicio de sesión exitoso
      router.replace('/');
    } catch (err) {
      setError('Error al iniciar sesión. Por favor, intente de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  // Manejador de inicio de sesión con Google (placeholder)
  const manejarInicioSesionGoogle = () => {
    // TODO: Implementar inicio de sesión con Google
    console.log('Inicio de sesión con Google clickeado');
  };

  // Manejador de olvidé mi contraseña
  const manejarOlvideContrasena = () => {
    // TODO: Implementar flujo de recuperación de contraseña
    console.log('Olvidé mi contraseña clickeado');
  };

  return {
    // Estado
    correo,
    contrasena,
    cargando,
    error,
    
    // Manejadores
    manejarCambioCorreo,
    manejarCambioContrasena,
    manejarInicioSesion,
    manejarInicioSesionGoogle,
    manejarOlvideContrasena,
  };
}; 