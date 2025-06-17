import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { PictogramaSimple } from '@/types';
import { usePrediccionPictograma } from '../utils/prediccion';

export const useFrase = (pictogramasDisponibles: PictogramaSimple[]) => {
  const pictogramaHola = pictogramasDisponibles.find(
    p => p.nombre.toLowerCase() === 'hola'
  );

  const [frase, setFrase] = useState<string[]>([]);
  const [sugerencia, setSugerencia] = useState<PictogramaSimple>(
    pictogramaHola!
  );

  const { sugerencia: sugerenciaTexto } = usePrediccionPictograma(frase);

  useEffect(() => {
    if (!sugerenciaTexto || frase.length === 0) {
      setSugerencia(pictogramaHola!);
      return;
    }

    const sugerido = pictogramasDisponibles.find(
      p => p.nombre.toLowerCase() === sugerenciaTexto.toLowerCase()
    );

    setSugerencia(sugerido ?? pictogramaHola!);
  }, [frase, sugerenciaTexto, pictogramasDisponibles]);

  const añadirPictograma = (palabra: string) => {
    setFrase(prev => {
      const nuevaPalabra =
        prev.length === 0
          ? palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
          : palabra.toLowerCase();
      return [...prev, nuevaPalabra];
    });
  };

  const borrarUltimo = () => {
    setFrase(prev => prev.slice(0, -1));
  };

  const resetearFrase = () => {
    setFrase([]);
  };

  const reproducirFrase = async () => {
    const texto = frase.join(' ');
    if (!texto) return;

    try {
      await Speech.stop();
      Speech.speak(texto, {
        language: 'es-ES',
        rate: 1,
        pitch: 1.1,
      });

      Toast.show({
        type: 'success',
        text1: 'Frase guardada',
        visibilityTime: 1500,
        position: 'bottom',
      });
    } catch (error) {
      console.error('❌ Error al reproducir frase:', error);
      Toast.show({
        type: 'error',
        text1: 'Error al reproducir la frase',
      });
    }
  };

  const usarSugerencia = () => {
    if (sugerencia) {
      añadirPictograma(sugerencia.nombre);
    }
  };

  return {
    frase,
    sugerencia,
    añadirPictograma,
    borrarUltimo,
    resetearFrase,
    reproducirFrase,
    usarSugerencia,
  };
};
