import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Dimensions } from 'react-native';
const {width} = Dimensions.get('window')
interface Props {
  readonly frase: string[];
}

export default function TextoFraseExpandibleAnimado({ frase }: Props) {
  const alturaInicial = Dimensions.get('window').height * 0.07; // 5% del alto de pantalla
const [contenidoAltura, setContenidoAltura] = useState(alturaInicial);
const alturaAnimada = useRef(new Animated.Value(alturaInicial)).current;

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
    fontSize: width *0.06,
    paddingTop: width * 0.02,
    lineHeight: width * 0.055,
    fontWeight: '500',
    flexWrap: 'wrap',
    color: '#333',
  },
});
