import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';

import BotonPrincipal from '@/components/comunes/BotonPrincipal';
import ItemSeleccionable from '@/components/comunes/ItemSeleccionable';
import { usePictogramas } from '@/hooks/biblioteca/usePictogramas';
import { styles } from '@/styles/BibliotecaScreen.styles';

export default function SeleccionarPictogramasScreen() {
  const router = useRouter();
  const { seleccionados } = useLocalSearchParams<{ seleccionados?: string }>();

  const [seleccionadosIds, setSeleccionadosIds] = useState<number[]>([]);
  const [busqueda, setBusqueda] = useState('');

  const { pictogramas, cargando } = usePictogramas();

  useEffect(() => {
    if (seleccionados) {
      try {
        const ids = JSON.parse(seleccionados);
        setSeleccionadosIds(Array.isArray(ids) ? ids : []);
      } catch {
        setSeleccionadosIds([]);
      }
    }
  }, [seleccionados]);

  const toggleSeleccion = (id: number) => {
    setSeleccionadosIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const manejarConfirmar = () => {
    router.push({
      pathname: '/biblioteca/categorias/crear-categoria',
      params: { seleccionados: JSON.stringify(seleccionadosIds) },
    });
  };

  const pictogramasFiltrados = useMemo(() => {
    return pictogramas.filter((pic) =>
      pic.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [busqueda, pictogramas]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar pictograma..."
        value={busqueda}
        onChangeText={setBusqueda}
        style={{
          margin: 16,
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          backgroundColor: 'white',
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {pictogramasFiltrados.map((pic) => (
            <ItemSeleccionable
              key={pic.id}
              nombre={pic.nombre}
              imagen={pic.imagen}
              seleccionado={seleccionadosIds.includes(pic.id)}
              onPress={() => toggleSeleccion(pic.id)}
              itemStyle={styles.item}
              textStyle={styles.itemText}
            />
          ))}
        </View>
      </ScrollView>

      <BotonPrincipal texto="Confirmar selección" onPress={manejarConfirmar} />
    </View>
  );
}
