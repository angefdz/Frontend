import { styles } from '@/styles/PerfilScreen.styles';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { useAuth } from '@/context/AuthContext';
import { guardarConfiguracionUsuario } from '@/hooks/configuracion/guardarConfiguracionUsuario';
import { useConfiguracionUsuario } from '@/hooks/configuracion/useConfiguracionUsuario';
import { useOpcionesTipoVoz } from '@/hooks/configuracion/useOpcionesTipoVoz';
import { guardarUsuarioActual } from '@/hooks/usuario/guardarUsuarioActual';
import { useUsuarioActual } from '@/hooks/usuario/useUsuarioActual';

export default function EditarPerfilScreen() {
  const router = useRouter();
  const { token, usuarioId } = useAuth(); // ← CAMBIO

  const { configuracion, recargarConfiguracion } = useConfiguracionUsuario(token);
  const { usuario, recargarUsuario } = useUsuarioActual();
  const { opciones, loading: cargandoOpciones } = useOpcionesTipoVoz(token);

  const [nombre, setNombre] = useState('');
  const [voz, setVoz] = useState<string>('femenina');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (configuracion) {
      setVoz(configuracion.tipoVoz);
    }
  }, [configuracion]);

  useEffect(() => {
    if (usuario?.nombre) {
      setNombre(usuario.nombre);
    }
  }, [usuario]);

  const guardarCambios = async () => {
    if (!configuracion || !usuarioId || !token || !usuario) {
      Alert.alert('Error', 'No se pudo guardar la configuración.');
      return;
    }

    try {
      await guardarConfiguracionUsuario(token, {
        id: configuracion.id,
        botonesPorPantalla: configuracion.botonesPorPantalla,
        mostrarPorCategoria: configuracion.mostrarPorCategoria,
        tipoVoz: voz,
      });

      await guardarUsuarioActual(token, {
        id: usuarioId,
        nombre,
        correo: usuario.correo,
      });

      await recargarConfiguracion();
      await recargarUsuario();

      Alert.alert('Perfil actualizado', 'Los cambios se han guardado correctamente');
      router.back();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar los cambios.');
      console.error('Error al guardar el perfil:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.label}>Nombre</Text>
      <TextInput
        style={styles.input}
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre del usuario"
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={[styles.input, { color: '#555' }]}
        value={usuario?.correo ?? ''}
        editable={false}
      />

      <Text style={styles.label}>Voz</Text>
      <DropDownPicker
        open={open}
        value={voz}
        items={opciones}
        setOpen={setOpen}
        setValue={setVoz}
        setItems={() => {}} // <- no lo usas porque las opciones ya están precargadas
        placeholder="Selecciona un tipo de voz"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        textStyle={styles.dropdownText}
        disabled={cargandoOpciones}
      />

      <TouchableOpacity style={styles.button} onPress={guardarCambios}>
        <Text style={styles.buttonText}>Guardar cambios</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
