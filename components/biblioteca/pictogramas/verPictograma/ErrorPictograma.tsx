// components/biblioteca/pictogramas/ErrorPictograma.tsx
import { styles } from '@/styles/BibliotecaScreen.styles';
import { Text, View } from 'react-native';

interface Props {
  readonly mensaje: string;
}

export default function ErrorPictograma({ mensaje }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{mensaje}</Text>
    </View>
  );
}
