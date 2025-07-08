import { AntDesign } from '@expo/vector-icons';
import React, { useState } from 'react';
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
    manejarIrARegistro,
  } = useInicioSesion();

  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      

      <View style={styles.content}>
      
        <Text accessibilityRole="header" style={styles.title}>
        Inicio de sesión
      </Text>
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

        <View
          style={[
            styles.input,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: width * 0.02,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <TextInput
              style={{ fontSize: width * 0.04 }}
              placeholder="Contraseña"
              placeholderTextColor="#444"
              value={contrasena}
              onChangeText={manejarCambioContrasena}
              secureTextEntry={!mostrarContrasena}
              autoCapitalize="none"
              accessibilityLabel="Contraseña"
              accessibilityHint="Introduce tu contraseña para iniciar sesión"
            />
          </View>

          <TouchableOpacity
            onPress={() => setMostrarContrasena((prev) => !prev)}
            accessible={true}
            accessibilityLabel={mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            accessibilityRole="button"
          >
            <AntDesign
              name={mostrarContrasena ? 'eye' : 'eyeo'}
              size={width * 0.06}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {error ? (
          <Text
            style={styles.errorText}
            accessibilityLiveRegion="polite"
            accessibilityRole="alert"
          >
            {error}
          </Text>
        ) : null}

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
