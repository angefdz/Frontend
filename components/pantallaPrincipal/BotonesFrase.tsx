import { styles } from '@/styles/InicioScreen.styles';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';

type Props = {
  readonly borrarUltimo: () => void;
  readonly resetearFrase: () => void;
  readonly reproducirFrase: () => void;
};

export default function BotonesFrase({
  borrarUltimo,
  resetearFrase,
  reproducirFrase,
}: Props) {
  const { language } = useLanguage();
  const labels = language === 'en' ? ['Delete', 'Reset', 'Speak'] : ['Borrar', 'Resetear', 'Reproducir'];
  return (
    <View style={styles.botonesFrase}>
      <View style={styles.botonConEtiqueta}>
        <TouchableOpacity
          onPress={borrarUltimo}
          style={styles.botonIcono}
          accessible
          accessibilityLabel="Borrar último pictograma"
          accessibilityRole="button"
        >
          <Feather name="delete" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.etiquetaBoton}>{labels[0]}</Text>
      </View>

      <View style={styles.botonConEtiqueta}>
        <TouchableOpacity
          onPress={resetearFrase}
          style={styles.botonIcono}
          accessibilityLabel="Borrar toda la frase"
          accessibilityRole="button"
        >
          <Feather name="rotate-ccw" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.etiquetaBoton}>{labels[1]}</Text>
      </View>

      <View style={styles.botonConEtiqueta}>
        <TouchableOpacity
          onPress={reproducirFrase}
          style={styles.botonIcono}
          accessibilityLabel="Reproducir frase"
          accessibilityRole="button"
        >
          <Feather name="volume-2" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.etiquetaBoton}>{labels[2]}</Text>
      </View>
    </View>
  );
}
