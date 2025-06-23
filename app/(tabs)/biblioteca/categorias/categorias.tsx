import BarraBusqueda from '@/components/comunes/BarraBusqueda';
import ItemClicable from '@/components/comunes/ItemClicable';
import { useCategoriasContext } from '@/context/CategoriasContext';
import { styles } from '@/styles/GaleriaScreen.styles';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function CategoriasScreen() {
  const router = useRouter();
  const { categorias, cargando, error } = useCategoriasContext();
  const [busqueda, setBusqueda] = useState('');

  const filtradas = categorias.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Todas las categorías</Text>

      <BarraBusqueda valor={busqueda} setValor={setBusqueda} />

      {cargando ? (
        <ActivityIndicator size="large" color="#999" style={{ marginTop: 20 }} />
      ) : error ? (
        <Text style={{ color: 'red', marginTop: 20 }}>{error}</Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ alignItems: 'flex-start' }}>
            <View style={styles.grid}>
              {filtradas.map((item) => (
                <ItemClicable
                  key={item.id}
                  nombre={item.nombre}
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

      {/* Botón flotante para crear categoría */}
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
        onPress={() => router.push('/biblioteca/categorias/crear-categoria')
          
        }
        accessible
  accessibilityRole="button"
  accessibilityLabel="Crear nueva categoría"
      >
        <Feather name="plus" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
