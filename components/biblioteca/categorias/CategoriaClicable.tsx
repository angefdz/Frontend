import { useRouter } from 'expo-router';
import { Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface Props {
  id: number;
  nombre: string;
  imagen: string;
  itemStyle?: ViewStyle;
  emojiStyle?: TextStyle;
  textStyle?: TextStyle;
}

export default function CategoriaClicable({
  id,
  nombre,
  imagen,
  itemStyle,
  emojiStyle,
  textStyle,
}: Props) {
  const router = useRouter();

  const manejarPresionado = () => {
    router.push({
      pathname: '/biblioteca/categorias/pictogramas-por-categoria',
      params: { id, nombre },
    });
  };

  return (
    <TouchableOpacity style={itemStyle} onPress={manejarPresionado}>
      <Text style={emojiStyle}>{imagen}</Text>
      <Text style={textStyle}>{nombre}</Text>
    </TouchableOpacity>
  );
}
