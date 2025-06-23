import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface Props {
  readonly valor: string;
  readonly setValor: (texto: string) => void;
  readonly placeholder?: string;
}

export default function BarraBusqueda({
  valor,
  setValor,
  placeholder = 'Buscar...',
}: Props) {
  return (
    <View style={styles.contenedor}>
      <Feather name="search" size={20} color="#999" style={styles.icono} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#333"
        value={valor}
        onChangeText={setValor}
        accessible
        accessibilityRole="search"
        accessibilityLabel="Barra de búsqueda"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icono: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});
