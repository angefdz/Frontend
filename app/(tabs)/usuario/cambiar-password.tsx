import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { useAuth } from '@/context/AuthContext';
import { useCambiarPassword } from '@/hooks/usuario/useCambiarPassword';
import { styles } from '@/styles/PerfilScreen.styles';

export default function CambiarPasswordScreen() {
  const router = useRouter();
  const { token } = useAuth(); // ← usamos el contexto directamente
  const { cambiarPassword } = useCambiarPassword(); // ← le pasamos el token

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
      router.back(); // Volver si todo fue bien
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
      />

      <Text style={styles.label}>Nueva contraseña</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Nueva contraseña"
        value={nuevaPassword}
        onChangeText={setNuevaPassword}
      />

      <Text style={styles.label}>Confirmar nueva contraseña</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Confirmar contraseña"
        value={confirmarPassword}
        onChangeText={setConfirmarPassword}
      />

      <TouchableOpacity style={styles.button} onPress={manejarCambioPassword}>
        <Text style={styles.buttonText}>Actualizar contraseña</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
