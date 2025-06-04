import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  palabra: string;
  imagen: string;
  itemStyle?: any;
  emojiStyle?: any;
  textStyle?: any;
}

export default function PictogramaVisual({
  palabra,
  imagen,
  itemStyle,
  emojiStyle,
  textStyle,
}: Props) {
  return (
    <View style={[styles.item, itemStyle]}>
      <Image
        source={{ uri: imagen }}
        style={[styles.image, emojiStyle]}
        resizeMode="contain"
      />
      <Text style={[styles.text, textStyle]}>{palabra}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  image: {
    width: 40,
    height: 40,
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
