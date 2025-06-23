import { styles } from '@/styles/BibliotecaScreen.styles';
import { Feather } from '@expo/vector-icons';
import { Text, TextStyle, TouchableOpacity, View } from 'react-native';

interface Props {
  titulo: string;
  onAddPress?: () => void;
  tituloStyle?: TextStyle;
}

export default function CabeceraSeccion({ titulo, onAddPress, tituloStyle }: Props) {
  return (
    <View style={styles.sectionHeader}>
      <Text
        style={[styles.sectionTitle, tituloStyle]}
        allowFontScaling
      >
        {titulo}
      </Text>

      {onAddPress && (
        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={onAddPress}
            accessible
            accessibilityRole="button"
            accessibilityLabel={`Añadir ${titulo.toLowerCase()}`}
          >
            <Feather name="plus" style={styles.addButton} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
