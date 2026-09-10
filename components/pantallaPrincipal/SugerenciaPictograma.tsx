import { palette, radius, shadow } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';
import { PictogramaSimple } from '@/types';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

interface Props {
  readonly sugerencias: PictogramaSimple[];
  readonly usarSugerencia: (sugerencia: PictogramaSimple) => void;
}

export default function SugerenciaPictograma({ sugerencias, usarSugerencia }: Props) {
  const { width } = useWindowDimensions();
  const { t, localize, language } = useLanguage();
  if (sugerencias.length === 0) return null;

  const cardWidth = Math.min(126, Math.max(96, (width - 56) / 3));
  return (
    <View style={styles.container} accessibilityRole="summary">
      <Text style={styles.label}>{t('suggestions')}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row} accessibilityLabel={t('suggestions')}>
        {sugerencias.slice(0, 3).map((sugerencia, index) => {
          const nombre = localize(sugerencia);
          const description = language === 'en'
            ? `Suggestion ${index + 1} of ${sugerencias.length}: ${nombre}`
            : `Sugerencia ${index + 1} de ${sugerencias.length}: ${nombre}`;
          return (
            <TouchableOpacity key={sugerencia.id} onPress={() => usarSugerencia(sugerencia)}
              activeOpacity={0.72} accessibilityRole="button" accessibilityLabel={description}
              accessibilityHint={t('addSuggestedPictogram')} style={{ width: cardWidth }}>
              <View style={[styles.item, index === 0 && styles.primary]}>
                {index === 0 && sugerencias.length > 1 && (
                  <Text style={styles.badge}>{t('mostLikely')}</Text>
                )}
                <Image source={{ uri: sugerencia.imagen }} style={styles.image} resizeMode="contain"
                  accessibilityIgnoresInvertColors />
                <Text style={styles.name} numberOfLines={2}>{nombre}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  label: { color: palette.text, fontSize: 17, fontWeight: '800', marginBottom: 8, marginHorizontal: 16 },
  row: { gap: 10, paddingHorizontal: 16, paddingBottom: 5 },
  item: { height: 122, backgroundColor: palette.surface, borderRadius: radius.medium, borderWidth: 1.5,
    borderColor: palette.border, padding: 7, justifyContent: 'center', alignItems: 'center', ...shadow.card },
  primary: { backgroundColor: palette.warningSoft, borderColor: palette.warning },
  badge: { position: 'absolute', top: 5, paddingHorizontal: 7, paddingVertical: 2, borderRadius: radius.pill,
    backgroundColor: palette.warning, color: '#FFFFFF', fontSize: 10, fontWeight: '800', overflow: 'hidden' },
  image: { width: '78%', height: 70, marginTop: 10 },
  name: { color: palette.text, fontSize: 14, fontWeight: '700', lineHeight: 18, textAlign: 'center' },
});
