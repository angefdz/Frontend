import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';

interface Props {
  colores: [string, string, ...string[]]; // Al menos dos colores
}

export default function FondoDegradado({ colores }: Props) {
  return (
    <LinearGradient
      colors={colores}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  );
}
