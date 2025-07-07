import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

import { styles as bibliotecaStyles } from '@/styles/BibliotecaScreen.styles';
import { TouchableOpacity } from 'react-native';
import BarraBusqueda from './BarraBusqueda';
import BotonPrincipal from './BotonPrincipal';
import ItemSeleccionable from './ItemSeleccionable';

type Props<T> = {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly items: T[];
  readonly seleccionados: number[];
  readonly setSeleccionados: React.Dispatch<React.SetStateAction<number[]>>;
  readonly getId: (item: T) => number;
  readonly getNombre: (item: T) => string;
  readonly getImagen: (item: T) => string;
  readonly titulo?: string;
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
  }, [items, busqueda, getNombre]);

  const toggleSeleccion = useCallback((id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, [setSeleccionados]);

  const renderItem = useCallback(
    (props: { item: T }) => {
      const item = props.item;
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
      
      <View
  style={[modalStyles.modalContent, bibliotecaStyles.container]}
  accessibilityViewIsModal={true}
  accessibilityLabel={titulo}
>
  <TouchableOpacity
  onPress={onClose}
  accessibilityRole="button"
  accessibilityLabel="Cerrar selector"
  style={modalStyles.botonCerrar}
>
  <Text style={modalStyles.textoCerrar}>Cerrar</Text>
</TouchableOpacity>

  <Text
    style={modalStyles.titulo}
    accessibilityRole="header"
  >
    {titulo}
  </Text>


        <BarraBusqueda valor={busqueda} setValor={setBusqueda} />

        <FlatList
          data={filtrados}
          keyExtractor={(item) => getId(item).toString()}
          renderItem={renderItem}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'flex-start' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={bibliotecaStyles.flat}
          extraData={seleccionados}
        />

<BotonPrincipal
  texto="Confirmar selección"
  onPress={onClose}
  hint="Cierra el selector y guarda la selección actual"
/>

      </View>
    </Modal>
  );
}

import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#fff',
    paddingTop: width * 0.06,         // antes 30
    paddingBottom: width * 0.05,      // antes 20
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  titulo: {
    fontSize: width * 0.05,           // antes 18
    fontWeight: 'bold',
    marginLeft: width * 0.04,         // antes 16
    marginBottom: width * 0.025,      // antes 10
  },
  botonCerrar: {
    alignSelf: 'flex-end',
    marginRight: width * 0.04,
    marginBottom: width * 0.02,
    padding: width * 0.015,
  },
  
  textoCerrar: {
    fontSize: width * 0.04,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  
});
