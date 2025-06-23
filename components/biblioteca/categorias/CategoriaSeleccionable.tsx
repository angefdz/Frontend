import { Image, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface Categoria {
  readonly id: number;
  readonly nombre: string;
  readonly imagen: string; // URL de imagen
}

interface Props {
  categoria: Categoria;
  seleccionada?: boolean;
  itemStyle?: ViewStyle;
  emojiStyle?: any; // Para estilo de imagen, no solo texto
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
      <Image
        source={{ uri: categoria.imagen }}
        style={[{ width: 60, height: 60, borderRadius: 12, marginBottom: 8 }, emojiStyle]}
        resizeMode="cover"
      />
      <Text style={textStyle}>{categoria.nombre}</Text>
    </TouchableOpacity>
  );
}
