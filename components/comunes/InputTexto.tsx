import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface Props {
  placeholder: string;
  valor: string;
  setValor: (texto: string) => void;
}

export default function InputTexto({ placeholder, valor, setValor }: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={valor}
      onChangeText={setValor}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
  },
});
