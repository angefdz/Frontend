import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
} from 'react-native';

interface Props {
  readonly placeholder: string;
  readonly valor: string;
  readonly setValor: (texto: string) => void;
  readonly disabled?: boolean;
}

const { width } = Dimensions.get('window');

export default function InputTexto({
  placeholder,
  valor,
  setValor,
  disabled = false,
}: Props) {
  return (
    <TextInput
      accessible={true}
      accessibilityLabel={placeholder}
      style={[styles.input, disabled && styles.inputDisabled]}
      placeholder={placeholder}
      value={valor}
      onChangeText={setValor}
      editable={!disabled}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: width * 0.035,          // antes 12
    marginVertical: width * 0.03,    // antes 10
    fontSize: width * 0.045,         // antes 16
    backgroundColor: '#FFF',
    minHeight: 48,
    color: '#1A1A1A',
  },
  inputFocused: {
    borderColor: '#007AFF',
  },
  inputDisabled: {
    backgroundColor: '#F0F0F0',
    color: '#1A1A1A',
    borderColor: '#CCC',
  },
  inputError: {
    borderColor: '#D32F2F',
  },
});
