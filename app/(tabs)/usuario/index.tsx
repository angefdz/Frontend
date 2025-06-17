import { useAuth } from '@/context/AuthContext';
import { useConfiguracionUsuario } from '@/hooks/configuracion/useConfiguracionUsuario';
import { useUsuarioActual } from '@/hooks/usuario/useUsuarioActual';

import { styles } from '@/styles/PerfilScreen.styles';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useCallback, useEffect } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';

export default function PerfilScreen() {
  const router = useRouter();
  const { token, cerrarSesion } = useAuth(); // ← CAMBIO
  const { usuario, recargarUsuario } = useUsuarioActual();
  const { configuracion, recargarConfiguracion } = useConfiguracionUsuario(token);

  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();
  const { marcarPictogramasComoDesactualizados } = usePictogramasContext();

  useEffect(() => {
    console.log('Token actual en PerfilScreen:', token);
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      recargarUsuario();
      recargarConfiguracion();
    }, [])
  );

  const manejarCerrarSesion = () => {
    Alert.alert('Cerrar sesión', '¿Estás segura de que quieres cerrar sesión?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sí',
        style: 'destructive',
        onPress: () => {
          cerrarSesion(); // ← ya no es async
          marcarCategoriasComoDesactualizadas();
          marcarPictogramasComoDesactualizados();
          router.replace('/inicio-sesion');
        },
      },
    ]);
  };

  const manejarDescargarHistorial = async () => {
    const contenido = 'Hola, me gusta\nQuiero agua\nGracias';
    const path = FileSystem.documentDirectory + 'historial.txt';
    await FileSystem.writeAsStringAsync(path, contenido);
    await Sharing.shareAsync(path);
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

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.iconoEditarContainer}>
        <TouchableOpacity onPress={() => router.push('/usuario/editar-perfil')}>
          <Feather name="edit-2" size={24} color="#007AFF" />
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

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/usuario/pictogramas-ocultos')}
      >
        <Text style={styles.buttonText}>Pictogramas ocultos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={manejarDescargarHistorial}>
        <Text style={styles.buttonText}>Historial</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/usuario/cambiar-password')}
      >
        <Text style={styles.buttonText}>Cambiar contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#FF3B30' }]}
        onPress={manejarCerrarSesion}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Cerrar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#8E8E93' }]}
        onPress={manejarEliminarCuenta}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Eliminar cuenta</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
