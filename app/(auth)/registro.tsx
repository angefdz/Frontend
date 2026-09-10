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
import { palette, radius } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/comunes/LanguageSwitcher';

const { width } = Dimensions.get('window');

export default function Registro() {
  const { tr, language } = useLanguage();
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
      <LanguageSwitcher />
      <View style={styles.content}>
        <Text style={styles.title} accessibilityRole="header">
          {tr('Crea tu cuenta')}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={tr('Nombre')}
          placeholderTextColor={palette.textMuted}
          value={nombre}
          onChangeText={setNombre}
          accessibilityLabel="Nombre"
          accessibilityHint="Introduce tu nombre completo"
        />

        <TextInput
          style={styles.input}
          placeholder={tr('Correo electrónico')}
          placeholderTextColor={palette.textMuted}
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Correo electrónico"
          accessibilityHint="Introduce tu dirección de correo"
        />

        <TextInput
          style={styles.input}
          placeholder={tr('Contraseña')}
          placeholderTextColor={palette.textMuted}
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
          autoCapitalize="none"
          accessibilityLabel="Contraseña"
          accessibilityHint="Introduce una nueva contraseña segura"
          textContentType="oneTimeCode"

        />

        <TextInput
          style={styles.input}
          placeholder={tr('Repetir contraseña')}
          placeholderTextColor={palette.textMuted}
          value={confirmacion}
          onChangeText={setConfirmacion}
          secureTextEntry
          autoCapitalize="none"
          accessibilityLabel="Confirmar contraseña"
          accessibilityHint="Vuelve a introducir tu contraseña"
          textContentType="oneTimeCode"

        />

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 }}>
          <TouchableOpacity
            onPress={() => setAceptaPolitica(!aceptaPolitica)}
            style={{
              width: 48,
              height: 48,
              borderWidth: 2,
              borderColor: palette.primary,
              marginRight: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: radius.small,
            }}
            accessibilityLabel={tr('Aceptar política de privacidad')}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: aceptaPolitica }}
          >
            {aceptaPolitica && <Feather name="check" size={24} color={palette.primary} />}
          </TouchableOpacity>
 
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: Math.max(14, width * 0.035), lineHeight: 21, color: palette.textMuted }}>
              {language === 'en' ? 'By signing up, you accept our ' : 'Al registrarte, aceptas nuestra '}
              <Text
                onPress={() => setMostrarModalPolitica(true)}
                style={{ color: palette.primary, fontWeight: '700', textDecorationLine: 'underline' }}
                accessibilityRole="button"
                accessibilityLabel={tr('Leer política de privacidad')}
              >
                {tr('política de privacidad')}
              </Text>{' '}
              {language === 'en' ? ' and consent to the processing of your data. If you are under age, make sure you have adult supervision.' : ' y das tu consentimiento para el tratamiento de tus datos. Si eres menor de edad, asegúrate de contar con la supervisión de una persona adulta.'}
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
          accessibilityLabel={tr('Registrarse')}
          accessibilityHint="Presiona para crear tu cuenta"
        >
          {cargando ? (
            <ActivityIndicator
              color="white"
              accessibilityLabel={tr('Cargando')}
              accessibilityRole="progressbar"
            />
          ) : (
            <Text style={styles.buttonText}>{tr('Registrarse')}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={manejarVolver}
          style={styles.backButton}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={tr('Volver a Iniciar Sesión')}
          accessibilityHint="Presiona para regresar a la pantalla de inicio de sesión"
        >
          <Text style={styles.backButtonText}>{tr('Volver a Iniciar Sesión')}</Text>
        </TouchableOpacity>
      </View>

      <ModalPolitica
        visible={mostrarModalPolitica}
        onClose={() => setMostrarModalPolitica(false)}
      />
    </KeyboardAvoidingView>
  );
}
