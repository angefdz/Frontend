import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import { styles as bibliotecaStyles } from '@/styles/BibliotecaScreen.styles';
import BarraBusqueda from './BarraBusqueda';
import BotonPrincipal from './BotonPrincipal';
import ItemSeleccionable from './ItemSeleccionable';

type Props<T> = {
  visible: boolean;
  onClose: () => void;
  items: T[];
  seleccionados: number[];
  setSeleccionados: React.Dispatch<React.SetStateAction<number[]>>;
  getId: (item: T) => number;
  getNombre: (item: T) => string;
  getImagen: (item: T) => string;
  titulo?: string;
};

export default function SelectorItemsModal<T>({
  visible,
  onClose,
  items,
  seleccionados,
  setSeleccionados,
  getId,
  getNombre,
  getImagen,
  titulo = 'Selecciona elementos',
}: Props<T>) {
  const [busqueda, setBusqueda] = useState('');

  const filtrados = useMemo(() => {
    return items.filter((item) =>
      getNombre(item).toLowerCase().includes(busqueda.toLowerCase())
    );
  }, [items, busqueda]);

  const toggleSeleccion = useCallback((id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, [setSeleccionados]);

  const renderItem = useCallback(
    ({ item }: { item: T }) => {
      const id = getId(item);
      return (
        <ItemSeleccionable
          nombre={getNombre(item)}
          imagen={getImagen(item)}
          seleccionado={seleccionados.includes(id)}
          onPress={() => toggleSeleccion(id)}
          itemStyle={bibliotecaStyles.item}
          textStyle={bibliotecaStyles.itemText}
        />
      );
    },
    [seleccionados, getId, getNombre, getImagen, toggleSeleccion]
  );

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={modalStyles.modal}
    >
      <View style={[modalStyles.modalContent, bibliotecaStyles.container]}>
        <Text style={modalStyles.titulo}>{titulo}</Text>

        <BarraBusqueda valor={busqueda} setValor={setBusqueda} />

        <FlatList
          data={filtrados}
          keyExtractor={(item) => getId(item).toString()}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'flex-start' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={bibliotecaStyles.flat}
          extraData={seleccionados} // 👈 Esto ayuda a que se actualice eficientemente
        />

        <BotonPrincipal texto="Confirmar selección" onPress={onClose} />
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 10,
  },
});
