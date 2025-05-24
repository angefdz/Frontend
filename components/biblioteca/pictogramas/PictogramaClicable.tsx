import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
  id: number;
  palabra: string;
  imagen: string;
  onPress?: () => void;
  itemStyle?: ViewStyle;
  emojiStyle?: TextStyle;
  textStyle?: TextStyle;
}

export default function PictogramaClicable({
  palabra,
  imagen,
  onPress,
  itemStyle,
  emojiStyle,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity style={itemStyle} onPress={onPress}>
      <Text style={emojiStyle}>{imagen}</Text>
      <Text style={textStyle}>{palabra}</Text>
    </TouchableOpacity>
  );
}
