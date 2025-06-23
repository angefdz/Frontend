import BarraBusqueda from '@/components/comunes/BarraBusqueda';
import ListaFiltrada from '@/components/comunes/ListaFiltrada'; // ← añadido
import { useAuth } from '@/context/AuthContext';
import { usePictogramasContext } from '@/context/PictogramasContext';
import { styles } from '@/styles/GaleriaScreen.styles';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PictogramasScreen() {
  const router = useRouter();
  const { token } = useAuth();

  const {
    pictogramas,
    cargando,
    error,
    recargar,
  } = usePictogramasContext();

  const [busqueda, setBusqueda] = useState('');

  useFocusEffect(
    useCallback(() => {
      if (token) {
        recargar();
      }
    }, [recargar, token])
  );

  const filtrados = pictogramas
    .filter(item => item && item.nombre)
    .filter(item =>
      item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todos los pictogramas</Text>

      <BarraBusqueda valor={busqueda} setValor={setBusqueda} />

      {cargando ? (
        <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
      ) : (
        <ListaFiltrada
          items={filtrados}
          error={error}
          gridStyle={styles.grid}
          itemStyle={styles.item}
          itemTextStyle={styles.itemText}
          onItemPress={(item) =>
            router.push({
              pathname: '/biblioteca/pictogramas/ver-pictograma',
              params: { id: item.id },
            })
          }
        />
      )}

      {/* Botón flotante de crear pictograma */}
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: '#007AFF',
          borderRadius: 30,
          width: 56,
          height: 56,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
        onPress={() => router.push('/biblioteca/pictogramas/crear-pictograma')}
        accessibilityRole="button"
        accessibilityLabel="Crear pictograma"
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
