import { PictogramaSimple } from '@/types';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { palette, radius, shadow } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';

interface Props {
  readonly sugerencia: PictogramaSimple | null;
  readonly usarSugerencia: () => void;
  readonly itemsPerPage: number;
}
const screenWidth = Dimensions.get('window').width;
export default function SugerenciaPictograma({
  sugerencia,
  usarSugerencia,
  itemsPerPage,
}: Props) {
  const { t, localize } = useLanguage();
  if (!sugerencia) return null;
  const nombre = localize(sugerencia);

  
  const padding = 32;


  const itemsUsados = itemsPerPage === 4 ? 9 : itemsPerPage;
  const columnas = Math.sqrt(itemsUsados);
  const itemSize = (screenWidth - padding) / columnas;

  return (
    <View style={styles.contenedor}>
      <Text style={styles.etiqueta}>{t('suggestion')}</Text>
      <TouchableOpacity
        onPress={usarSugerencia}
        activeOpacity={0.72}
        accessibilityRole="button"
        accessibilityLabel={`${t('suggestion')}: ${nombre}`}
      >
        <View style={[styles.item, { width: itemSize, height: itemSize }]}>
          <Image
            source={{ uri: sugerencia.imagen }}
            style={styles.imagen}
            resizeMode="contain"
          />
          <Text style={styles.nombre}>{nombre}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    marginVertical: 20,
  },
  etiqueta: {
    color: palette.warning,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 8,
  },
  item: {
    backgroundColor: palette.warningSoft,
    borderRadius: radius.medium,
    borderWidth: 1.5,
    borderColor: palette.warning,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadow.card,
  },
  imagen: {
    width: '90%',
    height: '70%',
  },
  nombre: {
    fontSize: screenWidth*0.04,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
    color: palette.text,
  },
});
