import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import BotonesFrase from '@/components/pantallaPrincipal/BotonesFrase';
import BotonVolverCategorias from '@/components/pantallaPrincipal/BotonVolverCategorias';
import FraseActual from '@/components/pantallaPrincipal/FraseActual';
import GridCategorias from '@/components/pantallaPrincipal/GridCategorias';
import GridPictogramas from '@/components/pantallaPrincipal/GridPictogramas';
import MenuConfiguracion from '@/components/pantallaPrincipal/MenuConfiguracion';
import SugerenciaPictograma from '@/components/pantallaPrincipal/SugerenciaPictograma';

import { categorias } from '@/data/categorias';
import { useProtegerPantalla } from '@/hooks/auth/autorizacion/useProtegerPantalla';
import { usePictogramas } from '@/hooks/biblioteca/usePictogramas';
import { useFrase } from '@/hooks/frase/useFrase';
import { styles } from '@/styles/InicioScreen.styles';

export default function PantallaPrincipal() {
  const { token, cargandoToken } = useProtegerPantalla();
  const navigation = useNavigation();

  const {
    frase,
    sugerencia,
    añadirPictograma,
    borrarUltimo,
    resetearFrase,
    reproducirFrase,
    usarSugerencia,
  } = useFrase();

  const [modoAgrupado, setModoAgrupado] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const { pictogramas, cargando } = usePictogramas(); // Hook que trae pictogramas del backend

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: () => (
        <MenuConfiguracion
          modoAgrupado={modoAgrupado}
          setModoAgrupado={setModoAgrupado}
          resetearCategoria={() => setCategoriaSeleccionada(null)}
          setItemsPerPage={setItemsPerPage}
          itemsPerPage={itemsPerPage}
        />
      ),
    });
  }, [navigation, modoAgrupado, itemsPerPage]);

  if (cargandoToken || cargando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!token) return null;

  // const pictosFiltrados = modoAgrupado
//   ? categoriaSeleccionada
//     ? pictogramas.filter((p) =>
//         (p.categorias ?? []).includes(Number(categoriaSeleccionada))
//       )
//     : []
//   : pictogramas;

const pictosFiltrados = pictogramas; // Mostrar todos los pictogramas siempre


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
      <FraseActual frase={frase} />

      <BotonesFrase
        borrarUltimo={borrarUltimo}
        resetearFrase={resetearFrase}
        reproducirFrase={reproducirFrase}
      />

      <SugerenciaPictograma
        sugerencia={sugerencia}
        usarSugerencia={usarSugerencia}
      />

      {modoAgrupado && !categoriaSeleccionada && (
        <GridCategorias
          categorias={categorias}
          itemsPerPage={itemsPerPage}
          onSeleccionar={(id) => setCategoriaSeleccionada(id)}
        />
      )}

      {modoAgrupado && categoriaSeleccionada && (
        <>
          <BotonVolverCategorias onPress={() => setCategoriaSeleccionada(null)} />
          <GridPictogramas
            pictogramas={pictosFiltrados}
            itemsPerPage={itemsPerPage}
            onSeleccionar={añadirPictograma}
          />
        </>
      )}

      {!modoAgrupado && (
        <GridPictogramas
          pictogramas={pictosFiltrados}
          itemsPerPage={itemsPerPage}
          onSeleccionar={añadirPictograma}
        />
      )}
    </ScrollView>
  );
}
