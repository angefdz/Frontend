// components/biblioteca/pictogramas/ImagenPictograma.tsx
import { Image, View } from 'react-native';

interface Props {
  uri: string;
}

export default function ImagenPictograma({ uri }: Props) {
  return (
    <View style={{ alignItems: 'center', marginBottom: 20 }}>
      <Image
        source={{ uri }}
        style={{ width: 150, height: 150 }}
        resizeMode="contain"
      />
    </View>
  );
}
