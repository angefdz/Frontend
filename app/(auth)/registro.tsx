import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRegistro } from '../../hooks/auth/registro/useRegistro';
import { styles } from '../../styles/RegistroScreen.styles';

export default function Registro() {
  const {
    nombre,
    correo,
    contrasena,
    confirmacion,
    error,
    cargando,
    setNombre,
    setCorreo,
    setContrasena,
    setConfirmacion,
    manejarRegistro,
    manejarVolver,
  } = useRegistro();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Título */}
        <Text
          style={styles.title}
          accessibilityRole="header"
        >
          Crear Cuenta
        </Text>

        {/* Campo Nombre */}
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#444"
          value={nombre}
          onChangeText={setNombre}
          accessibilityLabel="Nombre"
          accessibilityHint="Introduce tu nombre completo"
        />

        {/* Campo Correo */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#444"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Correo electrónico"
          accessibilityHint="Introduce tu dirección de correo"
        />

        {/* Campo Contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#444"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          autoCapitalize="none"
          accessibilityLabel="Contraseña"
          accessibilityHint="Introduce una nueva contraseña segura"
        />

        {/* Campo Confirmación */}
        <TextInput
          style={styles.input}
          placeholder="Repetir contraseña"
          placeholderTextColor="#444"
          value={confirmacion}
          onChangeText={setConfirmacion}
          secureTextEntry
          autoCapitalize="none"
          accessibilityLabel="Confirmar contraseña"
          accessibilityHint="Vuelve a introducir tu contraseña"
        />

        {/* Mensaje de error */}
        {error ? (
          <Text
            style={styles.errorText}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        ) : null}

        {/* Botón Registrarse */}
        <TouchableOpacity
          style={styles.button}
          onPress={manejarRegistro}
          disabled={cargando}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Registrarse"
          accessibilityHint="Presiona para crear tu cuenta"
        >
          {cargando ? (
            <ActivityIndicator
              color="white"
              accessibilityLabel="Cargando"
              accessibilityRole="progressbar"
            />
          ) : (
            <Text style={styles.buttonText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        {/* Botón Volver */}
        <TouchableOpacity
          onPress={manejarVolver}
          style={styles.backButton}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="Volver a Iniciar Sesión"
          accessibilityHint="Presiona para regresar a la pantalla de inicio de sesión"
        >
          <Text style={styles.backButtonText}>Volver a Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
