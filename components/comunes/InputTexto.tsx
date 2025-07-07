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
  readonly hint?: string; // opcional
}

const { width } = Dimensions.get('window');

export default function InputTexto({
  placeholder,
  valor,
  setValor,
  disabled = false,
  hint,
}: Props) {
  return (
    <TextInput
      accessible={true}
      accessibilityLabel={placeholder}
      accessibilityHint={hint || `Introduce ${placeholder.toLowerCase()}`}
      style={[styles.input, disabled && styles.inputDisabled]}
      placeholder={placeholder}
      placeholderTextColor="#555"
      value={valor}
      onChangeText={setValor}
      editable={!disabled}
      allowFontScaling={true}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: width * 0.035,
    marginVertical: width * 0.03,
    fontSize: width * 0.045,
    backgroundColor: '#FFF',
    minHeight: 48,
    color: '#1A1A1A',
  },
  inputDisabled: {
    backgroundColor: '#F0F0F0',
    color: '#1A1A1A',
    borderColor: '#CCC',
  },
});
