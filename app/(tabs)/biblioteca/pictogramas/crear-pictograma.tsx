import CategoriaSeleccionable from '@/components/biblioteca/categorias/CategoriaSeleccionable';
import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import CabeceraSeccion from '@/components/comunes/CabeceraSeccion';
import InputTexto from '@/components/comunes/InputTexto';
import ListaGenerica from '@/components/comunes/ListaItems';
import SelectorImagen from '@/components/comunes/SelectorImagen';
import { categorias } from '@/data/categorias';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, View } from 'react-native';

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

    // Aquí solo guardamos en memoria local
    Alert.alert('Éxito', 'Pictograma creado correctamente');
    router.back();
  };

  return (
    <View style={styles.container}>
      <CabeceraSeccion texto="Crear nuevo pictograma" />

      <SelectorImagen uriImagen={imagen} setUriImagen={setImagen} />

      <InputTexto
        placeholder="Nombre del pictograma"
        valor={nombre}
        setValor={setNombre}
      />

      <CabeceraSeccion texto="Añadir a categorías" />

      <ListaGenerica
        items={categorias}
        renderItem={(cat) => (
          <CategoriaSeleccionable
            categoria={cat}
            seleccionada={seleccionadas.includes(cat.id)}
            onPress={() => toggleCategoria(cat.id)}
            itemStyle={styles.item}
            emojiStyle={styles.itemEmoji}
            textStyle={styles.itemText}
          />
        )}
      />

      <BotonPrincipal texto="Crear" onPress={manejarCrear} />
    </View>
  );
}
