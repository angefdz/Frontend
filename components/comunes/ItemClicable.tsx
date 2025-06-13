// components/biblioteca/shared/ItemClicable.tsx

import { Image, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type Props = {
  nombre: string;
  imagen: string;
  onPress?: () => void;
  itemStyle?: ViewStyle;
  textStyle?: TextStyle;
};

export default function ItemClicable({
  nombre,
  imagen,
  onPress,
  itemStyle,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity style={[styles.item, itemStyle]} onPress={onPress}>
      <Image
        source={{ uri: imagen }}
        style={styles.imagen}
        resizeMode="contain"
      />
      <Text style={[styles.texto, textStyle]} numberOfLines={1}>
        {nombre}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 80,
    height: 100,
    marginRight: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagen: {
    width: 60,
    height: 60,
    borderRadius: 10
  },
  texto: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});
