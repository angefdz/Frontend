import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRecuperarContrasena } from '../../hooks/auth/recuperar/useRecuperarContrasena';
import { styles } from '../../styles/RecuperarContrasena.styles';

export default function RecuperarContrasena() {
  const {
    correo,
    mensaje,
    error,
    cargando,
    manejarCambioCorreo,
    manejarRecuperar,
    manejarVolver,
  } = useRecuperarContrasena();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Recuperar Contraseña</Text>

        <TextInput
          style={styles.input}
          placeholder="Introduce tu correo electrónico"
          placeholderTextColor="#111"
          value={correo}
          onChangeText={manejarCambioCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {mensaje ? <Text style={styles.successText}>{mensaje}</Text> : null}

        <TouchableOpacity
          style={styles.recoverButton}
          onPress={manejarRecuperar}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.recoverButtonText}>Enviar enlace</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={manejarVolver} style={styles.backButton}>
          <Text style={styles.backButtonText}>Volver a Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
