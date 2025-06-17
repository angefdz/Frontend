import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import Toast from 'react-native-toast-message';

// 👉 Importa los contextos
import { AuthProvider } from '@/context/AuthContext'; // <== Añadido contexto Auth
import { CategoriasProvider } from '@/context/CategoriasContext';
import { PictogramasProvider } from '@/context/PictogramasContext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider> {/* Envuelve toda la app para autenticación global */}
        <CategoriasProvider>
          <PictogramasProvider>
            <Slot />
            <StatusBar style="auto" />
            <Toast />
          </PictogramasProvider>
        </CategoriasProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
