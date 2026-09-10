import { Image, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
import { palette } from '@/constants/Theme';

interface Categoria {
   id: number;
   nombre: string;
  imagen: string; 
}

interface Props {
  readonly categoria: Categoria;
  readonly seleccionada?: boolean;
  readonly itemStyle?: ViewStyle;
  readonly emojiStyle?: any; 
  readonly textStyle?: TextStyle;
  readonly onPress?: () => void;
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
        seleccionada ? {
          backgroundColor: palette.primarySoft,
          borderWidth: 3,
          borderColor: palette.primary,
        } : null,
      ]}
      onPress={onPress}
    >
      <Image
        source={{ uri: categoria.imagen }}
        style={[{ width: 60, height: 60, borderRadius: 12, marginBottom: 8 }, emojiStyle]}
        resizeMode="cover"
      />
      <Text style={[textStyle, { color: palette.text, fontWeight: seleccionada ? '800' : '600' }]}>
        {categoria.nombre}
      </Text>
    </TouchableOpacity>
  );
}
