import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import CabeceraSeccion from '@/components/comunes/CabeceraSeccion';
import InputTexto from '@/components/comunes/InputTexto';
import ItemSeleccionable from '@/components/comunes/ItemSeleccionable';
import ListaItems from '@/components/comunes/ListaItems';
import SelectorImagen from '@/components/comunes/SelectorImagen';
import SelectorItemsModal from '@/components/comunes/SelectorItemsModel';

import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import { useActualizarCategoria } from '@/hooks/biblioteca/useActualizarCategoria';
import { useCategoriasConPictogramas } from '@/hooks/biblioteca/useCategoriasConPictogramas';
import { usePictogramas } from '@/hooks/biblioteca/usePictogramas';
import { usePictogramasPorIds } from '@/hooks/biblioteca/usePictogramasPorIds';

import { styles } from '@/styles/BibliotecaScreen.styles';

export default function EditarCategoriaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { categorias, cargando } = useCategoriasConPictogramas();
  const { pictogramas: pictogramasDisponibles } = usePictogramas();
  const { actualizarCategoria } = useActualizarCategoria();
  const { token } = useAutorizarAcceso();

  const categoria = categorias.find((c) => c.id === Number(id));

  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState<number[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [datosInicializados, setDatosInicializados] = useState(false);

  const { pictogramas: pictogramasAsignados, loading: cargandoPictos, error } =
    usePictogramasPorIds(pictogramasSeleccionados, token);

  useEffect(() => {
    if (categoria && !datosInicializados) {
      setNombre(categoria.nombre);
      setImagen(categoria.imagen);
      setPictogramasSeleccionados(categoria.pictogramas.map((p) => p.id));
      setDatosInicializados(true);
    }
  }, [categoria, datosInicializados]);

  const manejarGuardar = async () => {
    if (!categoria?.usuarioId) {
      Alert.alert('No permitido', 'No se puede editar una categoría general.');
      return;
    }

    if (!nombre || !imagen) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const datos = {
      nombre,
      imagen,
      pictogramas: pictogramasSeleccionados,
    };

    try {
      await actualizarCategoria(id!, datos);
      Alert.alert('Éxito', 'Categoría actualizada correctamente');
      router.back();
    } catch {
      Alert.alert('Error', 'No se pudo actualizar la categoría');
    }
  };

  if (cargando || !categoria) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 32 }}>Cargando...</Text>
      </View>
    );
  }

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

      {cargandoPictos ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          Cargando pictogramas...
        </Text>
      ) : error ? (
        <Text style={{ marginHorizontal: 16, color: 'red' }}>
          {error}
        </Text>
      ) : pictogramasAsignados.length === 0 ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          No hay pictogramas añadidos aún.
        </Text>
      ) : (
        <ListaItems
          items={pictogramasAsignados}
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

      <BotonPrincipal texto="Guardar" onPress={manejarGuardar} />

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
