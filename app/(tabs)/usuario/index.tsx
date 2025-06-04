import { styles } from '@/styles/PerfilScreen.styles';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import { useEffect, useState } from 'react';
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
  const [nombre, setNombre] = useState('');
  const [voz, setVoz] = useState('');
  const correo = 'usuario@ejemplo.com';

  useEffect(() => {
    const cargarDatos = async () => {
      const vozGuardada = await AsyncStorage.getItem('voz');
      if (vozGuardada) setVoz(vozGuardada);
    };
    cargarDatos();
  }, []);

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
      <TextInput style={styles.input} value={nombre} editable={false} placeholder="Nombre" />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput style={styles.input} value={correo} editable={false} />

      <Text style={styles.label}>Voz</Text>
      <TextInput style={styles.input} value={voz} editable={false} />

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
