import CategoriaClicable from '@/components/biblioteca/categorias/CategoriaClicable';
import SelectorImagen from '@/components/comunes/SelectorImagen';
import { categorias } from '@/data/categorias';
import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditarPictogramaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const pictograma = pictogramas.find(p => p.id === Number(id));

  const [nombre, setNombre] = useState(pictograma?.palabra || '');
  const [imagen, setImagen] = useState(pictograma?.imagen || '');
  const [seleccionadas, setSeleccionadas] = useState<number[]>(pictograma?.categorias || []);

  useEffect(() => {
    if (!pictograma) {
      Alert.alert('Error', 'Pictograma no encontrado');
      router.back();
    }
  }, [pictograma, router]);

  const toggleCategoria = (idCategoria: number) => {
    setSeleccionadas(prev =>
      prev.includes(idCategoria)
        ? prev.filter(x => x !== idCategoria)
        : [...prev, idCategoria]
    );
  };

  const manejarGuardar = () => {
    if (!nombre || !imagen) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }
    // Aquí iría la lógica para guardar la actualización en backend o estado global
    Alert.alert('Éxito', 'Pictograma actualizado');
    router.back();
  };

  if (!pictograma) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Editar pictograma</Text>

      <SelectorImagen uriImagen={imagen} setUriImagen={setImagen} />

      <TextInput
        style={styles.input}
        placeholder="Nombre del pictograma"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.sectionTitle}>Categorías</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {categorias.map(cat => (
            <CategoriaClicable
              key={cat.id}
              id={cat.id}
              nombre={cat.nombre}
              imagen={cat.imagen}
              itemStyle={styles.item}
              emojiStyle={styles.itemEmoji}
              textStyle={styles.itemText}
              seleccionada={seleccionadas.includes(cat.id)}
              onPress={() => toggleCategoria(cat.id)}
            />
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity onPress={manejarGuardar} style={styles.verMasButton}>
        <Text style={styles.verMasText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}
