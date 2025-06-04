// components/categorias/BotonVolverCategorias.tsx

import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  onPress: () => void;
};

export default function BotonVolverCategorias({ onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: 'flex-start',
        marginBottom: 10,
        backgroundColor: '#ddd',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
      }}
    >
      <Text style={{ fontWeight: 'bold' }}>← Volver a categorías</Text>
    </TouchableOpacity>
  );
}
