import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import { useState } from 'react';
import { predecirSiguientePictograma } from './../utils/prediccion';

export const useFrase = () => {
  const [frase, setFrase] = useState<string[]>([]);
  const [sugerencia, setSugerencia] = useState<string | null>(null);

  const añadirPictograma = (palabra: string) => {
    const nuevaFrase = [...frase, palabra];
    setFrase(nuevaFrase);
    actualizarSugerencia(nuevaFrase);
  };

  const borrarUltimo = () => {
    const nuevaFrase = frase.slice(0, -1);
    setFrase(nuevaFrase);
    actualizarSugerencia(nuevaFrase);
  };

  const resetearFrase = () => {
    setFrase([]);
    setSugerencia(null);
  };

  const reproducirFrase = async () => {
    const texto = frase.join(' ');
    if (texto) {
      const voz = await AsyncStorage.getItem('voz');

      let options: Speech.SpeechOptions = {
        language: 'es-ES',
        rate: 1,
        pitch: 1,
      };

      switch (voz) {
        case 'masculina':
          options.pitch = 0.9;
          break;
        case 'infantil':
          options.pitch = 1.4;
          break;
        case 'robot':
          options.rate = 0.8;
          options.pitch = 0.7;
          break;
        default:
          options.pitch = 1.2; // femenina o por defecto
          break;
      }

      Speech.speak(texto, options);
    }
  };

  const actualizarSugerencia = (fraseActual: string[]) => {
    const sugerido = predecirSiguientePictograma(fraseActual);
    setSugerencia(sugerido);
  };

  const usarSugerencia = () => {
    if (sugerencia) {
      añadirPictograma(sugerencia);
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
