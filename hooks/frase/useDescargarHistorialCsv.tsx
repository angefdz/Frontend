import { useAuth } from '@/context/AuthContext';
import axios from '@/hooks/utils/axiosInstance';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

export const useDescargarHistorialCsv = () => {
  const { token } = useAuth();

  const descargarHistorial = async () => {
    try {
      const response = await axios.get('/frases/descargar', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'text', 
      });

      const csvContent = response.data;

      const fileUri = FileSystem.documentDirectory + 'historial_frases.csv';
      await FileSystem.writeAsStringAsync(fileUri, csvContent, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Compartir historial de frases',
      });
    } catch (error) {
      console.error('Error al descargar historial:', error);
      Alert.alert('Error', 'No se pudo descargar el historial. Inténtalo más tarde.');
    }
  };

  return { descargarHistorial };
};
