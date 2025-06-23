import React from 'react';
import { StyleSheet, Text } from 'react-native';

export default function CabeceraSeccion({  texto }: { readonly texto: string }) {
  return <Text style={styles.titulo}>{texto}</Text>;
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
