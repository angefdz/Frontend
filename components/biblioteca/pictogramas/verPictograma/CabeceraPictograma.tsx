import { styles } from '@/styles/CabeceraPictograma.styles';
import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  readonly titulo: string;
  readonly id: number;
  readonly oculto: boolean;
  readonly onToggleVisibilidad: () => void;
  readonly onEditar?: () => void;
  readonly onEliminar?: () => void;
}

export default function CabeceraPictograma({
  titulo,
  id,
  oculto,
  onToggleVisibilidad,
  onEditar,
  onEliminar,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <View style={styles.iconos}>
      <TouchableOpacity
  onPress={onToggleVisibilidad}
  style={styles.botonIcono}
  accessibilityRole="button"
  accessibilityLabel={oculto ? 'Mostrar pictograma' : 'Ocultar pictograma'}
>
  {oculto ? (
    <Feather name="eye" size={24} color="#28A745" />
  ) : (
    <Feather name="eye-off" size={24} color="#DC3545" />
  )}
</TouchableOpacity>

        {onEditar && (
          <TouchableOpacity onPress={onEditar} style={styles.botonIcono} accessibilityRole="button"
          accessibilityLabel="Editar pictograma">
            <Feather name="edit-3" size={24} color="#28A745" />
          </TouchableOpacity>
        )}

        {onEliminar && (
          <TouchableOpacity onPress={onEliminar} style={styles.botonIcono}accessibilityRole="button"
          accessibilityLabel="Eliminar pictograma">
            <Feather name="trash-2" size={24} color="#DC3545" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
