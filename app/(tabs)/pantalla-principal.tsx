import { ordered } from '@/utils/pictogramOrder';
import { useOrdenPictogramas } from '@/hooks/pantallaPrincipal/useOrdenPictogramas';
import LayoutAuthentication from '@/components/pantallaPrincipal/LayoutAuthentication';
import { useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

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
import { palette } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';

export default function PantallaPrincipal() {
  const { t, localize } = useLanguage();
  const { token, usuarioId } = useAuth();
  const navigation = useNavigation();
  const editor = useOrdenPictogramas();
  const [dragging, setDragging] = useState(false);

  const { configuracion, cargandoConfiguracion, errorConfiguracion } = useConfiguracionUsuario(token);
  const { categorias, cargando: cargandoCategorias, error: errorCategorias } = useCategoriasContext();
  const { pictogramas: pictosSinFiltro, cargando: cargandoSinFiltro, error: errorSinFiltro } = usePictogramasContext();

  const {
    frase,
    sugerencias,
    cargandoSugerencias,
    añadirPictograma,
    borrarUltimo,
    resetearFrase,
    reproducirFrase,
  } = useFrase(pictosSinFiltro);

  const [modoAgrupado, setModoAgrupado] = useState(false);
  const [transicionando, setTransicionando] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [verboModal, setVerboModal] = useState<PictogramaSimple | null>(null);
  const [configAplicada, setConfigAplicada] = useState(false);
  const [todoListo, setTodoListo] = useState(false);

  const { tipoVoz } = useVoz();

  const renderHeaderRight = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <Pressable accessibilityRole="button" disabled={!editor.ready || editor.busy || dragging}
      onPress={editor.editing ? editor.done : editor.open} style={{ paddingHorizontal: 12, minHeight: 44, justifyContent: 'center' }}>
      <Text style={{ color: palette.primary, fontWeight: '700' }}>{editor.busy ? '…' : editor.editing ? (editor.en ? 'Done' : 'Listo') : (editor.en ? 'Edit' : 'Editar')}</Text>
    </Pressable>
    {!editor.editing && <HeaderConfiguracion
      modoAgrupado={modoAgrupado}
      manejarCambioAgrupado={manejarCambioAgrupado}
      manejarVolverCategorias={manejarVolverCategorias}
      setItemsPerPage={setItemsPerPage}
      itemsPerPage={itemsPerPage}
    />}
    </View>
  );

  const pictogramas = useMemo(() => {
    const source: PictogramaSimple[] = categoriaSeleccionada
      ? categorias.find(c => c.id.toString() === categoriaSeleccionada)?.pictogramas ?? []
      : pictosSinFiltro;
    const vistos = new Set<number>();
    return ordered(source.filter(p => {
      if (vistos.has(p.id)) return false;
      vistos.add(p.id);
      return true;
    }), editor.ids);
  }, [categoriaSeleccionada, categorias, pictosSinFiltro, editor.ids]);

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
  }, [navigation, modoAgrupado, itemsPerPage, editor.editing, editor.ready, editor.busy, editor.ids, editor.dialog, editor.en, dragging]);

  const manejarSeleccion = (p: PictogramaSimple) => {
    if (editor.editing) return;
    if (p.tipo === 'verbo') {
      setVerboModal(p);
    } else {
      añadirPictograma(p);
    }
  };

  if (!todoListo) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: palette.background }}>
        <ActivityIndicator size="large" color={palette.primary} accessibilityLabel="Cargando configuración" />
        <Text style={{ color: palette.textMuted, marginTop: 12 }}>{t('preparing')}</Text>
      </View>
    );
  }

  if (!token || !usuarioId || errorConfiguracion || errorCategorias || errorPictogramas) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: palette.background }}>
        <Text accessibilityRole="alert" style={{ color: palette.error }}>{t('loadError')}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <ScrollView scrollEnabled={!dragging} style={[styles.container, { flex: 1 }]} contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <TextoFraseExpandibleAnimado frase={frase} />

        <BotonesFrase
          borrarUltimo={borrarUltimo}
          resetearFrase={resetearFrase}
          reproducirFrase={reproducirFrase}
        />

{(sugerencias.length > 0 || cargandoSugerencias) && (
  <SugerenciaPictograma
    sugerencias={sugerencias}
    cargando={cargandoSugerencias}
    usarSugerencia={(sugerencia) =>
      sugerencia.tipo === 'verbo' ? setVerboModal(sugerencia) : añadirPictograma(sugerencia)
    }
  />
)}


        {!editor.dialog && !!editor.error && <Pressable onPress={() => { if (!editor.editing) void editor.load(); }} style={{ padding: 12 }}>
          <Text accessibilityRole="alert" style={{ color: palette.error }}>{editor.error}</Text>
        </Pressable>}
        {editor.editing && <View style={{ padding: 10, backgroundColor: palette.surface }}>
          <Text style={{ color: palette.primary }}>{editor.en ? 'Editing layout · Hold and drag. Hold at an edge to change page. Done saves your changes.' : 'Editando teclado · Mantén y arrastra. Mantén en un borde para cambiar de página. Listo guarda los cambios.'}</Text>
          <Pressable onPress={editor.reset} disabled={editor.busy || dragging} accessibilityRole="button" style={{ minHeight: 44, justifyContent: 'center' }}>
            <Text style={{ color: palette.primary }}>{editor.en ? 'Reset pictogram order' : 'Restablecer orden de pictogramas'}</Text>
          </Pressable>
        </View>}
        {!editor.ready ? <ActivityIndicator color={palette.primary} /> : transicionando ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
            <ActivityIndicator size="large" color={palette.primary} />
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
                    <Text style={{ fontSize: 20, color: '#666', fontStyle: 'italic' }}>
                      {t('emptyCategory')}
                    </Text>
                  </View>
                ) : (
                  <GridPictogramas
                    editing={editor.editing && !editor.busy}
                    onReorder={editor.reorder}
                    onDragging={setDragging}
                    pictogramas={pictogramas}
                    itemsPerPage={itemsPerPage}
                    onSeleccionar={manejarSeleccion}
                  />
                )}
              </>
            )}
            {!modoAgrupado && (
              <GridPictogramas
                editing={editor.editing && !editor.busy}
                onReorder={editor.reorder}
                onDragging={setDragging}
                pictogramas={pictogramas}
                itemsPerPage={itemsPerPage}
                onSeleccionar={manejarSeleccion}
              />
            )}
          </View>
        )}
      </ScrollView>

      <LayoutAuthentication editor={editor} />
      {verboModal && (
        <ModalConjugadorVerbo
          visible={true}
          verbo={localize(verboModal)}
          onClose={() => setVerboModal(null)}
          onConfirm={(forma) => añadirPictograma(verboModal, forma)}
        />
      )}
    </View>
  );
}
