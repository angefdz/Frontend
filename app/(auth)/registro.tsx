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
          <Text style={styles.title}>Crear Cuenta</Text>
  
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
            placeholderTextColor="#666"
          />
  
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
  
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
  
          <TextInput
            style={styles.input}
            placeholder="Repetir contraseña"
            value={confirmacion}
            onChangeText={setConfirmacion}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#666"
          />
  
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
  
          <TouchableOpacity style={styles.button} onPress={manejarRegistro} disabled={cargando}>
            {cargando ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Registrarse</Text>
            )}
          </TouchableOpacity>
  
          <TouchableOpacity onPress={manejarVolver} style={styles.backButton}>
            <Text style={styles.backButtonText}>Volver a Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
  