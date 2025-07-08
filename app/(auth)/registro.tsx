import ModalPolitica from '@/components/registro/ModalPolitica';
import { Feather } from '@expo/vector-icons';
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
import { useRegistro } from '../../hooks/auth/registro/useRegistro';
import { styles } from '../../styles/RegistroScreen.styles';

const { width } = Dimensions.get('window');

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

  const [aceptaPolitica, setAceptaPolitica] = useState(false);
  const [mostrarModalPolitica, setMostrarModalPolitica] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title} accessibilityRole="header">
          Crear Cuenta
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre"
          placeholderTextColor="#444"
          value={nombre}
          onChangeText={setNombre}
          accessibilityLabel="Nombre"
          accessibilityHint="Introduce tu nombre completo"
        />

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

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => setAceptaPolitica(!aceptaPolitica)}
            style={{
              width: 24,
              height: 24,
              borderWidth: 2,
              borderColor: '#444',
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 4,
            }}
            accessibilityLabel="Aceptar política de privacidad"
            accessibilityRole="checkbox"
            accessibilityState={{ checked: aceptaPolitica }}
          >
            {aceptaPolitica && <Feather name="check" size={18} color="#444" />}
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: width * 0.03, color: '#444' }}>
              Al registrarte, aceptas nuestra{' '}
              <Text
                onPress={() => setMostrarModalPolitica(true)}
                style={{ color: '#007AFF', textDecorationLine: 'underline' }}
                accessibilityRole="button"
                accessibilityLabel="Leer política de privacidad"
              >
                política de privacidad
              </Text>{' '}
              y das tu consentimiento para el tratamiento de tus datos. Si eres menor de edad,
              asegúrate de contar con la supervisión de una persona adulta.
            </Text>
          </View>
        </View>

        {error ? (
          <Text
            style={styles.errorText}
            accessibilityRole="alert"
            accessibilityLiveRegion="polite"
          >
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          style={[styles.button, { opacity: aceptaPolitica ? 1 : 0.5 }]}
          onPress={manejarRegistro}
          disabled={cargando || !aceptaPolitica}
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

      <ModalPolitica
        visible={mostrarModalPolitica}
        onClose={() => setMostrarModalPolitica(false)}
      />
    </KeyboardAvoidingView>
  );
}
