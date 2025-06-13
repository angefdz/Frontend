import { useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import ModalConjugadorVerbo from '@/components/conjugador/ModalConjugadorVerbo';
import BotonesFrase from '@/components/pantallaPrincipal/BotonesFrase';
import BotonVolverCategorias from '@/components/pantallaPrincipal/BotonVolverCategorias';
import GridCategorias from '@/components/pantallaPrincipal/GridCategorias';
import GridPictogramas from '@/components/pantallaPrincipal/GridPictogramas';
import MenuConfiguracion from '@/components/pantallaPrincipal/MenuConfiguracion';
import SugerenciaPictograma from '@/components/pantallaPrincipal/SugerenciaPictograma';
import TextoFraseExpandibleAnimado from '@/components/pantallaPrincipal/TextoFraseExpandible';

import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import { useCategoriasVisibles } from '@/hooks/biblioteca/useCategoriasVisibles';
import { usePictogramasVisibles } from '@/hooks/biblioteca/usePictogramasVisibles';
import { guardarConfiguracionUsuario } from '@/hooks/configuracion/guardarConfiguracionUsuario';
import { useConfiguracionUsuario } from '@/hooks/configuracion/useConfiguracionUsuario';
import { useFrase } from '@/hooks/frase/useFrase';
import { usePictogramasPorCategoria } from '@/hooks/pantallaPrincipal/usePictogramasPorCategoria';

import { styles } from '@/styles/InicioScreen.styles';
import { PictogramaSimple } from '@/types';

export default function PantallaPrincipal() {
  const { token, usuarioId, cargandoToken } = useAutorizarAcceso();
  const navigation = useNavigation();

  const {
    configuracion,
    cargandoConfiguracion,
    errorConfiguracion,
  } = useConfiguracionUsuario(token);

  const tipoVoz = configuracion?.tipoVoz ?? 'femenina';

  const {
    frase,
    añadirPictograma,
    borrarUltimo,
    resetearFrase,
    reproducirFrase,
    usarSugerencia,
  } = useFrase(tipoVoz);

  const [modoAgrupado, setModoAgrupado] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [verboModal, setVerboModal] = useState<string | null>(null);

  const sugerencia = {
    id: 999,
    nombre: 'Comer',
    imagen: 'https://static.arasaac.org/pictograms/38351/38351_500.png',
    tipo: 'verbo',
  };
  const {
    categorias,
    cargando: cargandoCategorias,
    error: errorCategorias,
    recargar: cargarCategorias,
  } = useCategoriasVisibles();

  const {
    pictogramas: pictosSinFiltro,
    cargando: cargandoSinFiltro,
    error: errorSinFiltro,
    recargar: recargarSinFiltro,
  } = usePictogramasVisibles();

  const {
    pictogramas: pictosFiltrados,
    cargando: cargandoFiltrados,
    error: errorFiltrados,
    recargar: recargarFiltrados,
  } = usePictogramasPorCategoria(categoriaSeleccionada);

  const pictogramas = categoriaSeleccionada ? pictosFiltrados : pictosSinFiltro;
  const cargandoPictos = categoriaSeleccionada ? cargandoFiltrados : cargandoSinFiltro;
  const errorPictogramas = categoriaSeleccionada ? errorFiltrados : errorSinFiltro;

  const [configAplicada, setConfigAplicada] = useState(false);
  const [todoListo, setTodoListo] = useState(false);

  useEffect(() => {
    if (
      !cargandoToken &&
      !cargandoConfiguracion &&
      !cargandoCategorias &&
      !cargandoPictos &&
      !errorConfiguracion &&
      !errorCategorias &&
      !errorPictogramas &&
      token &&
      usuarioId
    ) {
      setTodoListo(true);
    } else {
      setTodoListo(false);
    }
  }, [
    cargandoToken,
    cargandoConfiguracion,
    cargandoCategorias,
    cargandoPictos,
    errorConfiguracion,
    errorCategorias,
    errorPictogramas,
    token,
    usuarioId,
  ]);

  useFocusEffect(
    useCallback(() => {
      cargarCategorias();
    }, [cargarCategorias])
  );

  useEffect(() => {
    if (categoriaSeleccionada) {
      recargarFiltrados();
    } else {
      recargarSinFiltro();
    }
  }, [categoriaSeleccionada, recargarFiltrados, recargarSinFiltro]);

  useEffect(() => {
    if (configuracion && !configAplicada) {
      setModoAgrupado(configuracion.mostrarPorCategoria);
      setItemsPerPage(configuracion.botonesPorPantalla);
      setConfigAplicada(true);
    }
  }, [configuracion, configAplicada]);

  useEffect(() => {
    if (!configAplicada || !configuracion || !usuarioId || !token) return;

    const nuevaConfig = {
      id: configuracion.id,
      botonesPorPantalla: itemsPerPage,
      mostrarPorCategoria: modoAgrupado,
      tipoVoz: configuracion.tipoVoz,
    };

    guardarConfiguracionUsuario(token, nuevaConfig).catch((err) => {
      console.error('❌ Error al actualizar configuración:', err);
    });
  }, [itemsPerPage, modoAgrupado, configuracion, usuarioId, token, configAplicada]);

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

  const manejarSeleccion = (p: PictogramaSimple) => {
    if (p.tipo === 'verbo') {
      setVerboModal(p.nombre);
    } else {
      añadirPictograma(p.nombre);
    }
  };

  if (!todoListo) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Text>Cargando configuración...</Text>
      </View>
    );
  }

  if (!token || !usuarioId || errorConfiguracion || errorCategorias || errorPictogramas) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' }}>
        <Text style={{ color: 'red' }}>Error al cargar datos del usuario.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={[styles.container, { flex: 1 }]} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <TextoFraseExpandibleAnimado frase={frase} />

        <BotonesFrase
          borrarUltimo={borrarUltimo}
          resetearFrase={resetearFrase}
          reproducirFrase={reproducirFrase}
        />

        <SugerenciaPictograma
          sugerencia={sugerencia}
          usarSugerencia={() =>
            sugerencia.tipo === 'verbo'
              ? setVerboModal(sugerencia.nombre)
              : añadirPictograma(sugerencia.nombre)
          }
          itemsPerPage={itemsPerPage}
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
            {cargandoPictos ? (
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={{ marginTop: 10 }}>Cargando pictogramas...</Text>
              </View>
            ) : pictogramas.length === 0 ? (
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 16, color: '#666', fontStyle: 'italic' }}>
                  No hay pictogramas en esta categoría.
                </Text>
              </View>
            ) : (
              <GridPictogramas
                pictogramas={pictogramas}
                itemsPerPage={itemsPerPage}
                onSeleccionar={manejarSeleccion}
              />
            )}
          </>
        )}
        {!modoAgrupado && (
          <GridPictogramas
            pictogramas={pictogramas}
            itemsPerPage={itemsPerPage}
            onSeleccionar={manejarSeleccion}
          />
        )}
      </ScrollView>

      {verboModal && (
        <ModalConjugadorVerbo
          visible={true}
          verbo={verboModal}
          onClose={() => setVerboModal(null)}
          onConfirm={(forma) => añadirPictograma(forma)}
        />
      )}
    </View>
  );
}
