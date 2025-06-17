// FraseConstruida.tsx
import BotonesFrase from '@/components/pantallaPrincipal/BotonesFrase';
import TextoFraseExpandibleAnimado from '@/components/pantallaPrincipal/TextoFraseExpandible';
import React from 'react';
import { View } from 'react-native';

interface Props {
  frase: string[];
  borrarUltimo: () => void;
  resetearFrase: () => void;
  reproducirFrase: () => void;
}

export default function FraseConstruida({ frase, borrarUltimo, resetearFrase, reproducirFrase }: Props) {
  return (
    <View>
      <TextoFraseExpandibleAnimado frase={frase} />
      <BotonesFrase
        borrarUltimo={borrarUltimo}
        resetearFrase={resetearFrase}
        reproducirFrase={reproducirFrase}
      />
    </View>
  );
}
