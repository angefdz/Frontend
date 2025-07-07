import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';

interface Props {
  readonly valor: string;
  readonly setValor: (texto: string) => void;
  readonly placeholder?: string;
}

const { width } = Dimensions.get('window');

export default function BarraBusqueda({
  valor,
  setValor,
  placeholder = 'Buscar...',
}: Props) {
  return (
    <View style={styles.contenedor}>
      <Feather name="search" size={width * 0.05} color="#999" style={styles.icono}  accessibilityElementsHidden
  importantForAccessibility="no"/>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#333"
        value={valor}
        onChangeText={setValor}
        accessible
        accessibilityRole="search"
        accessibilityLabel="Barra de búsqueda"
        accessibilityHint="Introduce texto para filtrar los resultados"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: width * 0.03,
    paddingHorizontal: width * 0.04,
    paddingVertical: width * 0.025,
    marginTop: width * 0.025,
    marginBottom: width * 0.04,
    marginHorizontal: width * 0.04,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icono: {
    marginRight: width * 0.02,
  },
  input: {
    flex: 1,
    fontSize: width * 0.045,
    color: '#333',
  },
});
