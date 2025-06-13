import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    LayoutChangeEvent,
    StyleSheet,
    Text,
    View,
} from 'react-native';

interface Props {
  frase: string[];
}

export default function TextoFraseExpandibleAnimado({ frase }: Props) {
  const [contenidoAltura, setContenidoAltura] = useState(50); // mínimo más alto
  const alturaAnimada = useRef(new Animated.Value(50)).current;

  const fraseTexto = frase.join(' ');

  useEffect(() => {
    Animated.timing(alturaAnimada, {
      toValue: contenidoAltura,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [contenidoAltura]);

  const manejarCambioLayout = (event: LayoutChangeEvent) => {
    const nuevaAltura = event.nativeEvent.layout.height;
    if (nuevaAltura !== contenidoAltura) {
      setContenidoAltura(nuevaAltura);
    }
  };

  return (
    <Animated.View style={[styles.container, { height: alturaAnimada }]}>
      <View onLayout={manejarCambioLayout} style={styles.medidor}>
        <Text style={styles.texto}>{fraseTexto}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fdfdfd',
    overflow: 'hidden',
    minHeight: 50, // se mantiene un mínimo
  },
  medidor: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  texto: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '500',
    flexWrap: 'wrap',
    color: '#333',
  },
});
