import { categorias } from '@/data/categorias';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function CrearPictogramaScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

  const toggleCategoria = (id: number) => {
    setSeleccionadas(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const manejarCrear = () => {
    if (!nombre || !imagen) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Aquí iría la lógica para guardar el pictograma
    Alert.alert('Éxito', 'Pictograma creado correctamente');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Crear nuevo pictograma</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre del pictograma"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Emoji o imagen"
        value={imagen}
        onChangeText={setImagen}
      />

      <Text style={styles.sectionTitle}>Añadir a categorías</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.horizontalRow}>
          {categorias.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[
                styles.item,
                {
                  backgroundColor: seleccionadas.includes(cat.id)
                    ? '#007AFF'
                    : '#F0F0F0',
                },
              ]}
              onPress={() => toggleCategoria(cat.id)}
            >
              <Text style={styles.itemEmoji}>{cat.imagen}</Text>
              <Text style={styles.itemText}>{cat.nombre}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity onPress={manejarCrear} style={styles.verMasButton}>
        <Text style={styles.verMasText}>Crear</Text>
      </TouchableOpacity>
    </View>
  );
}
