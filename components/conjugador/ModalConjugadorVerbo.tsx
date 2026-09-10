import { personasGramaticales, tiemposVerbales } from '@/data/pictogramasGramatica';
import verbosIrregulares from '@/data/verbosIrregulares.json';
import React, { useMemo, useState } from 'react';
import {
  Dimensions,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getConjugation } from 'spanish-verbs';
import { palette } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';
import { conjugateEnglish } from '@/utils/grammar';

interface Props {
  readonly visible: boolean;
  readonly verbo: string;
  readonly onClose: () => void;
  readonly onConfirm: (formaConjugada: string) => void;
}

export default function ModalConjugadorVerbo({
  visible,
  verbo,
  onClose,
  onConfirm,
}: Props) {
  const { language, t } = useLanguage();
  const [tiempoIndex, setTiempoIndex] = useState(1); 
  const [personaIndex, setPersonaIndex] = useState(0); 

  const formaConjugada = useMemo(() => {
    try {
      if (language === 'en') {
        return conjugateEnglish(verbo, tiemposVerbales[tiempoIndex].key, personaIndex);
      }
      const personaIdx = personaIndex as 0 | 1 | 2 | 3 | 4 | 5;
      const tiempoKey = `INDICATIVE_${tiemposVerbales[tiempoIndex].key.toUpperCase()}`;

      //verbo irregular
      if (verbosIrregulares.hasOwnProperty(verbo)) {
        const conjugaciones = (verbosIrregulares as any)[verbo];
        const conjugacionesPorTiempo = conjugaciones[tiempoKey];

        if (conjugacionesPorTiempo && conjugacionesPorTiempo[personaIdx]) {
          return conjugacionesPorTiempo[personaIdx];
        }
      }

      //verbo regular
      return (
        getConjugation(verbo, tiempoKey as any, personaIdx) ?? ''
      );
    } catch (err) {
      console.error('Error al conjugar el verbo:', err);
      return '';
    }
  }, [verbo, tiempoIndex, personaIndex, language]);

  const tenseLabels = language === 'en' ? ['Past', 'Present', 'Future'] : ['Pasado', 'Presente', 'Futuro'];
  const personLabels = language === 'en'
    ? ['I', 'You', 'He/She', 'We', 'You', 'They']
    : personasGramaticales.map(persona => persona.label);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>{`${t('conjugate')} “${verbo}”`}</Text>

          <Text style={styles.label}>{t('tense')}</Text>
          <View style={styles.tiempoContainer}>
            {tiemposVerbales.map((t, index) => (
              <TouchableOpacity
                key={t.key}
                onPress={() => setTiempoIndex(index)}
                style={[
                  styles.tiempoItem,
                  tiempoIndex === index && styles.opcionSeleccionada,
                ]}
              >
                <Image source={{ uri: t.imagen }} style={styles.icono} resizeMode="contain" />
                <Text style={styles.opcionTexto}>{tenseLabels[index]}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>{t('person')}</Text>
          <ScrollView
            horizontal
            contentContainerStyle={styles.personasGrid}
            showsHorizontalScrollIndicator={false}
          >
            {personasGramaticales.map((p, index) => (
              <TouchableOpacity
                key={p.key}
                onPress={() => setPersonaIndex(index)}
                style={[
                  styles.opcion,
                  personaIndex === index && styles.opcionSeleccionada,
                ]}
              >
                <Image source={{ uri: p.imagen }} style={styles.icono} resizeMode="contain" />
                <Text style={styles.opcionTexto}>{personLabels[index]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.conjugacion}>
            {t('result')}: <Text style={styles.verbo}>{formaConjugada.trim() ? formaConjugada : '-'}</Text>
          </Text>

          <View style={styles.botones}>
            <TouchableOpacity style={styles.botonCancelar} onPress={onClose}>
              <Text style={styles.botonTexto}>{t('cancel')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botonConfirmar}
              onPress={() => {
                onConfirm(formaConjugada);
                onClose();
              }}
              disabled={!formaConjugada}
            >
              <Text style={styles.botonTexto}>{t('addToPhrase')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0009',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tiempoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tiempoItem: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 12,
  },
  modal: {
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    elevation: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 4,
  },
  selector: {
    marginBottom: 8,
  },
  opcion: {
    padding: 10,
    marginRight: 8,
    backgroundColor: '#eee',
    borderRadius: 12,
    alignItems: 'center',
    width: 100,
  },
  opcionSeleccionada: {
    backgroundColor: palette.primarySoft,
    borderWidth: 3,
    borderColor: palette.primary,
  },
  opcionTexto: {
    marginTop: 4,
    textAlign: 'center',
    color: palette.text,
    fontSize: 12,
  },
  icono: {
    width: 48,
    height: 48,
  },
  conjugacion: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  verbo: {
    fontWeight: 'bold',
    color: palette.primary,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  botonCancelar: {
    flex: 1,
    marginRight: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: palette.secondary,
    alignItems: 'center',
  },
  botonConfirmar: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: palette.primary,
    alignItems: 'center',
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  personasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingVertical: 4,
    paddingRight: 12,
  },
});
