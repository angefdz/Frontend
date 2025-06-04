// components/frase/FraseActual.tsx

import { styles } from '@/styles/InicioScreen.styles';
import React from 'react';
import { Text, View } from 'react-native';

type Props = {
  frase: string[];
};

export default function FraseActual({ frase }: Props) {
  return (
    <View style={styles.fraseContainer}>
      {frase.map((palabra, index) => (
        <Text key={index} style={styles.pictogramaFrase}>
          {palabra}
        </Text>
      ))}
    </View>
  );
}
