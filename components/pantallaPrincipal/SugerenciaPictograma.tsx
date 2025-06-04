// components/frase/SugerenciaPictograma.tsx

import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/InicioScreen.styles';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  sugerencia: string | null;
  usarSugerencia: () => void;
};

export default function SugerenciaPictograma({
  sugerencia,
  usarSugerencia,
}: Props) {
  if (!sugerencia) return null;

  const pictograma = pictogramas.find((p) => p.palabra === sugerencia);

  return (
    <TouchableOpacity
      onPress={usarSugerencia}
      style={[styles.pictograma, { alignSelf: 'center', marginBottom: 20 }]}
    >
      <Text style={styles.pictogramaEmoji}>{pictograma?.imagen ?? ''}</Text>
    </TouchableOpacity>
  );
}
