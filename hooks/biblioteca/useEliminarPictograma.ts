import axios from 'axios';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const useEliminarPictograma = () => {
  const router = useRouter();

  const eliminarPictograma = async (
    pictogramaId: number,
    token: string | null,
    esPersonalizado: boolean,
    onEliminado?: () => void 
  ) => {
    if (!token || !pictogramaId) return;

    if (!esPersonalizado) {
      Alert.alert('Pictograma general', 'Este pictograma no se puede eliminar.');
      return;
    }

    Alert.alert(
      '¿Eliminar pictograma?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await axios.delete(`${API_BASE_URL}/pictogramas/${pictogramaId}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              Alert.alert('Eliminado', 'El pictograma se ha eliminado correctamente.');
              router.back();

              if (onEliminado) onEliminado(); 
            } catch (err) {
              console.error('Error al eliminar pictograma:', err);
              Alert.alert('Error', 'No se pudo eliminar el pictograma.');
            }
          },
        },
      ]
    );
  };

  return { eliminarPictograma };
};
