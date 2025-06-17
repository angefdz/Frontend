import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
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

import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import { crearCategoriaUsuario } from '@/hooks/biblioteca/crearCategoriaUsuario';
import { usePictogramasPorIds } from '@/hooks/biblioteca/usePictogramasPorIds';
import { subirImagenCloudinary } from '@/hooks/utils/subirImagenCloudinary';

import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';

import { styles } from '@/styles/BibliotecaScreen.styles';

export default function CrearCategoriaScreen() {
  const router = useRouter();
  const { token, usuarioId } = useAutorizarAcceso();
  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();
  const {
    pictogramas: pictogramasDisponibles,
    cargando: cargandoDisponibles,
    marcarPictogramasComoDesactualizados,
  } = usePictogramasContext();

  const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState<number[]>([]);

  const { pictogramas, loading: cargandoPictos } = usePictogramasPorIds(
    pictogramasSeleccionados,
    token
  );

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
      console.error('❌ Error al crear categoría:', error);
      Alert.alert('Error', 'No se pudo crear la categoría');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Crear nueva categoría</Text>

      <SelectorImagen uriImagen={imagen} setUriImagen={setImagen} />

      <InputTexto
        placeholder="Nombre de la categoría"
        valor={nombre}
        setValor={setNombre}
      />

      <Text style={styles.sectionTitle}>Pictogramas asignados</Text>

      {cargandoPictos ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          Cargando pictogramas...
        </Text>
      ) : pictogramas.length === 0 ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          No hay pictogramas añadidos aún.
        </Text>
      ) : (
        <ListaItems
          items={pictogramas}
          gap={10}
          renderItem={(pic) => (
            <ItemSeleccionable
              key={pic.id}
              nombre={pic.nombre}
              imagen={pic.imagen}
              seleccionado={true}
              onPress={() =>
                setPictogramasSeleccionados((prev) =>
                  prev.filter((x) => x !== pic.id)
                )
              }
              itemStyle={styles.item}
              textStyle={styles.itemText}
            />
          )}
        />
      )}

      <TouchableOpacity
        onPress={() => setMostrarModal(true)}
        style={styles.verMasButton}
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
