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

import { styles } from '@/styles/BibliotecaScreen.styles';
import { CategoriaConPictogramas } from '@/types';
import { Dimensions } from 'react-native';
import { useLanguage } from '@/context/LanguageContext';
const { width } = Dimensions.get('window');
const textoSize = width * 0.035;

export default function EditarCategoriaScreen() {
  const { tr, language, localize } = useLanguage();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { token } = useAuth();
  const { categorias: categoriasDisponibles, marcarCategoriasComoDesactualizadas } = useCategoriasContext();
  const { pictogramas: pictogramasDisponibles, marcarPictogramasComoDesactualizados } = usePictogramasContext();

  const [categoria, setCategoria] = useState<CategoriaConPictogramas | null>(null);
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState('');
  const [pictogramasSeleccionados, setPictogramasSeleccionados] = useState<number[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [datosInicializados, setDatosInicializados] = useState(false);

  useEffect(() => {
    if (!categoria && id) {
      const encontrada = categoriasDisponibles.find((c) => c.id === Number(id));
      if (encontrada) {
        setCategoria(encontrada);
      }
    }
  }, [categoriasDisponibles, id, categoria]);

  useEffect(() => {
    if (categoria && !datosInicializados) {
      setNombre(categoria.nombre);
      setImagen(categoria.imagen);
      const idsUnicos = [...new Set(categoria.pictogramas.map((p) => p.id))];
      setPictogramasSeleccionados(idsUnicos);
      setDatosInicializados(true);
    }
  }, [categoria, datosInicializados]);

  const manejarGuardar = async () => {
    if (!id || !token || !categoria) return;

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
      Alert.alert('Error', 'No se pudo actualizar la categoría');
    }
  };

  const handleQuitarPictograma = (id: number) => {
    setPictogramasSeleccionados((prev) => prev.filter((x) => x !== id));
  };

  if (!categoria) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 32 }}>{tr('Cargando...')}</Text>
      </View>
    );
  }

  const esGeneral = !categoria.usuarioId;

  const pictogramasSeleccionadosDatos = pictogramasDisponibles.filter((p) =>
    pictogramasSeleccionados.includes(p.id)
  );

  const pictogramasOrdenados = [
    ...pictogramasSeleccionadosDatos,
    ...pictogramasDisponibles.filter((p) => !pictogramasSeleccionados.includes(p.id)),
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <CabeceraSeccion texto={tr('Editar categoría')} />

      {esGeneral && (
  <View
    style={{
      marginHorizontal: width * 0.05, 
      backgroundColor: '#f2f2f2',
      borderRadius: 10,
      padding: 12,
      marginBottom: 16,
    }}
  >
    <Text
      style={{
        color: '#444',
        fontSize: textoSize,
        fontStyle: 'italic',
        textAlign: 'center',
      }}
      accessibilityRole="text"
      accessibilityLabel="Aviso: esta es una categoría general. Solo puedes modificar los pictogramas."
    >
      {language === 'en' ? 'This is a general category. You cannot edit its name or image, but you can change its pictograms.' : 'Esta es una categoría general. No puedes editar su nombre ni imagen, pero sí puedes modificar los pictogramas.'}
    </Text>
  </View>
)}

      <SelectorImagen
        uriImagen={imagen}
        setUriImagen={setImagen}
        disabled={esGeneral}
      />

      <InputTexto
        placeholder={tr('Nombre de la categoría')}
        valor={nombre}
        setValor={setNombre}
        disabled={esGeneral}
      />

      <CabeceraSeccion texto={language === 'en' ? 'Assigned pictograms' : 'Pictogramas asignados'} />

      {pictogramasSeleccionadosDatos.length === 0 ? (
        <Text
        style={{ marginHorizontal: 16, fontStyle: 'italic' }}
        accessibilityRole="text"
        accessibilityLabel="Aviso: no hay pictogramas añadidos aún"
      >
        {language === 'en' ? 'No pictograms have been added yet.' : 'No hay pictogramas añadidos aún.'}
      </Text>
      
      ) : (
        <ListaItems
          items={pictogramasSeleccionadosDatos}
          gap={10}
          renderItem={(pic) => (
            <ItemSeleccionable
              key={pic.id}
              nombre={localize(pic)}
              imagen={pic.imagen}
              seleccionado={true}
              onPress={() => handleQuitarPictograma(pic.id)}
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
  accessibilityLabel="Añadir pictogramas"
  accessibilityHint="Abre el selector de pictogramas para añadir nuevos a la categoría"
>
  <Text style={styles.verMasText}>{language === 'en' ? '+ Add pictograms' : '+ Añadir pictogramas'}</Text>
</TouchableOpacity>


      <BotonPrincipal texto={language === 'en' ? 'Save' : 'Guardar'} onPress={manejarGuardar} />

      <SelectorItemsModal
        visible={mostrarModal}
        onClose={() => setMostrarModal(false)}
        items={pictogramasOrdenados}
        seleccionados={pictogramasSeleccionados}
        setSeleccionados={setPictogramasSeleccionados}
        getId={(p) => p.id}
        getNombre={(p) => localize(p)}
        getImagen={(p) => p.imagen}
        titulo={language === 'en' ? 'Select pictograms' : 'Selecciona pictogramas'}
      />
    </ScrollView>
  );
}
