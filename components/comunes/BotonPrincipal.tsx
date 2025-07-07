import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface Props {
  readonly texto: string;
  readonly onPress: () => void;
  readonly hint?: string; // añadimos prop opcional para personalizar accesibilidad
}

const { width } = Dimensions.get('window');

export default function BotonPrincipal({ texto, onPress, hint }: Props) {
  return (
    <TouchableOpacity
      style={styles.boton}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={texto}
      accessibilityHint={hint || `Presiona para ${texto.toLowerCase()}`}
    >
      <Text
        style={styles.texto}
        allowFontScaling={true}
        adjustsFontSizeToFit={false}
      >
        {texto}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#007AFF',
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.06,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: width * 0.05,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    marginBottom: 20,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    fontWeight: 'bold',
  },
});
