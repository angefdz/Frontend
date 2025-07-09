
import { Dimensions, Image, View } from 'react-native';

interface Props {
  readonly uri: string;
  readonly nombre: string;
}

const { width } = Dimensions.get('window');
const tamanyo = width * 0.5; 

export default function ImagenPictograma({ uri, nombre }: Props) {
  return (
    <View style={{ alignItems: 'center', marginBottom: width * 0.05 }}>
      <Image
        source={{ uri }}
        style={{ width: tamanyo, height: tamanyo }}
        resizeMode="contain"
        accessibilityRole="image"
        accessibilityLabel={
          nombre
            ? `Imagen del pictograma ${nombre}`
            : 'Imagen del pictograma'
        }
      />
    </View>
  );
}
