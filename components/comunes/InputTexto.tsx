import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface Props {
  readonly placeholder: string;
  readonly valor: string;
  readonly setValor: (texto: string) => void;
  readonly disabled?: boolean;  // Cambio aquí a "disabled"
}

export default function InputTexto({ placeholder, valor, setValor, disabled = false }: Props) {
  return (
    <TextInput
    accessible={true}
  accessibilityLabel={placeholder}
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
    borderColor: '#999', // borde accesible por defecto
    borderRadius: 10,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
    backgroundColor: '#FFF',
    minHeight: 48,
    color: '#1A1A1A',
  },
  inputFocused: {
    borderColor: '#007AFF', // foco azul accesible
  },
  inputDisabled: {
    backgroundColor: '#F0F0F0',
    color: '#1A1A1A',
    borderColor: '#CCC',
  },
  inputError: {
    borderColor: '#D32F2F', // rojo accesible para error
  },
});

