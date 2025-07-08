import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import InputTexto from '@/components/comunes/InputTexto';
import ItemSeleccionable from '@/components/comunes/ItemSeleccionable';
import ListaItems from '@/components/comunes/ListaItems';
import SelectorImagen from '@/components/comunes/SelectorImagen';
import SelectorItemsModal from '@/components/comunes/SelectorItemsModel';

import { crearCategoriaUsuario } from '@/hooks/biblioteca/crearCategoriaUsuario';
import { subirImagenCloudinary } from '@/hooks/utils/subirImagenCloudinary';

import { useAuth } from '@/context/AuthContext';
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';

import { styles } from '@/styles/BibliotecaScreen.styles';

const { width } = Dimensions.get('window');
const paddingResponsive = width * 0.05;
const fontSizeResponsive = width * 0.04;

export default function CrearCategoriaScreen() {
  const router = useRouter();
  const { token, usuarioId } = useAuth();
  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();
  const {
    pictogramas: pictogramasDisponibles,
    cargando: cargandoDisponibles,
    marcarPictogramasComoDesactualizados,
  } = usePictogramasContext();

  const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState<number[]>([]);
  const pictogramas = pictogramasDisponibles.filter((p) =>
    pictogramasSeleccionados.includes(p.id)
  );
  const cargandoPictos = cargandoDisponibles;

  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [subiendo, setSubiendo] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const manejarCrear = async () => {
    if (!nombre || !imagen) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!token || !usuarioId) {
      Alert.alert('Error', 'No se puede autenticar al usuario');
      return;
    }

    try {
      setSubiendo(true);
      let urlFinalImagen = imagen;

      if (!imagen.startsWith('http')) {
        const folder = `tfg/usuarios/${usuarioId}/categorias`;
        urlFinalImagen = await subirImagenCloudinary(imagen, folder);
      }

      await crearCategoriaUsuario(
        nombre,
        urlFinalImagen,
        usuarioId,
        pictogramasSeleccionados,
        token
      );

      marcarCategoriasComoDesactualizadas();
      marcarPictogramasComoDesactualizados();

      Alert.alert('Éxito', 'Categoría creada correctamente');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear la categoría');
    } finally {
      setSubiendo(false);
    }
  };

  const handleQuitarPictograma = (id: number) => {
    setPictogramasSeleccionados((prev) => prev.filter((x) => x !== id));
  };

  let contenidoPictogramas;
  if (cargandoPictos) {
    contenidoPictogramas = (
      <Text
        style={{
          marginHorizontal: paddingResponsive,
          fontStyle: 'italic',
          fontSize: fontSizeResponsive,
        }}
      >
        Cargando pictogramas...
      </Text>
    );
  } else if (pictogramas.length === 0) {
    contenidoPictogramas = (
      <Text
        style={{
          marginHorizontal: paddingResponsive,
          fontStyle: 'italic',
          fontSize: fontSizeResponsive,
          paddingBottom: width * 0.01,
        }}
      >
        No hay pictogramas añadidos aún.
      </Text>
    );
  } else {
    contenidoPictogramas = (
      <ListaItems
        items={pictogramas}
        gap={10}
        renderItem={(pic) => (
          <ItemSeleccionable
            key={pic.id}
            nombre={pic.nombre}
            imagen={pic.imagen}
            seleccionado={true}
            onPress={() => handleQuitarPictograma(pic.id)}
            itemStyle={styles.item}
            textStyle={styles.itemText}
          />
        )}
      />
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Crear nueva categoría</Text>

      <SelectorImagen uriImagen={imagen} setUriImagen={setImagen} />

      <InputTexto
        placeholder="Nombre de la categoría"
        valor={nombre}
        setValor={setNombre}
      />

      <Text style={styles.sectionTitle}>Pictogramas asignados</Text>

      {contenidoPictogramas}

      <TouchableOpacity
        onPress={() => setMostrarModal(true)}
        style={styles.verMasButton}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Añadir pictogramas a la categoría"
      >
        <Text style={styles.verMasText}>+ Añadir pictogramas</Text>
      </TouchableOpacity>

      <BotonPrincipal
        texto={subiendo ? 'Creando...' : 'Crear categoría'}
        onPress={manejarCrear}
      />

      <SelectorItemsModal
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        items={pictogramasDisponibles}
        seleccionados={pictogramasSeleccionados}
        setSeleccionados={setPictogramasSeleccionados}
        getId={(p) => p.id}
        getNombre={(p) => p.nombre}
        getImagen={(p) => p.imagen}
        titulo="Selecciona pictogramas"
      />
    </ScrollView>
  );
}
