import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLanguage } from '@/context/LanguageContext';

const { width } = Dimensions.get('window');
const imagenSize = width * 0.5;

export default function SelectorImagen({
  uriImagen,
  setUriImagen,
  disabled = false,
}: {
  readonly uriImagen: string;
  readonly setUriImagen: (uri: string) => void;
  readonly disabled?: boolean;
}) {
  const { tr, language } = useLanguage();
  useEffect(() => {
    (async () => {
      const galeria = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const camara = await ImagePicker.requestCameraPermissionsAsync();
      if (galeria.status !== 'granted' || camara.status !== 'granted') {
        Alert.alert('Permiso requerido', 'Necesitas permitir acceso a la cámara y galería.');
      }
    })();
  }, []);

  const mostrarOpcionesImagen = () => {
    if (disabled) return;

    Alert.alert(tr('Seleccionar imagen'), language === 'en' ? 'Where would you like to get the image from?' : '¿De dónde quieres sacar la imagen?', [
      { text: tr('Cancelar'), style: 'cancel' },
      { text: language === 'en' ? 'Gallery' : 'Galería', onPress: elegirDesdeGaleria },
      { text: language === 'en' ? 'Camera' : 'Cámara', onPress: tomarFoto },
    ]);
  };

  const elegirDesdeGaleria = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!resultado.canceled) {
      setUriImagen(resultado.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    const resultado = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
    });

    if (!resultado.canceled) {
      setUriImagen(resultado.assets[0].uri);
    }
  };

  return (
    <View style={styles.contenedor}>
      {uriImagen ? (
        <Image
          source={{ uri: uriImagen }}
          style={[styles.imagen, { opacity: disabled ? 0.5 : 1 }]}
          accessibilityElementsHidden={true}
          importantForAccessibility="no"
        />
      ) : null}

      {disabled ? (
        <Text
          style={styles.textoDeshabilitado}
          accessibilityRole="text"
          accessibilityLiveRegion="polite"
        >
          {language === 'en' ? 'Image cannot be edited' : 'Imagen no editable'}
        </Text>
      ) : (
        <TouchableOpacity
          onPress={mostrarOpcionesImagen}
          accessibilityRole="button"
          accessibilityLabel={tr('Seleccionar imagen')}
          accessibilityHint="Presiona para elegir una imagen desde la galería o tomar una foto"
        >
          <Text style={styles.textoLink}>{tr('Seleccionar imagen')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    marginVertical: width * 0.04,
  },
  imagen: {
    width: imagenSize,
    height: imagenSize,
    borderRadius: 15,
    marginBottom: width * 0.03,
    resizeMode: 'cover',
  },
  textoDeshabilitado: {
    color: '#526178',
    fontStyle: 'italic',
    marginBottom: width * 0.03,
    fontSize: width * 0.04,
  },
  textoLink: {
    color: '#3157A4',
    fontSize: width * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
