import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useInicioSesion } from '../../hooks/auth/login/useInicioSesion';
import { styles } from '../../styles/LoginScreen.styles';

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
      <View style={styles.content}>
        {/* Campo de correo */}
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          placeholderTextColor="#111"
          value={correo}
          onChangeText={manejarCambioCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          accessibilityLabel="Campo de correo electrónico"
  accessibilityHint="Introduce tu dirección de correo electrónico"
        />

        {/* Campo de contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#111"
          value={contrasena}
          onChangeText={manejarCambioContrasena}
          secureTextEntry
          autoCapitalize="none"
          accessibilityLabel="Campo de contraseña"
  accessibilityHint="Introduce tu contraseña para iniciar sesión"
        />

        {/* Mensaje de error */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Botón de inicio de sesión */}
        {/*TouchableOpacity: es un componente que permite hacer clic en un elemento */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={manejarInicioSesion}
          disabled={cargando}
          accessibilityLabel="Botón de iniciar sesión"
  accessibilityHint="Presiona para iniciar sesión con tu correo y contraseña"
        >
          {/*Si cargando es true se pone un loading */}
          {cargando ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
          )}
        </TouchableOpacity>

        {/* Olvidé mi contraseña */}
        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={manejarOlvideContrasena}
          accessibilityLabel="¿Olvidaste tu contraseña?"
  accessibilityHint="Presiona para recuperar tu contraseña mediante correo electrónico"

        >
          <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>o</Text>
          <View style={styles.separatorLine} />
        </View>

        {/* Botón de inicio de sesión con Google */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={manejarInicioSesionGoogle}
          accessibilityLabel="Iniciar sesión con Google"
  accessibilityHint="Presiona para iniciar sesión con tu cuenta de Google"
        >
          <AntDesign name="google" size={24} color="#DB4437" />
          
          <Text style={styles.googleButtonText}>Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={manejarIrARegistro} style={styles.registerButton} accessibilityLabel="Iniciar sesión con Google"
  accessibilityHint="Presiona para iniciar sesión con tu cuenta de Google">
        <Text style={styles.registerButtonText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
} 