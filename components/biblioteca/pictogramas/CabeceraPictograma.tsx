import { styles } from '@/styles/CabeceraPictograma.styles';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  titulo: string;
  id: number;
  oculto: boolean;
  onToggleVisibilidad: () => void;
}

export default function CabeceraPictograma({
  titulo,
  id,
  oculto,
  onToggleVisibilidad,
}: Props) {
  const router = useRouter();

  const manejarEditar = () => {
    router.push({
      pathname: '/biblioteca/pictogramas/editar-pictograma',
      params: { id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <View style={styles.iconos}>
        <TouchableOpacity onPress={onToggleVisibilidad} style={styles.botonIcono}>
          {oculto ? (
            <Feather name="eye" size={24} color="#28A745" />
          ) : (
            <Feather name="eye-off" size={24} color="#DC3545" />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={manejarEditar} style={styles.botonIcono}>
          <Feather name="edit-3" size={24} color="#28A745" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
