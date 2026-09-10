import { Feather } from '@expo/vector-icons';
import React from 'react';
import { palette, radius, shadow } from '@/constants/Theme';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';

interface Props {
  readonly valor: string;
  readonly setValor: (texto: string) => void;
  readonly placeholder?: string;
}

const { width } = Dimensions.get('window');

export default function BarraBusqueda({
  valor,
  setValor,
  placeholder = 'Buscar...',
}: Props) {
  const { tr } = useLanguage();
  return (
    <View style={styles.contenedor}>
      <Feather name="search" size={width * 0.05} color={palette.textMuted} style={styles.icono}  accessibilityElementsHidden
  importantForAccessibility="no"/>
      <TextInput
        style={styles.input}
        placeholder={placeholder === 'Buscar...' ? (tr('Buscar') + '…') : tr(placeholder)}
        placeholderTextColor={palette.textMuted}
        value={valor}
        onChangeText={setValor}
        accessible
        accessibilityRole="search"
        accessibilityLabel={tr('Buscar')}
        accessibilityHint="Introduce texto para filtrar los resultados"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.surface,
    borderRadius: radius.medium,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.025,
    marginTop: width * 0.025,
    marginBottom: width * 0.04,
    marginHorizontal: width * 0.04,
    minHeight: 52,
    ...shadow.card,
  },
  icono: {
    marginRight: width * 0.02,
  },
  input: {
    flex: 1,
    fontSize: width * 0.045,
    color: palette.text,
  },
});
