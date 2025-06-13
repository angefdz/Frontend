// src/components/comunes/SelectorItemsModal.tsx

import React, { useMemo, useState } from 'react';
import {
    Modal,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';

import { styles } from '@/styles/BibliotecaScreen.styles';
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

  const toggleSeleccion = (id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={[styles.container, { paddingTop: 40 }]}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 16, marginBottom: 10 }}>
          {titulo}
        </Text>

        <TextInput
          placeholder="Buscar..."
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
            {filtrados.map((item) => {
              const id = getId(item);
              return (
                <ItemSeleccionable
                  key={id}
                  nombre={getNombre(item)}
                  imagen={getImagen(item)}
                  seleccionado={seleccionados.includes(id)}
                  onPress={() => toggleSeleccion(id)}
                  itemStyle={styles.item}
                  textStyle={styles.itemText}
                />
              );
            })}
          </View>
        </ScrollView>

        <BotonPrincipal texto="Confirmar selección" onPress={onClose} />
      </View>
    </Modal>
  );
}
