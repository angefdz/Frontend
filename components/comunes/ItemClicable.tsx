// components/biblioteca/shared/ItemClicable.tsx

import { Dimensions, Image, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

const { width } = Dimensions.get('window');
const itemSize = (width - 20 * 2 - 10 * 3) / 4; // igual que en BibliotecaScreen
const imageSize = itemSize * 0.6;
const fontSize = itemSize * 0.18;

type Props = {
  readonly nombre: string;
  readonly imagen: string;
  readonly onPress?: () => void;
  readonly itemStyle?: ViewStyle;
  readonly textStyle?: TextStyle;
  readonly emojiStyle?: TextStyle;
};

export default function ItemClicable({
  nombre,
  imagen,
  onPress,
  itemStyle,
  textStyle,
  
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.item, itemStyle]}
      onPress={onPress}
      accessible
      accessibilityRole="button"
      accessibilityLabel={`Elemento ${nombre}`}
    >
      <Image
        source={{ uri: imagen }}
        style={[styles.imagen, { width: imageSize, height: imageSize }]}
        resizeMode="contain"
      />
      <Text
        style={[styles.texto, { fontSize }, textStyle]}
        numberOfLines={2}
        allowFontScaling={true}
        adjustsFontSizeToFit={false}
      >
        {nombre}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: itemSize,
    height: itemSize,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagen: {
    borderRadius: 10,
  },
  texto: {
    textAlign: 'center',
    marginTop: 6,
    color: '#1A1A1A',
  },
});
