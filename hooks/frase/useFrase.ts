import * as Speech from 'expo-speech';
import { useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';

import { useAuth } from '@/context/AuthContext';
import { useVoz } from '@/context/VozContext';
import verbos from '@/data/verbosIrregulares.json';
import { guardarFrase } from '@/hooks/frase/useGuardarFrase';
import { PalabraFrase, PictogramaSimple } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { usePrediccionPictograma } from '../utils/prediccion';

export function buscarInfinitivo(palabra: string): string | null {
  const palabraLimpia = palabra.trim().toLowerCase();

  for (const [infinitivo, tiempos] of Object.entries(verbos)) {
    for (const formas of Object.values(tiempos)) {
      for (const forma of formas) {
        if (forma.toLowerCase().includes(palabraLimpia)) {
          return infinitivo;
        }
      }
    }
  }

  return null;
}

export const useFrase = (pictogramasDisponibles: PictogramaSimple[]) => {
  const { language, localize, t } = useLanguage();
  const { tipoVoz } = useVoz();
  const { token } = useAuth();

  // La frase comienza habitualmente por el sujeto. Usamos el ID estable para
  // que la sugerencia sea la misma aunque la interfaz esté traducida.
  const pictogramaInicial = useMemo(
    () => pictogramasDisponibles.find(p => p.id === 84)
      ?? pictogramasDisponibles.find(p =>
        ['yo', 'i'].includes(localize(p).trim().toLowerCase()) || p.nombre.trim().toLowerCase() === 'yo'
      ),
    [pictogramasDisponibles, localize]
  );

  const [frase, setFrase] = useState<PalabraFrase[]>([]);
  const [sugerencia, setSugerencia] = useState<PictogramaSimple | undefined>(pictogramaInicial);
  const [vozMasculina, setVozMasculina] = useState<string | undefined>();

  const lemasPrediccion = frase.map(p => p.lema);
  const lemasPrediccionKey = lemasPrediccion.join('\u0000');
  const pictogramaIdsPrediccion = frase.map(p => p.pictogramaId);
  const textoPrediccion = frase.map(p => p.texto).join(' ');
  const { sugerencia: sugerenciaTexto } = usePrediccionPictograma(pictogramaIdsPrediccion, lemasPrediccion, textoPrediccion, language);

  useEffect(() => {
    if (!sugerenciaTexto || frase.length === 0) {
      setSugerencia(pictogramaInicial);
      return;
    }

    let texto = sugerenciaTexto.toLowerCase();

    let sugerido = pictogramasDisponibles.find(
      p => p.nombre.toLowerCase() === texto || localize(p).toLowerCase() === texto
    );

    if (!sugerido) {
      const infinitivo = buscarInfinitivo(sugerenciaTexto);
      if (infinitivo) {
        sugerido = pictogramasDisponibles.find(
          p => p.nombre.toLowerCase() === infinitivo.toLowerCase()
        );
      }
    }

    setSugerencia(sugerido ?? pictogramaInicial);
  }, [frase.length, lemasPrediccionKey, sugerenciaTexto, pictogramasDisponibles, pictogramaInicial, localize, language]);

  useEffect(() => {
    if (tipoVoz === 'masculina') {
      Speech.getAvailableVoicesAsync().then(voices => {
        const voz = voices.find(v =>
          v.language === (language === 'en' ? 'en-GB' : 'es-ES') && v.name.toLowerCase().includes('male')
        );
        if (voz) setVozMasculina(voz.identifier);
        else if (voices.find(v => v.language === (language === 'en' ? 'en-GB' : 'es-ES'))) {
          setVozMasculina(voices.find(v => v.language === (language === 'en' ? 'en-GB' : 'es-ES'))!.identifier);
        }
      });
    }
  }, [tipoVoz, language]);

  const añadirPictograma = (pictograma: PictogramaSimple, forma?: string) => {
    setFrase(prev => {
      const palabra = forma || localize(pictograma);
      const texto =
        prev.length === 0
          ? palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
          : palabra.toLowerCase();
      const lema = (language === 'en' ? localize(pictograma) : pictograma.nombre).toLowerCase();
      return [...prev, { pictogramaId: pictograma.id, lema, texto }];
    });
  };

  const borrarUltimo = () => {
    setFrase(prev => prev.slice(0, -1));
  };

  const resetearFrase = () => {
    setFrase([]);
  };

  const reproducirFrase = async () => {
    const texto = frase.map(p => p.texto).join(' ');
    if (!texto || !token) return;

    try {
      await guardarFrase(token, texto);
      await Speech.stop();

      if (tipoVoz === 'femenina') {
        Speech.speak(texto, {
          language: language === 'en' ? 'en-GB' : 'es-ES',
          pitch: 1.2,
          rate: 1,
        });
      } else if (tipoVoz === 'masculina' && vozMasculina) {
        Speech.speak(texto, {
          language: language === 'en' ? 'en-GB' : 'es-ES',
          pitch: 1.0,
          rate: 1,
          voice: vozMasculina,
        });
      }

      Toast.show({
        type: 'success',
        text1: t('saved'),
        visibilityTime: 1500,
        position: 'bottom',
      });
    } catch {
      Toast.show({
        type: 'error',
        text1: t('speechError'),
      });
    }
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
