import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';

const { width } = Dimensions.get('window');
const fontSize = width * 0.05; // Aproximadamente 20 en móviles pequeños

export default function CabeceraSeccion({ texto }: { readonly texto: string }) {
  return <Text style={styles.titulo} accessibilityRole="header">{texto}</Text>;
}

const styles = StyleSheet.create({
  titulo: {
    fontSize,
    fontWeight: 'bold',
    marginVertical: width * 0.03, // margen vertical proporcional
    color: '#1A1A1A',
    textAlign: 'left',
  },
});
