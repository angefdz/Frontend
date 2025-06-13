import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity
} from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import InputTexto from '@/components/comunes/InputTexto';
import ItemSeleccionable from '@/components/comunes/ItemSeleccionable';
import ListaItems from '@/components/comunes/ListaItems';
import SelectorImagen from '@/components/comunes/SelectorImagen';
import SelectorItemsModal from '@/components/comunes/SelectorItemsModel';

import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import { crearPictogramaUsuario } from '@/hooks/biblioteca/crearPictogramaUsuario';
import { useCategoriasPorIds } from '@/hooks/biblioteca/useCategoriaPorIds';
import { useCategoriasConPictogramas } from '@/hooks/biblioteca/useCategoriasConPictogramas';
import { subirImagenCloudinary } from '@/hooks/utils/subirImagenCloudinary';

import { styles } from '@/styles/BibliotecaScreen.styles';

export default function CrearPictogramaScreen() {
  const router = useRouter();
  const { token, usuarioId } = useAutorizarAcceso();
  const { categorias: categoriasDisponibles } = useCategoriasConPictogramas();

  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [tipo, setTipo] = useState<'verbo' | 'sustantivo'>('sustantivo');
  const [openTipo, setOpenTipo] = useState(false);

  const [subiendo, setSubiendo] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<number[]>([]);

  const { categorias, loading: cargandoCats } = useCategoriasPorIds(
    categoriasSeleccionadas,
    token
  );

  const manejarCrear = async () => {
    if (!nombre || !imagen || !tipo) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (!token || !usuarioId) {
      Alert.alert('Error', 'No se pudo autenticar al usuario');
      return;
    }

    try {
      setSubiendo(true);
      let urlFinalImagen = imagen;

      if (!imagen.startsWith('http')) {
        const folder = `tfg/usuarios/${usuarioId}/pictogramas`;
        urlFinalImagen = await subirImagenCloudinary(imagen, folder);
      }

      await crearPictogramaUsuario(
        nombre,
        urlFinalImagen,
        tipo,
        usuarioId,
        categoriasSeleccionadas,
        token
      );

      Alert.alert('Éxito', 'Pictograma creado correctamente');
      router.back();
    } catch (error) {
      console.error('❌ Error al crear pictograma:', error);
      Alert.alert('Error', 'No se pudo crear el pictograma');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Crear nuevo pictograma</Text>

      <SelectorImagen uriImagen={imagen} setUriImagen={setImagen} />

      <InputTexto
        placeholder="Nombre del pictograma"
        valor={nombre}
        setValor={setNombre}
      />

      <Text style={styles.sectionTitle}>Tipo</Text>
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
        placeholder="Selecciona el tipo"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
      />

      <Text style={styles.sectionTitle}>Categorías asignadas</Text>

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
      >
        <Text style={styles.verMasText}>+ Añadir categorías</Text>
      </TouchableOpacity>

      <BotonPrincipal
        texto={subiendo ? 'Creando...' : 'Crear pictograma'}
        onPress={manejarCrear}
      />

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
