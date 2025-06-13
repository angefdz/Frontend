import { PictogramaSimple } from '@/types';
import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  sugerencia: PictogramaSimple | null;
  usarSugerencia: () => void;
  itemsPerPage: number;
}

export default function SugerenciaPictograma({
  sugerencia,
  usarSugerencia,
  itemsPerPage,
}: Props) {
  if (!sugerencia) return null;

  const screenWidth = Dimensions.get('window').width;
  const padding = 32;

  // 👇 Aquí se ajusta el tamaño como si fueran 9 si hay 4 en pantalla
  const itemsUsados = itemsPerPage === 4 ? 9 : itemsPerPage;
  const columnas = Math.sqrt(itemsUsados);
  const itemSize = (screenWidth - padding) / columnas;

  return (
    <View style={styles.contenedor}>
      <TouchableOpacity onPress={usarSugerencia} activeOpacity={0.8}>
        <View style={[styles.item, { width: itemSize, height: itemSize }]}>
          <Image
            source={{ uri: sugerencia.imagen }}
            style={styles.imagen}
            resizeMode="contain"
          />
          <Text style={styles.nombre}>{sugerencia.nombre}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignItems: 'center',
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#fffbe6', // sutil diferencia
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#f0b429',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f0b429',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  imagen: {
    width: '90%',
    height: '70%',
  },
  nombre: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    textAlign: 'center',
    color: '#333',
  },
});
