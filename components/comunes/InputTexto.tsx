import React from 'react';
import { palette, radius } from '@/constants/Theme';
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
  readonly hint?: string; 
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
      placeholderTextColor={palette.textMuted}
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
    borderColor: palette.border,
    borderRadius: radius.medium,
    padding: width * 0.035,
    marginVertical: width * 0.03,
    fontSize: width * 0.045,
    backgroundColor: palette.surface,
    minHeight: 54,
    color: palette.text,
  },
  inputDisabled: {
    backgroundColor: palette.surfaceMuted,
    color: palette.textMuted,
    borderColor: palette.border,
  },
});
