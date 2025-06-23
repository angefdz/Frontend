import { styles } from '@/styles/InicioScreen.styles';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

type Props = {
  borrarUltimo: () => void;
  resetearFrase: () => void;
  reproducirFrase: () => void;
};

export default function BotonesFrase({
  borrarUltimo,
  resetearFrase,
  reproducirFrase,
}: Props) {
  return (
    <View style={styles.botonesFrase}>
      <TouchableOpacity onPress={borrarUltimo} style={styles.botonIcono} accessible accessibilityLabel="Borrar último pictograma"
        accessibilityRole="button" >
        <Feather name="delete" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity onPress={resetearFrase} style={styles.botonIcono} accessibilityLabel="Borrar toda la frase"
        accessibilityRole="button">
        <Feather name="rotate-ccw" size={24} color="white" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          console.log('📣 Botón de reproducir pulsado');
          try {
            reproducirFrase();
          } catch (e) {
            console.error('❌ Error al ejecutar reproducirFrase():', e);
          }
        }}
        style={styles.botonIcono} accessibilityLabel="Reproducir frase"
        accessibilityRole="button"
      >
        <Feather name="volume-2" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
