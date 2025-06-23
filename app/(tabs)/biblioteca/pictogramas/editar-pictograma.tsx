import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import CabeceraSeccion from '@/components/comunes/CabeceraSeccion';
import InputTexto from '@/components/comunes/InputTexto';
import ItemSeleccionable from '@/components/comunes/ItemSeleccionable';
import ListaItems from '@/components/comunes/ListaItems';
import SelectorImagen from '@/components/comunes/SelectorImagen';
import SelectorItemsModal from '@/components/comunes/SelectorItemsModel';

import { useAuth } from '@/context/AuthContext'; // ✅ NUEVO
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';

import { useCategoriasPorIds } from '@/hooks/biblioteca/useCategoriaPorIds';
import { useCategoriasConPictogramas } from '@/hooks/biblioteca/useCategoriasConPictogramas';

import { styles } from '@/styles/BibliotecaScreen.styles';
import { PictogramaConCategorias } from '@/types';

export default function EditarPictogramaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { token } = useAuth(); // ✅ CAMBIO

  const { categorias: categoriasDisponibles } = useCategoriasConPictogramas();
  const { marcarPictogramasComoDesactualizados } = usePictogramasContext();
  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();

  const [pictograma, setPictograma] = useState<PictogramaConCategorias | null>(null);
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [tipo, setTipo] = useState<'verbo' | 'sustantivo'>('sustantivo');
  const [openTipo, setOpenTipo] = useState(false);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<number[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(true);

  const { categorias, loading: cargandoCats } = useCategoriasPorIds(
    categoriasSeleccionadas,
    token
  );

  const esPersonalizado = Boolean(pictograma?.usuarioId);

  useEffect(() => {
    const cargarDatos = async () => {
      if (!id || !token) return;
      setCargando(true);

      try {
        const res = await axios.get(
          `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas/${id}/con-categorias`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        
        const data: PictogramaConCategorias = res.data;

        setPictograma(data);
        setNombre(data.nombre);
        setImagen(data.imagen);
        setTipo(data.tipo as 'verbo' | 'sustantivo');
        setCategoriasSeleccionadas(data.categorias.map((c) => c.id));
      } catch (error) {
        Alert.alert('Error', 'No se pudo cargar el pictograma');
        router.back();
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, [id, token]);

  const manejarGuardar = async () => {
    if (!nombre || !imagen || !tipo) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    try {
      await axios.put(
        `${process.env.EXPO_PUBLIC_API_BASE_URL}/pictogramas/${id}`,
        {
          nombre,
          imagen,
          tipo,
          categorias: categoriasSeleccionadas,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      marcarPictogramasComoDesactualizados();
      marcarCategoriasComoDesactualizadas();

      Alert.alert('Éxito', 'Pictograma actualizado correctamente');
      router.back();
    } catch (error) {
      console.error('❌ Error al actualizar:', error);
      Alert.alert('Error', 'No se pudo actualizar el pictograma');
    }
  };

  if (cargando || !pictograma) {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 32, textAlign: 'center' }}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CabeceraSeccion texto="Editar pictograma" />
      {!esPersonalizado && (
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
    Este es un pictograma general. No puedes editar su nombre, imagen ni tipo, pero sí puedes modificar sus categorías.
  </Text>
)}

      <SelectorImagen
        uriImagen={imagen}
        setUriImagen={setImagen}
        disabled={!esPersonalizado}
      />

      <InputTexto
        placeholder="Nombre del pictograma"
        valor={nombre}
        setValor={setNombre}
        disabled={!esPersonalizado}
      />

      <Text style={styles.sectionTitle}>Tipo</Text>
      <Text
  accessibilityRole="text"
  accessibilityLabel="Selector del tipo de pictograma"
  style={styles.sectionTitle}
>
  Tipo
</Text>

<DropDownPicker
  open={openTipo}
  value={tipo}
  items={[
    { label: 'Verbo', value: 'verbo' },
    { label: 'Sustantivo', value: 'sustantivo' },
  ]}
  setOpen={setOpenTipo}
  setValue={setTipo}
  setItems={() => {}}
  placeholder="Selecciona tipo"
  style={[
    styles.dropdown,
    !esPersonalizado && { backgroundColor: '#F0F0F0' },
  ]}
  dropDownContainerStyle={styles.dropdownContainer}
  textStyle={[
    styles.dropdownText,
    !esPersonalizado && { color: '#999999' },
  ]}
  disabled={!esPersonalizado}
/>


      <CabeceraSeccion texto="Categorías asignadas" />

      {cargandoCats ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          Cargando categorías...
        </Text>
      ) : categorias.length === 0 ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          No hay categorías añadidas aún.
        </Text>
      ) : (
        <ListaItems
          items={categorias}
          gap={10}
          renderItem={(cat) => (
            <ItemSeleccionable
              key={cat.id}
              nombre={cat.nombre}
              imagen={cat.imagen}
              seleccionado={true}
              onPress={() =>
                setCategoriasSeleccionadas((prev) =>
                  prev.filter((x) => x !== cat.id)
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
        accessibilityRole="button"
  accessibilityLabel="Añadir categorías"
      >
        <Text style={styles.verMasText}>+ Añadir categorías</Text>
      </TouchableOpacity>

      <BotonPrincipal texto="Guardar" onPress={manejarGuardar} />

      <SelectorItemsModal
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        items={categoriasDisponibles}
        seleccionados={categoriasSeleccionadas}
        setSeleccionados={setCategoriasSeleccionadas}
        getId={(c) => c.id}
        getNombre={(c) => c.nombre}
        getImagen={(c) => c.imagen}
        titulo="Selecciona categorías"
      />
    </ScrollView>
  );
}
