import { styles } from '@/styles/CabeceraPictograma.styles';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const iconSize = width * 0.06; // responsive

interface Props {
  readonly titulo: string;
  readonly onEditar: () => void;
  readonly onEliminar: () => void;
}

export default function CabeceraCategoria({
  titulo,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <View style={styles.iconos}>
        <TouchableOpacity
          onPress={onEditar}
          style={styles.botonIcono}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Editar categoría"
        >
          <Feather name="edit-3" size={iconSize} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onEliminar}
          style={styles.botonIcono}
          accessible
          accessibilityRole="button"
          accessibilityLabel="Eliminar categoría"
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            size={iconSize}
            color="#FF3B30"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
