import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import CabeceraSeccion from '@/components/comunes/CabeceraSeccion';
import InputTexto from '@/components/comunes/InputTexto';
import SelectorImagen from '@/components/comunes/SelectorImagen';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';

export default function CrearCategoriaScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');

  const manejarCrear = () => {
    if (!nombre || !imagen) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Aquí iría la lógica para guardar la categoría
    Alert.alert('Éxito', 'Categoría creada correctamente');
    router.back();
  };

  return (
    <View style={styles.container}>
      <CabeceraSeccion texto="Crear nueva categoría" />

      <SelectorImagen uriImagen={imagen} setUriImagen={setImagen} />

      <InputTexto
        placeholder="Nombre de la categoría"
        valor={nombre}
        setValor={setNombre}
      />

      <BotonPrincipal texto="Crear" onPress={manejarCrear} />
    </View>
  );
}
