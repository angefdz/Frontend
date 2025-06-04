import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

import PictogramaVisual from '@/components/biblioteca/pictogramas/PictogramaVisual';
import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import CabeceraSeccion from '@/components/comunes/CabeceraSeccion';
import InputTexto from '@/components/comunes/InputTexto';
import ListaGenerica from '@/components/comunes/ListaItems';
import SelectorImagen from '@/components/comunes/SelectorImagen';

import { categorias } from '@/data/categorias';
import { pictogramas } from '@/data/pictogramas';
import { styles } from '@/styles/BibliotecaScreen.styles';

export default function EditarCategoriaScreen() {
  const router = useRouter();
  const { id, seleccionados } = useLocalSearchParams<{ id?: string; seleccionados?: string }>();

  const categoria = categorias.find((c) => c.id === Number(id));

  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState<number[]>([]);

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre);
      setImagen(categoria.imagen);
      setPictogramasSeleccionados(categoria.pictogramas || []);
    } else {
      Alert.alert('Error', 'Categoría no encontrada');
      router.back();
    }
  }, [categoria]);

  useEffect(() => {
    if (seleccionados) {
      try {
        const nuevos = JSON.parse(seleccionados);
        if (Array.isArray(nuevos)) {
          setPictogramasSeleccionados(nuevos);
        }
      } catch {}
    }
  }, [seleccionados]);

  const manejarGuardar = () => {
    if (!nombre || !imagen) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    // Aquí iría la lógica de guardado real en el backend o en estado global
    Alert.alert('Éxito', 'Categoría actualizada correctamente');
    router.back();
  };

  const manejarAñadir = () => {
    router.push({
      pathname: '/biblioteca/categorias/seleccionar-pictogramas',
      params: { seleccionados: JSON.stringify(pictogramasSeleccionados) },
    });
  };

  const pictogramasMostrados = pictogramas.filter((p) =>
    pictogramasSeleccionados.includes(p.id)
  );

  if (!categoria) return null;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CabeceraSeccion texto="Editar categoría" />

      <SelectorImagen uriImagen={imagen} setUriImagen={setImagen} />

      <InputTexto
        placeholder="Nombre de la categoría"
        valor={nombre}
        setValor={setNombre}
      />

      <CabeceraSeccion texto="Pictogramas en esta categoría" />

      {pictogramasMostrados.length === 0 ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          No hay pictogramas añadidos aún.
        </Text>
      ) : (
        <ListaGenerica
          items={pictogramasMostrados}
          renderItem={(pic) => (
            <PictogramaVisual
              palabra={pic.palabra}
              imagen={pic.imagen}
              itemStyle={styles.item}
              emojiStyle={styles.itemEmoji}
              textStyle={styles.itemText}
            />
          )}
        />
      )}

      <TouchableOpacity onPress={manejarAñadir} style={styles.verMasButton}>
        <Text style={styles.verMasText}>+ Añadir pictogramas</Text>
      </TouchableOpacity>

      <BotonPrincipal texto="Guardar" onPress={manejarGuardar} />
    </ScrollView>
  );
}
