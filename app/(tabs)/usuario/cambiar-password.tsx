import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useCambiarPassword } from '@/hooks/usuario/useCambiarPassword';
import { styles } from '@/styles/PerfilScreen.styles';

export default function CambiarPasswordScreen() {
  const router = useRouter();
  const { cambiarPassword } = useCambiarPassword(); 

  const [passwordActual, setPasswordActual] = useState('');
  const [nuevaPassword, setNuevaPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');

  const manejarCambioPassword = async () => {
    const ok = await cambiarPassword({
      passwordActual,
      nuevaPassword,
      confirmarPassword,
    });

    if (ok) {
      router.back(); 
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.label}>Contraseña actual</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Contraseña actual"
        value={passwordActual}
        onChangeText={setPasswordActual}
        accessibilityLabel="Campo de contraseña actual"
  accessibilityHint="Introduce tu contraseña actual"
      />

      <Text style={styles.label}>Nueva contraseña</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Nueva contraseña"
        value={nuevaPassword}
        onChangeText={setNuevaPassword}
        accessibilityLabel="Campo de nueva contraseña"
  accessibilityHint="Introduce tu nueva contraseña"
      />

      <Text style={styles.label}>Confirmar nueva contraseña</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirmar contraseña"
        value={confirmarPassword}
        onChangeText={setConfirmarPassword}
        accessibilityLabel="Campo para confirmar la nueva contraseña"
  accessibilityHint="Vuelve a escribir tu nueva contraseña para confirmar"
      />

      <TouchableOpacity style={styles.button} onPress={manejarCambioPassword} accessibilityLabel="Actualizar contraseña"
  accessibilityRole="button">
        <Text style={styles.buttonText}>Actualizar contraseña</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
