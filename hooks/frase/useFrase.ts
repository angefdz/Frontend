import * as Speech from 'expo-speech';
import { useEffect, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';

import { useAuth } from '@/context/AuthContext';
import { useVoz } from '@/context/VozContext';
import { guardarFrase } from '@/hooks/frase/useGuardarFrase';
import { PalabraFrase, PictogramaSimple } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { usePrediccionPictograma } from '../utils/prediccion';

export const useFrase = (pictogramasDisponibles: PictogramaSimple[]) => {
  const { language, localize, t } = useLanguage();
  const { tipoVoz } = useVoz();
  const { token } = useAuth();

  // Atajos iniciales frecuentes. Los IDs estables mantienen las mismas
  // sugerencias en español e inglés sin depender del texto traducido.
  const sugerenciasIniciales = useMemo(() => {
    const porId = new Map(pictogramasDisponibles.map(pictograma => [pictograma.id, pictograma]));
    return [84, 43, 650]
      .map(id => porId.get(id))
      .filter((item): item is PictogramaSimple => Boolean(item));
  }, [pictogramasDisponibles]);

  const [frase, setFrase] = useState<PalabraFrase[]>([]);
  const [vozMasculina, setVozMasculina] = useState<string | undefined>();

  const lemasPrediccion = frase.map(p => p.lema);
  const pictogramaIdsPrediccion = frase.map(p => p.pictogramaId);
  const textoPrediccion = frase.map(p => p.texto).join(' ');
  const { sugerenciasIds, cargando: cargandoSugerencias } = usePrediccionPictograma(
    pictogramaIdsPrediccion, lemasPrediccion, textoPrediccion, language
  );
  const sugerencias = useMemo(() => {
    if (frase.length === 0) return sugerenciasIniciales;
    const disponibles = new Map(pictogramasDisponibles.map(pictograma => [pictograma.id, pictograma]));
    return sugerenciasIds.map(id => disponibles.get(id)).filter((item): item is PictogramaSimple => Boolean(item));
  }, [frase.length, pictogramasDisponibles, sugerenciasIds, sugerenciasIniciales]);

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

  return {
    frase,
    sugerencias,
    cargandoSugerencias,
    añadirPictograma,
    borrarUltimo,
    resetearFrase,
    reproducirFrase,
  };
};
