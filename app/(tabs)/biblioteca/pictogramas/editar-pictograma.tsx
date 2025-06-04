import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import CategoriaSeleccionable from '@/components/biblioteca/categorias/CategoriaSeleccionable';
import SelectorImagen from '@/components/comunes/SelectorImagen';
import { categorias } from '@/data/categorias';
import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/BibliotecaScreen.styles';

export default function EditarPictogramaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const pictograma = pictogramas.find(p => p.id === Number(id));

  const [nombre, setNombre] = useState(pictograma?.palabra || '');
  const [imagen, setImagen] = useState(
    typeof pictograma?.imagen === 'string' ? pictograma.imagen : ''
  );
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

    Alert.alert('Éxito', 'Pictograma actualizado');
    router.back();
  };

  if (!pictograma) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={{ backgroundColor: '#fff' }}
        contentContainerStyle={{ padding: 20 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionTitle}>Editar pictograma</Text>

        <SelectorImagen uriImagen={imagen} setUriImagen={setImagen} />

        <TextInput
          style={styles.input}
          placeholder="Nombre del pictograma"
          value={nombre}
          onChangeText={setNombre}
        />

        <Text style={styles.sectionTitle}>Categorías</Text>

        <View style={{ maxHeight: 300, marginBottom: 16 }}>
          <ScrollView showsVerticalScrollIndicator={true}>
            <View style={styles.grid}>
              {categorias.map(cat => (
                <CategoriaSeleccionable
                  key={cat.id}
                  categoria={cat}
                  seleccionada={seleccionadas.includes(cat.id)}
                  onPress={() => toggleCategoria(cat.id)}
                  itemStyle={styles.item}
                  emojiStyle={styles.itemEmoji}
                  textStyle={styles.itemText}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        <TouchableOpacity onPress={manejarGuardar} style={styles.verMasButton}>
          <Text style={styles.verMasText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
