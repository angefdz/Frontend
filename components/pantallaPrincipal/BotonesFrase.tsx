// components/frase/BotonesFrase.tsx

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
      <TouchableOpacity onPress={borrarUltimo} style={styles.botonIcono}>
        <Feather name="delete" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={resetearFrase} style={styles.botonIcono}>
        <Feather name="rotate-ccw" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity onPress={reproducirFrase} style={styles.botonIcono}>
        <Feather name="volume-2" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
