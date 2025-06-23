import { useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import ModalConjugadorVerbo from '@/components/conjugador/ModalConjugadorVerbo';
import BotonesFrase from '@/components/pantallaPrincipal/BotonesFrase';
import BotonVolverCategorias from '@/components/pantallaPrincipal/BotonVolverCategorias';
import GridCategorias from '@/components/pantallaPrincipal/GridCategorias';
import GridPictogramas from '@/components/pantallaPrincipal/GridPictogramas';
import HeaderConfiguracion from '@/components/pantallaPrincipal/HeaderConfiguration';
import SugerenciaPictograma from '@/components/pantallaPrincipal/SugerenciaPictograma';
import TextoFraseExpandibleAnimado from '@/components/pantallaPrincipal/TextoFraseExpandible';

import { useAuth } from '@/context/AuthContext';
import { guardarConfiguracionUsuario } from '@/hooks/configuracion/guardarConfiguracionUsuario';
import { useConfiguracionUsuario } from '@/hooks/configuracion/useConfiguracionUsuario';
import { useFrase } from '@/hooks/frase/useFrase';

import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';

import { useVoz } from '@/context/VozContext';
import { styles } from '@/styles/InicioScreen.styles';
import { PictogramaSimple } from '@/types';

export default function PantallaPrincipal() {
  const { token, usuarioId } = useAuth();
  const navigation = useNavigation();

  const { configuracion, cargandoConfiguracion, errorConfiguracion } = useConfiguracionUsuario(token);
  const { categorias, cargando: cargandoCategorias, error: errorCategorias } = useCategoriasContext();
  const { pictogramas: pictosSinFiltro, cargando: cargandoSinFiltro, error: errorSinFiltro } = usePictogramasContext();

  const {
    frase,
    sugerencia,
    añadirPictograma,
    borrarUltimo,
    resetearFrase,
    reproducirFrase,
  } = useFrase(pictosSinFiltro);

  const [modoAgrupado, setModoAgrupado] = useState(false);
  const [transicionando, setTransicionando] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [verboModal, setVerboModal] = useState<string | null>(null);
  const [configAplicada, setConfigAplicada] = useState(false);
  const [todoListo, setTodoListo] = useState(false);

  const { tipoVoz } = useVoz();

  const renderHeaderRight = () => (
    <HeaderConfiguracion
      modoAgrupado={modoAgrupado}
      manejarCambioAgrupado={manejarCambioAgrupado}
      manejarVolverCategorias={manejarVolverCategorias}
      setItemsPerPage={setItemsPerPage}
      itemsPerPage={itemsPerPage}
    />
  );

  const pictosFiltrados = categoriaSeleccionada
    ? categorias.find(c => c.id.toString() === categoriaSeleccionada)?.pictogramas ?? []
    : [];

  const deduplicarPorId = (pictos: PictogramaSimple[]): PictogramaSimple[] => {
    const vistos = new Set<number>();
    return pictos.filter((p) => {
      if (vistos.has(p.id)) return false;
      vistos.add(p.id);
      return true;
    });
  };

  const pictogramas = deduplicarPorId(categoriaSeleccionada ? pictosFiltrados : pictosSinFiltro);

  const cargandoPictos = categoriaSeleccionada ? false : cargandoSinFiltro;
  const errorPictogramas = categoriaSeleccionada ? null : errorSinFiltro;

  useEffect(() => {
    setTodoListo(
      !!token &&
      !!usuarioId &&
      !cargandoConfiguracion &&
      !cargandoCategorias &&
      !cargandoPictos &&
      !errorConfiguracion &&
      !errorCategorias &&
      !errorPictogramas
    );
  }, [
    token,
    usuarioId,
    cargandoConfiguracion,
    cargandoCategorias,
    cargandoPictos,
    errorConfiguracion,
    errorCategorias,
    errorPictogramas,
  ]);

  useEffect(() => {
    if (configuracion && !configAplicada) {
      setModoAgrupado(configuracion.mostrarPorCategoria);
      setItemsPerPage(configuracion.botonesPorPantalla);
      setConfigAplicada(true);
    }
  }, [configuracion, configAplicada]);

  useEffect(() => {
    if (!configAplicada || !configuracion || !usuarioId || !token) return;

    setTransicionando(true);

    const nuevaConfig = {
      id: configuracion.id,
      botonesPorPantalla: itemsPerPage,
      mostrarPorCategoria: modoAgrupado,
      tipoVoz,
    };

    guardarConfiguracionUsuario(token, nuevaConfig)
      .catch((err) => {
        console.error('❌ Error al actualizar configuración:', err);
      })
      .finally(() => {
        setTimeout(() => setTransicionando(false), 200);
      });
  }, [itemsPerPage, modoAgrupado, configuracion, usuarioId, token, configAplicada]);

  const manejarCambioAgrupado = (nuevoValor: boolean) => {
    setTransicionando(true);
    setCategoriaSeleccionada(null);
    setTimeout(() => {
      setModoAgrupado(nuevoValor);
      setTransicionando(false);
    }, 150);
  };

  const manejarSeleccionCategoria = (id: string) => {
    setTransicionando(true);
    setTimeout(() => {
      setCategoriaSeleccionada(id);
      setTransicionando(false);
    }, 150);
  };

  const manejarVolverCategorias = () => {
    setTransicionando(true);
    setTimeout(() => {
      setCategoriaSeleccionada(null);
      setTransicionando(false);
    }, 150);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerRight: renderHeaderRight,
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

{sugerencia && (
  <SugerenciaPictograma
    sugerencia={sugerencia}
    usarSugerencia={() =>
      sugerencia.tipo === 'verbo'
        ? setVerboModal(sugerencia.nombre)
        : añadirPictograma(sugerencia.nombre)
    }
    itemsPerPage={itemsPerPage}
  />
)}


        {transicionando ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <ActivityIndicator size="large" color="#666" />
          </View>
        ) : (
          <View>
            {modoAgrupado && !categoriaSeleccionada && (
              <GridCategorias
                categorias={categorias}
                itemsPerPage={itemsPerPage}
                onSeleccionar={manejarSeleccionCategoria}
              />
            )}
            {modoAgrupado && categoriaSeleccionada && (
              <>
                <BotonVolverCategorias onPress={manejarVolverCategorias} />
                {pictogramas.length === 0 ? (
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
          </View>
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
