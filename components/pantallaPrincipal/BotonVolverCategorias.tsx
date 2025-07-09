import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  readonly onPress: () => void;
};

export default function BotonVolverCategorias({ onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel="Volver a categorías"
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
