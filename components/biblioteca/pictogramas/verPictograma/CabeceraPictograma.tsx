import { styles } from '@/styles/CabeceraPictograma.styles';
import { Feather } from '@expo/vector-icons';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
interface Props {
  readonly titulo: string;
  readonly id: number;
  readonly oculto: boolean;
  readonly onToggleVisibilidad: () => void;
  readonly onEditar?: () => void;
  readonly onEliminar?: () => void;
}

const { width } = Dimensions.get('window');
export default function CabeceraPictograma({
  titulo,
  id,
  oculto,
  onToggleVisibilidad,
  onEditar,
  onEliminar,
}: Props) {
  const { tr } = useLanguage();
  return (
    <View style={{flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',}}>
      <Text style={styles.titulo}>{titulo}</Text>
      <View style={styles.iconos}>
        <TouchableOpacity
          onPress={onToggleVisibilidad}
          style={styles.botonIcono}
          accessibilityRole="button"
          accessibilityLabel={tr(oculto ? 'Mostrar pictograma' : 'Ocultar pictograma')}
        >
          {oculto ? (
            <Feather name="eye" size={width*0.06} color="#0F766E" />
          ) : (
            <Feather name="eye-off" size={width*0.06} color="#B42318" />
          )}
        </TouchableOpacity>

        {onEditar && (
          <TouchableOpacity
            onPress={onEditar}
            style={styles.botonIcono}
            accessibilityRole="button"
            accessibilityLabel={tr('Editar pictograma')}
          >
            <Feather name="edit-3" size={width*0.06} color="#0F766E" />
          </TouchableOpacity>
        )}

        {onEliminar && (
          <TouchableOpacity
            onPress={onEliminar}
            style={styles.botonIcono}
            accessibilityRole="button"
            accessibilityLabel="Eliminar pictograma"
          >
            <Feather name="trash-2" size={width*0.06} color="#B42318" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
