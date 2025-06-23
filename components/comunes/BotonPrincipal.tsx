import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  texto: string;
  onPress: () => void;
}

export default function BotonPrincipal({ texto, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress} accessible
    accessibilityRole="button"
    accessibilityLabel={texto} >
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
