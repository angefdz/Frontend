import React from 'react';
import { palette, radius, shadow } from '@/constants/Theme';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface Props {
  readonly texto: string;
  readonly onPress: () => void;
  readonly hint?: string; 
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
    backgroundColor: palette.primary,
    paddingVertical: Math.max(14, width * 0.025),
    paddingHorizontal: width * 0.06,
    borderRadius: radius.medium,
    alignItems: 'center',
    marginTop: width * 0.05,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
    marginBottom: 20,
    minHeight: 52,
    ...shadow.card,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: Math.max(16, width * 0.04),
    fontWeight: '700',
  },
});
