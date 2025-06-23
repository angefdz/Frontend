import { styles } from '@/styles/CabeceraPictograma.styles';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  titulo: string;
  onEditar: () => void;
  onEliminar: () => void;
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
        <TouchableOpacity onPress={onEditar} style={styles.botonIcono} accessible
          accessibilityRole="button"
          accessibilityLabel="Editar categoría">
          <Feather name="edit-3" size={24} color="#007AFF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onEliminar} style={styles.botonIcono} accessible
          accessibilityRole="button"
          accessibilityLabel="Eliminar categoría">
          <MaterialCommunityIcons name="trash-can-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
