import { styles } from '@/styles/BibliotecaScreen.styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CrearCategoriaScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');

  const manejarCrear = () => {
    if (!nombre || !imagen) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Aquí iría la lógica para guardar la nueva categoría
    Alert.alert('Éxito', 'Categoría creada correctamente');
    router.back(); // vuelve a la pantalla anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Crear nueva categoría</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre de la categoría"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Emoji o imagen"
        value={imagen}
        onChangeText={setImagen}
      />

      <TouchableOpacity onPress={manejarCrear} style={styles.verMasButton}>
        <Text style={styles.verMasText}>Crear</Text>
      </TouchableOpacity>
    </View>
  );
}
