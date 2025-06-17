import BarraBusqueda from '@/components/comunes/BarraBusqueda';
import ItemClicable from '@/components/comunes/ItemClicable';
import { useAuth } from '@/context/AuthContext'; // ← CAMBIO
import { usePictogramasContext } from '@/context/PictogramasContext';
import { styles } from '@/styles/GaleriaScreen.styles';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

export default function PictogramasScreen() {
  const router = useRouter();
  const { token } = useAuth(); // ← CAMBIO

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

  const filtrados = pictogramas.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todos los pictogramas</Text>

      <BarraBusqueda valor={busqueda} setValor={setBusqueda} />

      {cargando ? (
        <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'flex-start' }}>
            <View style={styles.grid}>
              {filtrados.map((item) => (
                <ItemClicable
                  key={item.id}
                  nombre={item.nombre}
                  imagen={item.imagen}
                  itemStyle={styles.item}
                  textStyle={styles.itemText}
                  onPress={() =>
                    router.push({
                      pathname: '/biblioteca/pictogramas/ver-pictograma',
                      params: { id: item.id },
                    })
                  }
                />
              ))}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
