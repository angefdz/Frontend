
import { styles } from '@/styles/BibliotecaScreen.styles';
import { ActivityIndicator, Text, View } from 'react-native';

export default function LoaderPictograma() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>Cargando pictograma...</Text>
    </View>
  );
}
