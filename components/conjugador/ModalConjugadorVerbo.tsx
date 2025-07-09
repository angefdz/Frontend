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
  const [tiempoIndex, setTiempoIndex] = useState(1); 
  const [personaIndex, setPersonaIndex] = useState(0); 

  const formaConjugada = useMemo(() => {
    try {
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
  }, [verbo, tiempoIndex, personaIndex]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.titulo}>Conjugar verbo "{verbo}"</Text>

          <Text style={styles.label}>Tiempo</Text>
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
                <Text style={styles.opcionTexto}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Persona</Text>
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
                <Text style={styles.opcionTexto}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.conjugacion}>
            Resultado: <Text style={styles.verbo}>{formaConjugada.trim() ? formaConjugada : '-'}</Text>
          </Text>

          <View style={styles.botones}>
            <TouchableOpacity style={styles.botonCancelar} onPress={onClose}>
              <Text style={styles.botonTexto}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.botonConfirmar}
              onPress={() => {
                onConfirm(formaConjugada);
                onClose();
              }}
              disabled={!formaConjugada}
            >
              <Text style={styles.botonTexto}>Añadir a frase</Text>
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
    backgroundColor: '#007AFF',
  },
  opcionTexto: {
    marginTop: 4,
    textAlign: 'center',
    color: '#000',
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
    color: '#007AFF',
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
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  botonConfirmar: {
    flex: 1,
    marginLeft: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#007AFF',
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
