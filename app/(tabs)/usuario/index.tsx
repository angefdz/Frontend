import { useAuth } from '@/context/AuthContext';
import { useConfiguracionUsuario } from '@/hooks/configuracion/useConfiguracionUsuario';
import { useDescargarHistorialCsv } from '@/hooks/frase/useDescargarHistorialCsv';
import { useUsuarioActual } from '@/hooks/usuario/useUsuarioActual';
import { styles } from '@/styles/PerfilScreen.styles';

import { Feather } from '@expo/vector-icons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback } from 'react';
import {
  Alert,
  Button, Dimensions, ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { useCategoriasContext } from '@/context/CategoriasContext';
import { usePictogramasContext } from '@/context/PictogramasContext';
import { palette } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';
const { width } = Dimensions.get('window');
export default function PerfilScreen() {
  const { tr, language } = useLanguage();
  const router = useRouter();
  const { token, cerrarSesion } = useAuth();
  const { usuario, recargarUsuario, error: errorUsuario } = useUsuarioActual();
  const {
    configuracion,
    recargarConfiguracion,
    errorConfiguracion,
  } = useConfiguracionUsuario(token);

  const { marcarCategoriasComoDesactualizadas } = useCategoriasContext();
  const { marcarPictogramasComoDesactualizados } = usePictogramasContext();

  const { descargarHistorial } = useDescargarHistorialCsv();

  const recargarTodo = () => {
    recargarUsuario();
    recargarConfiguracion();
  };

  const manejarCerrarSesion = () => {
    Alert.alert(tr('Cerrar sesión'), language === 'en' ? 'Are you sure you want to sign out?' : '¿Estás segura de que quieres cerrar sesión?', [
      { text: tr('Cancelar'), style: 'cancel' },
      {
        text: tr('Sí'),
        style: 'destructive',
        onPress: () => {
          cerrarSesion();
          marcarCategoriasComoDesactualizadas();
          marcarPictogramasComoDesactualizados();
          router.replace('/inicio-sesion');
        },
      },
    ]);
  };

  const manejarDescargarHistorial = () => {
    descargarHistorial();
  };

  const manejarEliminarCuenta = () => {
    Alert.alert(
      tr('Eliminar cuenta'),
      language === 'en' ? 'Are you sure you want to delete your account? This action cannot be undone.' : '¿Estás segura de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
      [
        { text: tr('Cancelar'), style: 'cancel' },
        {
          text: tr('Eliminar'),
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(
                `${process.env.EXPO_PUBLIC_API_BASE_URL}/usuarios/me`,
                {
                  method: 'DELETE',
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (response.status === 204) {
                Alert.alert(tr('Cuenta eliminada'), tr('Tu cuenta ha sido eliminada correctamente.'));
                router.replace('/inicio-sesion');
              } else {
                Alert.alert('Error', 'No se pudo eliminar la cuenta.');
              } 
            } catch (error) {
              Alert.alert('Error', 'Hubo un problema al eliminar la cuenta.');
            }
          },
        },
      ]
    );
  };

  useFocusEffect(useCallback(() => { recargarTodo(); }, []));

  const errorActual = errorUsuario ?? errorConfiguracion;

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContainer, { paddingBottom: 64 }]}
      showsVerticalScrollIndicator={false}
    >
      {errorActual && (
        <View style={{ padding: 16, alignItems: 'center' }}>
          <Text style={{ color: 'red', marginBottom: 8 }}>{errorActual}</Text>
          <Button title={tr('Reintentar')} onPress={recargarTodo} />
        </View>
      )}

      <View style={styles.iconoEditarContainer}>
        <TouchableOpacity
          onPress={() => router.push('/usuario/editar-perfil')}
          accessibilityRole="button"
          accessibilityLabel={tr('Editar perfil')}
        >
          <Feather name="edit-2" size={width * 0.06} color={palette.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>{tr('Nombre')}</Text>
      <TextInput
        style={styles.input}
        value={usuario?.nombre ?? ''}
        editable={false}
        placeholder={tr('Nombre')}
      />

      <Text style={styles.label}>{tr('Correo electrónico')}</Text>
      <TextInput
        style={styles.input}
        value={usuario?.correo ?? ''}
        editable={false}
        placeholder={tr('Correo')}
      />

      <Text style={styles.label}>{tr('Voz')}</Text>
      <TextInput
        style={styles.input}
        value={configuracion?.tipoVoz ? (language === 'en' ? (configuracion.tipoVoz === 'masculina' ? 'Male' : 'Female') : configuracion.tipoVoz) : ''}
        editable={false}
        placeholder={tr('Tipo de voz')}
      />

      <TouchableOpacity style={styles.button} onPress={() => router.push('/usuario/pictogramas-ocultos')}>
        <Text style={styles.buttonText}>{tr('Pictogramas ocultos')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={manejarDescargarHistorial}>
        <Text style={styles.buttonText}>{tr('Historial')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/usuario/cambiar-password')}>
        <Text style={styles.buttonText}>{tr('Cambiar contraseña')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: palette.secondary }]} onPress={manejarCerrarSesion}>
        <Text style={[styles.buttonText, { color: '#fff' }]}>{tr('Cerrar sesión')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: palette.destructive }]} onPress={manejarEliminarCuenta}>
        <Text style={[styles.buttonText, { color: '#fff' }]}>{tr('Eliminar cuenta')}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
