import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

type Props = {
  imagen: string;
  nombre: string;
  itemSize: number;
  onPress: () => void;
};

export default function GridItem({ imagen, nombre, itemSize, onPress }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { width: itemSize, height: itemSize }]}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Seleccionar pictograma: ${nombre}`}
    >
      <Image
        source={{ uri: imagen }}
        style={{
          width: itemSize * 0.7,
          height: itemSize * 0.7,
          maxHeight: itemSize * 0.65,
        }}
        resizeMode="contain"
      />
      <Text
        style={[
          styles.texto,
          {
            fontSize: Math.max(12, itemSize * 0.14),
            maxWidth: itemSize * 0.9,
          },
        ]}
        numberOfLines={1}
      >
        {nombre}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    overflow: 'hidden',
  },
  texto: {
    marginTop: 4,
    textAlign: 'center',
  },
});
