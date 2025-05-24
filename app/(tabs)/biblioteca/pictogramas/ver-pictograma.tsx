import CategoriaClicable from '@/components/biblioteca/categorias/CategoriaClicable';
import CabeceraPictograma from '@/components/biblioteca/pictogramas/CabeceraPictograma';
import { categorias } from '@/data/categorias';
import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/BibliotecaScreen.styles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

export default function VerPictogramaScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const pictograma = pictogramas.find(p => p.id === Number(id));

  const [oculto, setOculto] = useState(pictograma?.oculto || false);

  if (!pictograma) {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>Pictograma no encontrado</Text>
      </View>
    );
  }

  const categoriasAsignadas = categorias.filter(c =>
    pictograma.categorias?.includes(c.id)
  );

  const manejarToggleVisibilidad = () => {
    Alert.alert(
      oculto ? 'Mostrar pictograma' : 'Ocultar pictograma',
      `¿Seguro que quieres ${oculto ? 'mostrar' : 'ocultar'} este pictograma?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: oculto ? 'Mostrar' : 'Ocultar',
          onPress: () => {
            setOculto(!oculto);
            // Aquí puedes llamar a la API o actualizar la base de datos para persistir el cambio
            console.log(`Pictograma ${!oculto ? 'ocultado' : 'visible'}`);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CabeceraPictograma
        titulo={pictograma.palabra}
        id={pictograma.id}
        oculto={oculto}
        onToggleVisibilidad={manejarToggleVisibilidad}
      />

      {/* Imagen del pictograma */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Text style={styles.itemEmoji}>{pictograma.imagen}</Text>
      </View>

      {/* Categorías en grid con wrap */}
      <Text style={styles.sectionTitle}>Categorías</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {categoriasAsignadas.map((cat) => (
            <CategoriaClicable
              key={cat.id}
              id={cat.id}
              nombre={cat.nombre}
              imagen={cat.imagen}
              itemStyle={styles.item}
              emojiStyle={styles.itemEmoji}
              textStyle={styles.itemText}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
