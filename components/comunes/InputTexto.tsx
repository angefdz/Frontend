import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface Props {
  placeholder: string;
  valor: string;
  setValor: (texto: string) => void;
  disabled?: boolean;  // Cambio aquí a "disabled"
}

export default function InputTexto({ placeholder, valor, setValor, disabled = false }: Props) {
  return (
    <TextInput
      style={[styles.input, disabled && styles.inputDisabled]}
      placeholder={placeholder}
      value={valor}
      onChangeText={setValor}
      editable={!disabled}  // Usa disabled para controlar edición
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
    backgroundColor: '#FFF',
  },
  inputDisabled: {  // Cambié nombre para mantener naming inglés
    backgroundColor: '#F0F0F0',
    color: '#999',
  },
});
