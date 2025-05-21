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

  const reproducirFrase = () => {
    const texto = frase.join(' ');
    if (texto) {
      Speech.speak(texto);
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
