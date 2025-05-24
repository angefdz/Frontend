import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface Categoria {
  id: number;
  nombre: string;
  imagen: string;
}

interface Props {
  categoria: Categoria;
  seleccionada?: boolean;
  itemStyle?: ViewStyle;
  emojiStyle?: TextStyle;
  textStyle?: TextStyle;
  onPress?: () => void;
}

export default function CategoriaSeleccionable({
  categoria,
  seleccionada = false,
  itemStyle,
  emojiStyle,
  textStyle,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        itemStyle,
        seleccionada ? { backgroundColor: '#007AFF' } : null,
      ]}
      onPress={onPress}
    >
      <Text style={emojiStyle}>{categoria.imagen}</Text>
      <Text style={textStyle}>{categoria.nombre}</Text>
    </TouchableOpacity>
  );
}
