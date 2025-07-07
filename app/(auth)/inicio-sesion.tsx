import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useInicioSesion } from '../../hooks/auth/login/useInicioSesion';
import { styles } from '../../styles/LoginScreen.styles';

export const options = {
  title: 'Iniciar sesión',
};

const { width } = Dimensions.get('window');

export default function InicioSesion() {
  const {
    correo,
    contrasena,
    cargando,
    error,
    manejarCambioCorreo,
    manejarCambioContrasena,
    manejarInicioSesion,
    manejarInicioSesionGoogle,
    manejarOlvideContrasena,
    manejarIrARegistro,
  } = useInicioSesion();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Título de pantalla */}
      <Text
        accessibilityRole="header"
        style={styles.tituloPantalla}
      >
        Inicio de sesión
      </Text>

      <View style={styles.content}>
        {/* Campo de correo */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#444"
          value={correo}
          onChangeText={manejarCambioCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          accessibilityLabel="Correo electrónico"
          accessibilityHint="Introduce tu dirección de correo electrónico"
        />

        {/* Campo de contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#444"
          value={contrasena}
          onChangeText={manejarCambioContrasena}
          secureTextEntry
          autoCapitalize="none"
          accessibilityLabel="Contraseña"
          accessibilityHint="Introduce tu contraseña para iniciar sesión"
        />

        {/* Mensaje de error */}
        {error ? (
          <Text
            style={styles.errorText}
            accessibilityLiveRegion="polite"
            accessibilityRole="alert"
          >
            {error}
          </Text>
        ) : null}

        {/* Botón de inicio de sesión */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={manejarInicioSesion}
          disabled={cargando}
          accessible={true}
          accessibilityLabel="Iniciar sesión"
          accessibilityHint="Presiona para iniciar sesión con tu correo y contraseña"
          accessibilityRole="button"
        >
          {cargando ? (
            <ActivityIndicator
              color="white"
              accessibilityLabel="Cargando"
              accessibilityRole="progressbar"
            />
          ) : (
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          )}
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>o</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Botón de Google */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={manejarInicioSesionGoogle}
          accessible={true}
          accessibilityLabel="Iniciar sesión con Google"
          accessibilityHint="Presiona para iniciar sesión con tu cuenta de Google"
          accessibilityRole="button"
        >
          {/* Icono decorativo */}
          <AntDesign
            name="google"
            size={width * 0.06}
            color="#DB4437"
            accessibilityElementsHidden
            importantForAccessibility="no"
          />
          <Text style={styles.googleButtonText}>Continuar con Google</Text>
        </TouchableOpacity>

        {/* Botón de registro */}
        <TouchableOpacity
          onPress={manejarIrARegistro}
          style={styles.registerButton}
          accessible={true}
          accessibilityLabel="Registrarse"
          accessibilityHint="Presiona para crear una nueva cuenta"
          accessibilityRole="button"
        >
          <Text style={styles.registerButtonText}>
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
