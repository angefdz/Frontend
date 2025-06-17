import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import CabeceraSeccion from '@/components/comunes/CabeceraSeccion';
import InputTexto from '@/components/comunes/InputTexto';
import ItemSeleccionable from '@/components/comunes/ItemSeleccionable';
import ListaItems from '@/components/comunes/ListaItems';
import SelectorImagen from '@/components/comunes/SelectorImagen';
import SelectorItemsModal from '@/components/comunes/SelectorItemsModel';

import { useAuth } from '@/context/AuthContext';
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';
import { useCategoriasConPictogramas } from '@/hooks/biblioteca/useCategoriasConPictogramas';
import { usePictogramasPorIds } from '@/hooks/biblioteca/usePictogramasPorIds';

import { styles } from '@/styles/BibliotecaScreen.styles';
import { CategoriaConPictogramas } from '@/types';

export default function EditarCategoriaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { token } = useAuth();
  const { categorias: categoriasDisponibles, marcarCategoriasComoDesactualizadas } = useCategoriasContext();
  const { pictogramas: pictogramasDisponibles, marcarPictogramasComoDesactualizados } = usePictogramasContext();
  const { categorias } = useCategoriasConPictogramas();

  const [categoria, setCategoria] = useState<CategoriaConPictogramas | null>(null);
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState<number[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [datosInicializados, setDatosInicializados] = useState(false);

  const { pictogramas: pictogramasAsignados, loading: cargandoPictos, error } =
    usePictogramasPorIds(pictogramasSeleccionados); // ✅ token eliminado

  useEffect(() => {
    if (!categoria && id) {
      const encontrada = categorias.find((c) => c.id === Number(id));
      if (encontrada) {
        console.log('🧩 Pictogramas de la categoría encontrada:', encontrada.pictogramas);
        setCategoria(encontrada);
      }
    }
  }, [categorias, id, categoria]);

  useEffect(() => {
    if (categoria && !datosInicializados) {
      setNombre(categoria.nombre);
      setImagen(categoria.imagen);
      const idsUnicos = [...new Set(categoria.pictogramas.map((p) => p.id))];
      setPictogramasSeleccionados(idsUnicos);
      setDatosInicializados(true);
    }
  }, [categoria, datosInicializados]);

  const esGeneral = !categoria?.usuarioId;

  const manejarGuardar = async () => {
    if (!id || !token || !categoria) return;

    if (esGeneral) {
      Alert.alert('No permitido', 'No se puede editar el nombre ni la imagen de una categoría general.');
      return;
    }

    if (!nombre.trim() || !imagen.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      await axios.put(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/categorias/${id}`,
        {
          nombre,
          imagen,
          pictogramas: pictogramasSeleccionados,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      marcarCategoriasComoDesactualizadas();
      marcarPictogramasComoDesactualizados();

      Alert.alert('Éxito', 'Categoría actualizada correctamente');
      router.back();
    } catch (error) {
      console.error('❌ Error al actualizar categoría:', error);
      Alert.alert('Error', 'No se pudo actualizar la categoría');
    }
  };

  if (!categoria) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 32 }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CabeceraSeccion texto="Editar categoría" />

      {esGeneral && (
        <Text
          style={{
            color: '#666',
            fontStyle: 'italic',
            marginBottom: 12,
            textAlign: 'center',
            backgroundColor: '#f0f0f0',
            padding: 10,
            borderRadius: 5,
          }}
        >
          Esta es una categoría general. No puedes editar su nombre ni imagen, pero sí puedes modificar los pictogramas.
        </Text>
      )}

      <SelectorImagen
        uriImagen={imagen}
        setUriImagen={setImagen}
        disabled={esGeneral}
      />

      <InputTexto
        placeholder="Nombre de la categoría"
        valor={nombre}
        setValor={setNombre}
        disabled={esGeneral}
      />

      <CabeceraSeccion texto="Pictogramas asignados" />

      {cargandoPictos ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          Cargando pictogramas...
        </Text>
      ) : error ? (
        <Text style={{ marginHorizontal: 16, color: 'red' }}>{error}</Text>
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
