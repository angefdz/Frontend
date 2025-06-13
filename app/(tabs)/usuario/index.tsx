import { useAutorizarAcceso } from '@/hooks/auth/autorizacion/useAutorizarAcceso';
import { useConfiguracionUsuario } from '@/hooks/configuracion/useConfiguracionUsuario';
import { useUsuarioActual } from '@/hooks/usuario/useUsuarioActual';

import { styles } from '@/styles/PerfilScreen.styles';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useCallback } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function PerfilScreen() {
  const router = useRouter();
  const { token } = useAutorizarAcceso();
  const { usuario, recargarUsuario } = useUsuarioActual();
  const { configuracion, recargarConfiguracion } = useConfiguracionUsuario(token);

  // ✅ Reacciona cada vez que esta pantalla entra en foco
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
        onPress: () => router.replace('/inicio-sesion'),
      },
    ]);
  };

  const manejarDescargarHistorial = async () => {
    const contenido = 'Hola, me gusta\nQuiero agua\nGracias';
    const path = FileSystem.documentDirectory + 'historial.txt';
    await FileSystem.writeAsStringAsync(path, contenido);
    await Sharing.shareAsync(path);
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

      <View style={styles.avatar} />

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
        style={[styles.button, { backgroundColor: '#FF3B30' }]}
        onPress={manejarCerrarSesion}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Cerrar sesión</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
