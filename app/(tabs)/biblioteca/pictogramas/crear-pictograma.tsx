import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import InputTexto from '@/components/comunes/InputTexto';
import ItemSeleccionable from '@/components/comunes/ItemSeleccionable';
import ListaItems from '@/components/comunes/ListaItems';
import SelectorImagen from '@/components/comunes/SelectorImagen';
import SelectorItemsModal from '@/components/comunes/SelectorItemsModel';

import { useAuth } from '@/context/AuthContext';
import { crearPictogramaUsuario } from '@/hooks/biblioteca/crearPictogramaUsuario';
import { subirImagenCloudinary } from '@/hooks/utils/subirImagenCloudinary';

import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';

import { styles } from '@/styles/BibliotecaScreen.styles';

export default function CrearPictogramaScreen() {
  const router = useRouter();
  const { token, usuarioId } = useAuth();
  const cargandoToken = !token || !usuarioId;

  const { categorias: categoriasDisponibles } = useCategoriasContext();
  const { marcarPictogramasComoDesactualizados } = usePictogramasContext();
  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();

  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [tipo, setTipo] = useState<'verbo' | 'sustantivo'>('sustantivo');

  const [subiendo, setSubiendo] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<number[]>([]);

  const categoriasAsignadas = categoriasDisponibles.filter(cat =>
    categoriasSeleccionadas.includes(cat.id)
  );

  const quitarCategoria = (id: number) => {
    setCategoriasSeleccionadas((prev) => prev.filter((x) => x !== id));
  };

  const manejarCrear = async () => {
    if (!nombre || !imagen || !tipo) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (cargandoToken) {
      Alert.alert('Espere', 'Autenticando usuario, inténtalo de nuevo en un momento');
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
        categoriasSeleccionadas,
        token
      );

      marcarPictogramasComoDesactualizados();
      marcarCategoriasComoDesactualizadas();

      Alert.alert('Éxito', 'Pictograma creado correctamente');
      router.back();
    } catch (error) {
      console.error('❌ Error al crear pictograma:', error);
      Alert.alert('Error', 'No se pudo crear el pictograma');
    } finally {
      setSubiendo(false);
    }
  };

  if (cargandoToken) {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 32, textAlign: 'center' }}>
          Cargando datos de usuario...
        </Text>
      </View>
    );
  }

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 20,
        }}
        accessible
        accessibilityLabel="Selecciona el tipo de palabra"
      >
        {['verbo', 'sustantivo'].map((opcion) => (
          <TouchableOpacity
            key={opcion}
            onPress={() => setTipo(opcion as 'verbo' | 'sustantivo')}
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: tipo === opcion ? '#007AFF' : '#ccc',
              backgroundColor: tipo === opcion ? '#007AFF' : '#fff',
            }}
            accessibilityRole="button"
            accessibilityLabel={`Seleccionar tipo ${opcion}`}
          >
            <Text
              style={{
                color: tipo === opcion ? '#fff' : '#333',
                fontWeight: 'bold',
              }}
            >
              {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Categorías asignadas</Text>

      {categoriasAsignadas.length === 0 ? (
        <Text style={{ marginHorizontal: 16, fontStyle: 'italic' }}>
          No hay categorías añadidas aún.
        </Text>
      ) : (
        <ListaItems
          items={categoriasAsignadas}
          gap={10}
          renderItem={(cat) => (
            <ItemSeleccionable
              key={cat.id}
              nombre={cat.nombre}
              imagen={cat.imagen}
              seleccionado={true}
              onPress={() => quitarCategoria(cat.id)}
              itemStyle={styles.item}
              textStyle={styles.itemText}
            />
          )}
        />
      )}

      <TouchableOpacity
        onPress={() => setMostrarModal(true)}
        style={styles.verMasButton}
        accessibilityLabel="Botón para añadir categorías"
        accessibilityRole="button"
      >
        <Text style={styles.verMasText}>+ Añadir categorías</Text>
      </TouchableOpacity>

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

      <BotonPrincipal
        texto={subiendo ? 'Creando...' : 'Crear pictograma'}
        onPress={manejarCrear}
      />
    </ScrollView>
  );
}
