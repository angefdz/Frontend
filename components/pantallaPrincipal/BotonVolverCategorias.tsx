import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { palette, radius } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';

type Props = {
  readonly onPress: () => void;
};

export default function BotonVolverCategorias({ onPress }: Props) {
  const { language } = useLanguage();
  return (
    <TouchableOpacity
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel="Volver a categorías"
      style={{
        alignSelf: 'flex-start',
        marginBottom: 10,
        backgroundColor: palette.primarySoft,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: radius.pill,
        minHeight: 48,
        justifyContent: 'center',
      }}
    >
      <Text style={{ fontWeight: '800', color: palette.primary }}>← {language === 'en' ? 'Back to categories' : 'Volver a categorías'}</Text>
    </TouchableOpacity>
  );
}
