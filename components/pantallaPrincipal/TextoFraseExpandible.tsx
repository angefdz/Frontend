import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { palette, radius, shadow } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';
import { PalabraFrase } from '@/types';
const { width } = Dimensions.get('window');
const ALTURA_VACIA = 68;
const ESPACIADO_VERTICAL = 32;

interface Props {
  readonly frase: PalabraFrase[];
}

export default function TextoFraseExpandibleAnimado({ frase }: Props) {
  const { t } = useLanguage();
  const alturaInicial = ALTURA_VACIA;
  const [contenidoAltura, setContenidoAltura] = useState(alturaInicial);
  const alturaAnimada = useRef(new Animated.Value(alturaInicial)).current;

  const fraseTexto = frase.map(palabra => palabra.texto).join(' ');

  useEffect(() => {
    if (!fraseTexto) setContenidoAltura(ALTURA_VACIA);
  }, [fraseTexto]);

  useEffect(() => {
    Animated.timing(alturaAnimada, {
      toValue: contenidoAltura,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [alturaAnimada, contenidoAltura]);

  const manejarCambioLayout = (event: LayoutChangeEvent) => {
    const nuevaAltura = Math.max(
      ALTURA_VACIA,
      event.nativeEvent.layout.height + ESPACIADO_VERTICAL
    );
    if (nuevaAltura !== contenidoAltura) {
      setContenidoAltura(nuevaAltura);
    }
  };

  return (
    <Animated.View style={[styles.container, { height: alturaAnimada }]}>
      <View onLayout={manejarCambioLayout} style={styles.medidor}>
        <Text
          style={[
            styles.texto,
            {
              fontSize: Math.min(27, Math.max(21, width * 0.055)),
              lineHeight: Math.min(36, Math.max(29, width * 0.074)),
            },
            !fraseTexto && styles.textoPredeterminado,
          ]}
        >
          {fraseTexto || t('emptyPhrase')}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: 22,
    borderWidth: 1.5,
    borderColor: palette.primary,
    borderRadius: radius.medium,
    backgroundColor: palette.surface,
    overflow: 'hidden',
    minHeight: ALTURA_VACIA,
    ...shadow.card,
  },
  medidor: {
    position: 'absolute',
    left: 20,
    right: 20,
    top: 16,
  },
  texto: {
    fontWeight: '500',
    flexWrap: 'wrap',
    color: palette.text,
  },
  textoPredeterminado: {
    color: palette.placeholder,
    fontWeight: '400',
  },
});
