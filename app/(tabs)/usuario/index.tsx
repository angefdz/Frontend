import { useAuth } from '@/context/AuthContext';
import { useConfiguracionUsuario } from '@/hooks/configuracion/useConfiguracionUsuario';
import { useDescargarHistorialCsv } from '@/hooks/frase/useDescargarHistorialCsv';
import { useUsuarioActual } from '@/hooks/usuario/useUsuarioActual';
import { styles } from '@/styles/PerfilScreen.styles';

import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
  Alert,
  Button, Dimensions, ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';
const { width } = Dimensions.get('window');
export default function PerfilScreen() {
  const router = useRouter();
  const { token, cerrarSesion } = useAuth();
  const { usuario, recargarUsuario, error: errorUsuario } = useUsuarioActual();
  const {
    configuracion,
    recargarConfiguracion,
    errorConfiguracion,
  } = useConfiguracionUsuario(token);

  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();
  const { marcarPictogramasComoDesactualizados } = usePictogramasContext();

  const { descargarHistorial } = useDescargarHistorialCsv();

  const recargarTodo = () => {
    recargarUsuario();
    recargarConfiguracion();
  };

  const manejarCerrarSesion = () => {
    Alert.alert('Cerrar sesión', '¿Estás segura de que quieres cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        style: 'destructive',
        onPress: () => {
          cerrarSesion();
          marcarCategoriasComoDesactualizadas();
          marcarPictogramasComoDesactualizados();
          router.replace('/inicio-sesion');
        },
      },
    ]);
  };

  const manejarDescargarHistorial = () => {
    descargarHistorial();
  };

  const manejarEliminarCuenta = () => {
    Alert.alert(
      'Eliminar cuenta',
      '¿Estás segura de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_BASE_URL}/usuarios/me`,
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 204) {
                Alert.alert('Cuenta eliminada', 'Tu cuenta ha sido eliminada correctamente.');
                router.replace('/inicio-sesion');
              } else {
                Alert.alert('Error', 'No se pudo eliminar la cuenta.');
              }
            } catch (error) {
              console.error('Error al eliminar cuenta:', error);
              Alert.alert('Error', 'Hubo un problema al eliminar la cuenta.');
            }
          },
        },
      ]
    );
  };

  useFocusEffect(useCallback(() => { recargarTodo(); }, []));

  const errorActual = errorUsuario ?? errorConfiguracion;

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContainer, { paddingBottom: 64 }]}
      showsVerticalScrollIndicator={false}
    >
      {errorActual && (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text style={{ color: 'red', marginBottom: 8 }}>{errorActual}</Text>
          <Button title="Reintentar" onPress={recargarTodo} />
        </View>
      )}

      <View style={styles.iconoEditarContainer}>
        <TouchableOpacity
          onPress={() => router.push('/usuario/editar-perfil')}
          accessibilityRole="button"
          accessibilityLabel="Editar perfil"
        >
          <Feather name="edit-2" size={width * 0.06} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={usuario?.nombre ?? ''}
        editable={false}
        placeholder="Nombre"
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={styles.input}
        value={usuario?.correo ?? ''}
        editable={false}
        placeholder="Correo"
      />

      <Text style={styles.label}>Voz</Text>
      <TextInput
        style={styles.input}
        value={configuracion?.tipoVoz ?? ''}
        editable={false}
        placeholder="Tipo de voz"
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/usuario/pictogramas-ocultos')}>
        <Text style={styles.buttonText}>Pictogramas ocultos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={manejarDescargarHistorial}>
        <Text style={styles.buttonText}>Historial</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/usuario/cambiar-password')}>
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#FF3B30' }]} onPress={manejarCerrarSesion}>
        <Text style={[styles.buttonText, { color: '#fff' }]}>Cerrar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#8E8E93' }]} onPress={manejarEliminarCuenta}>
        <Text style={[styles.buttonText, { color: '#fff' }]}>Eliminar cuenta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
