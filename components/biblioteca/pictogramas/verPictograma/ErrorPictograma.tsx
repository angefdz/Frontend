// components/biblioteca/pictogramas/ErrorPictograma.tsx
import { Text, View } from 'react-native';
import { styles } from '@/styles/BibliotecaScreen.styles';

interface Props {
  mensaje: string;
}

export default function ErrorPictograma({ mensaje }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{mensaje}</Text>
    </View>
  );
}
