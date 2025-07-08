import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { useAuth } from '@/context/AuthContext';
import { useVoz } from '@/context/VozContext';
import { guardarFrase } from '@/hooks/frase/useGuardarFrase';
import { PictogramaSimple } from '@/types';
import { usePrediccionPictograma } from '../utils/prediccion';

export const useFrase = (pictogramasDisponibles: PictogramaSimple[]) => {
  const { tipoVoz } = useVoz();
  const { token } = useAuth();

  const pictogramaHola = pictogramasDisponibles.find(
    p => p.nombre.toLowerCase() === 'hola'
  );

  const [frase, setFrase] = useState<string[]>([]);
  const [sugerencia, setSugerencia] = useState<PictogramaSimple | undefined>(pictogramaHola);
  const [vozMasculina, setVozMasculina] = useState<string | undefined>();

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

  // Obtener voz masculina real si hace falta
  useEffect(() => {
    if (tipoVoz === 'masculina') {
      Speech.getAvailableVoicesAsync().then(voices => {
        const voz = voices.find(v =>
          v.language === 'es-ES' && v.name.toLowerCase().includes('male')
        );
        if (voz) setVozMasculina(voz.identifier);
        else if (voices.find(v => v.language === 'es-ES')) {
          setVozMasculina(voices.find(v => v.language === 'es-ES')!.identifier);
        }
      });
    }
  }, [tipoVoz]);

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
    if (!texto || !token) return;

    try {
      await guardarFrase(token, texto);
      await Speech.stop();

      if (tipoVoz === 'femenina') {
        Speech.speak(texto, {
          language: 'es-ES',
          pitch: 1.2,
          rate: 1,
        });
      } else if (tipoVoz === 'masculina' && vozMasculina) {
        Speech.speak(texto, {
          language: 'es-ES',
          pitch: 1.0,
          rate: 1,
          voice: vozMasculina,
        });
      }

      Toast.show({
        type: 'success',
        text1: 'Frase guardada',
        visibilityTime: 1500,
        position: 'bottom',
      });
    } catch (error) {
      console.error('Error al reproducir o guardar frase:', error);
      Toast.show({
        type: 'error',
        text1: 'Error al guardar o reproducir la frase',
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
