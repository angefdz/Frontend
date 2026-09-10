import BarraBusqueda from '@/components/comunes/BarraBusqueda';
import ItemClicable from '@/components/comunes/ItemClicable';
import { useCategoriasContext } from '@/context/CategoriasContext';
import { styles } from '@/styles/GaleriaScreen.styles';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const tamanyoBoton = width * 0.14;

export default function CategoriasScreen() {
  const { tr, localizeCategory } = useLanguage();
  const router = useRouter();
  const { categorias, cargando, error } = useCategoriasContext();
  const [busqueda, setBusqueda] = useState('');

  const filtradas = categorias.filter((item) =>
    localizeCategory(item).toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
       
        <Text
          style={styles.sectionTitle}
          accessibilityRole="header"
        >
          {tr('Todas las categorías')}
        </Text>

        <BarraBusqueda valor={busqueda} setValor={setBusqueda} />

        {cargando ? (
          <ActivityIndicator size="large" color="#3157A4" style={{ marginTop: 20 }} />
        ) : error ? (
          <Text
            style={{ color: 'red', marginTop: 20 }}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: 'flex-start' }}>
              <View style={styles.grid}>
                {filtradas.map((item) => (
                  <ItemClicable
                    key={item.id}
                    nombre={localizeCategory(item)}
                    imagen={item.imagen}
                    itemStyle={styles.item}
                    textStyle={styles.itemText}
                    onPress={() =>
                      router.push({
                        pathname: '/biblioteca/categorias/pictogramas-por-categoria',
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
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '5%',
          backgroundColor: '#3157A4',
          width: tamanyoBoton,
          height: tamanyoBoton,
          borderRadius: tamanyoBoton / 2,
          justifyContent: 'center',
          alignItems: 'center',
          elevation: 5,
        }}
        onPress={() => router.push('/biblioteca/categorias/crear-categoria')}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Crear nueva categoría"
        accessibilityHint="Presiona para abrir el formulario de creación de categoría"
      >
        <Feather
          name="plus"
          size={tamanyoBoton * 0.5}
          color="white"
          accessibilityElementsHidden
          importantForAccessibility="no"
        />
      </TouchableOpacity>
    </View>
  );
}
