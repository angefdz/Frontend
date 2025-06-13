// components/pantallaPrincipal/GridItem.tsx

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
    <TouchableOpacity onPress={onPress} style={[styles.container, { width: itemSize, height: itemSize }]}>
      <Image
        source={{ uri: imagen }}
        style={{ width: itemSize * 0.7, height: itemSize * 0.7 }}
        resizeMode="contain"
      />
      <Text style={[styles.texto, { fontSize: itemSize * 0.15 }]} numberOfLines={1}>
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
    margin: 6,
  },
  texto: {
    marginTop: 4,
    textAlign: 'center',
  },
});
