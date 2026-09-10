import BarraBusqueda from '@/components/comunes/BarraBusqueda';
import ListaFiltrada from '@/components/comunes/ListaFiltrada';
import { useAuth } from '@/context/AuthContext';
import { usePictogramasContext } from '@/context/PictogramasContext';
import { styles } from '@/styles/GaleriaScreen.styles';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const tamanyoBoton = width * 0.14;

export default function PictogramasScreen() {
  const { tr, localize } = useLanguage();
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

  const filtrados = pictogramas.filter(item =>
    localize(item).toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{tr('Todos los pictogramas')}</Text>

      <BarraBusqueda valor={busqueda} setValor={setBusqueda} />

      {cargando ? (
        <ActivityIndicator size="large" color="#3157A4" style={{ marginTop: 20 }} />
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

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: height * 0.03,
          right: width * 0.05,
          backgroundColor: '#3157A4',
          borderRadius: tamanyoBoton / 2,
          width: tamanyoBoton,
          height: tamanyoBoton,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
        onPress={() => router.push('/biblioteca/pictogramas/crear-pictograma')}
        accessibilityRole="button"
        accessibilityLabel={tr('Crear pictograma')}
      >
        <Feather name="plus" size={tamanyoBoton * 0.5} color="white" />
      </TouchableOpacity>
    </View>
  );
}
