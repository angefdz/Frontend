import { styles } from '@/styles/BibliotecaScreen.styles';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  titulo: string;
  onAddPress: () => void;
}

export default function CabeceraSeccion({ titulo, onAddPress }: Props) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{titulo}</Text>
      <TouchableOpacity onPress={onAddPress}>
        <Text style={styles.addButton}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}
