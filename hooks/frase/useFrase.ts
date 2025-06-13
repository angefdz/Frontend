// useFrase.ts
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { VOICES } from '@/data/vozOpciones';
import { predecirSiguientePictograma } from './../utils/prediccion';

export const useFrase = (tipoVoz: 'masculina' | 'femenina' = 'femenina') => {
  const [frase, setFrase] = useState<string[]>([]);
  const [sugerencia, setSugerencia] = useState<string | null>(null);

  useEffect(() => {
    // Si quieres, aquí podrías resetear la frase o hacer algo cuando tipoVoz cambie
  }, [tipoVoz]);

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
    if (!texto) return;

    const vozIdDeseada = VOICES[tipoVoz];

    try {
      const vocesDisponibles = await Speech.getAvailableVoicesAsync();
      const vozValida = vocesDisponibles.find((v) => v.identifier === vozIdDeseada);

      const options: Speech.SpeechOptions = {
        language: 'es-ES',
        rate: 1,
        pitch: tipoVoz === 'masculina' ? 0.9 : 1.2,
        ...(vozValida && { voice: vozValida.identifier }),
      };

      console.log('🗣️ Reproduciendo frase:', texto);
      console.log('🎤 Tipo de voz:', tipoVoz);
      console.log('🎧 Voz aplicada:', vozValida?.identifier ?? '(predeterminada)');

      Speech.speak(texto, options);

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
        text2: 'Intenta de nuevo o revisa la voz seleccionada.',
      });
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
