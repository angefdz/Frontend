// components/SelectorImagen.tsx

import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { Alert, Button, Image, View } from 'react-native';

export default function SelectorImagen({
  uriImagen,
  setUriImagen,
}: {
  uriImagen: string;
  setUriImagen: (uri: string) => void;
}) {
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
    Alert.alert('Seleccionar imagen', '¿De dónde quieres sacar la imagen?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Galería', onPress: elegirDesdeGaleria },
      { text: 'Cámara', onPress: tomarFoto },
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
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      {uriImagen ? (
        <Image
          source={{ uri: uriImagen }}
          style={{
            width: 300,
            height: 300,
            borderRadius: 15,
            marginBottom: 10,
            resizeMode: 'cover',
          }}
        />
      ) : null}
      <Button title="Seleccionar imagen" onPress={mostrarOpcionesImagen} />
    </View>
  );
}
