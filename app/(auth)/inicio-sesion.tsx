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
import { palette } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/comunes/LanguageSwitcher';

export const options = {
  title: 'Iniciar sesión',
};

const { width } = Dimensions.get('window');

export default function InicioSesion() {
  const { tr } = useLanguage();
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
      <LanguageSwitcher />

      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>
        {tr('Te damos la bienvenida')}
      </Text>
        <TextInput
          style={styles.input}
          placeholder={tr('Correo electrónico')}
          placeholderTextColor={palette.textMuted}
          value={correo}
          onChangeText={manejarCambioCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          accessibilityLabel="Correo electrónico"
          accessibilityHint="Introduce tu dirección de correo electrónico"
          textContentType="oneTimeCode"

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
              style={{ fontSize: 17, color: palette.text }}
              placeholder={tr('Contraseña')}
              placeholderTextColor={palette.textMuted}
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
            accessibilityLabel={tr(mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña')}
            accessibilityRole="button"
            style={{ minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' }}
          >
            <AntDesign
              name={mostrarContrasena ? 'eye' : 'eyeo'}
              size={width * 0.06}
              color={palette.primary}
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
          accessibilityLabel={tr('Iniciar sesión')}
          accessibilityHint="Presiona para iniciar sesión con tu correo y contraseña"
          accessibilityRole="button"
        >
          {cargando ? (
            <ActivityIndicator
              color="white"
              accessibilityLabel={tr('Cargando')}
              accessibilityRole="progressbar"
            />
          ) : (
            <Text style={styles.loginButtonText}>{tr('Iniciar sesión')}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={manejarIrARegistro}
          style={styles.registerButton}
          accessible={true}
          accessibilityLabel={tr('Registrarse')}
          accessibilityHint="Presiona para crear una nueva cuenta"
          accessibilityRole="button"
        >
          <Text style={styles.registerButtonText}>
            {tr('¿No tienes cuenta? Regístrate')}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
