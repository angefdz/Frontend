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
}

const { width } = Dimensions.get('window');

export default function BotonPrincipal({ texto, onPress }: Props) {
  return (
    <TouchableOpacity
      style={styles.boton}
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={texto}
    >
      <Text style={styles.texto}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#007AFF',
    paddingVertical: width * 0.02,    // antes 12
    paddingHorizontal: width * 0.06,   // antes 24
    borderRadius: 10,
    alignItems: 'center',
    marginTop: width * 0.05,           // antes 20
    width: '100%',                     // ocupa todo el ancho del contenedor
    maxWidth: 500,                     // no se pasa en pantallas grandes
    alignSelf: 'center', 
    marginBottom: 20        // centrado horizontal
  },
  texto: {
    color: '#FFFFFF',
    fontSize: width * 0.04,           // antes 16
    fontWeight: 'bold',
  },
});
