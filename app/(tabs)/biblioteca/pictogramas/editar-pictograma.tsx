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
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const paddingVertical = width * 0.025;
const paddingHorizontal = width * 0.05;
const borderRadius = width * 0.02;
const fontSize = width * 0.035;
const textoSize = width * 0.035;
const marginHorizontal = width * 0.04;

import { useAuth } from '@/context/AuthContext';
import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';

import { useCategoriasPorIds } from '@/hooks/biblioteca/useCategoriaPorIds';
import { useCategoriasConPictogramas } from '@/hooks/biblioteca/useCategoriasConPictogramas';

import { styles } from '@/styles/BibliotecaScreen.styles';
import { PictogramaConCategorias } from '@/types';

function SelectorTipo({
  tipo,
  setTipo,
  esPersonalizado,
}: {
  tipo: 'verbo' | 'sustantivo';
  setTipo: (nuevo: 'verbo' | 'sustantivo') => void;
  esPersonalizado: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
        opacity: esPersonalizado ? 1 : 0.5,
      }}
      accessible
      accessibilityLabel="Selecciona el tipo de palabra"
    >
      {['verbo', 'sustantivo'].map((opcion) => {
  const seleccionada = tipo === opcion;
  return (
    <TouchableOpacity
      key={opcion}
      onPress={() => esPersonalizado && setTipo(opcion as 'verbo' | 'sustantivo')}
      style={{
        paddingVertical,
        paddingHorizontal,
        borderRadius,
        borderWidth: 1,
        borderColor: seleccionada ? '#007AFF' : '#ccc',
        backgroundColor: seleccionada ? '#007AFF' : '#fff',
        marginHorizontal: width * 0.015,
      }}
      disabled={!esPersonalizado}
      accessibilityRole="button"
      accessibilityLabel={`Seleccionar tipo ${opcion}`}
    >
      <Text
        style={{
          color: seleccionada ? '#fff' : '#333',
          fontWeight: 'bold',
          fontSize,
        }}
      >
        {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
      </Text>
    </TouchableOpacity>
  );
})}
    </View>
  );
}

export default function EditarPictogramaScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { token } = useAuth();

  const { categorias: categoriasDisponibles } = useCategoriasConPictogramas();
  const { marcarPictogramasComoDesactualizados } = usePictogramasContext();
  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();

  const [pictograma, setPictograma] = useState<PictogramaConCategorias | null>(null);
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [tipo, setTipo] = useState<'verbo' | 'sustantivo'>('sustantivo');
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
        console.error('❌ Error al cargar el pictograma:', error);
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
        <Text style={{ marginTop: 32, textAlign: 'center', fontSize: width* 0.035}}>Cargando...</Text>
      </View>
    );
  }

  const contenidoCategorias = cargandoCats ? (
    <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
      Cargando categorías...
    </Text>
  ) : categorias.length === 0 ? (
    <Text
  style={{
    marginHorizontal,
    fontStyle: 'italic',
    fontSize: textoSize,
    color: '#444',
    paddingBottom: 15
  }}
  accessibilityRole="text"
  accessibilityLabel="Mensaje: no hay categorías añadidas aún."
>
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
            setCategoriasSeleccionadas((prev) => prev.filter((x) => x !== cat.id))
          }
          itemStyle={styles.item}
          textStyle={styles.itemText}
        />
      )}
    />
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CabeceraSeccion texto="Editar pictograma" />

      {!esPersonalizado && (
  <Text
    style={{
      color: '#444',
      fontSize: width * 0.035,
      fontStyle: 'italic',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      padding: width * 0.04,
      marginBottom: width * 0.03,
      borderRadius: width * 0.02,
    }}
    accessibilityRole="text"
    accessibilityLabel="Aviso: este es un pictograma general. Solo puedes modificar las categorías."
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
      <SelectorTipo tipo={tipo} setTipo={setTipo} esPersonalizado={esPersonalizado} />

      <CabeceraSeccion texto="Categorías asignadas" />
      {contenidoCategorias}

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
