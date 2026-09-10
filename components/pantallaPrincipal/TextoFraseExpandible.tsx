import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Dimensions } from 'react-native';
import { palette, radius, shadow } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';
import { PalabraFrase } from '@/types';
const {width} = Dimensions.get('window')
interface Props {
  readonly frase: PalabraFrase[];
}

export default function TextoFraseExpandibleAnimado({ frase }: Props) {
  const { t } = useLanguage();
  const alturaInicial = Dimensions.get('window').height * 0.07; 
const [contenidoAltura, setContenidoAltura] = useState(alturaInicial);
const alturaAnimada = useRef(new Animated.Value(alturaInicial)).current;

  const fraseTexto = frase.map(palabra => palabra.texto).join(' ');

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
        <Text style={[styles.texto, !fraseTexto && styles.textoPredeterminado]}>
          {fraseTexto || t('emptyPhrase')}
        </Text>
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
    borderColor: palette.primary,
    borderRadius: radius.medium,
    backgroundColor: palette.surface,
    overflow: 'hidden',
    minHeight: 50,
    ...shadow.card,
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
    color: palette.text,
  },
  textoPredeterminado: {
    color: palette.placeholder,
    fontWeight: '400',
  },
});
