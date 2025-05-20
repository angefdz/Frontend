import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';


import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  //permite cambiar el color de la pantalla segun el tema seleccionado
  const colorScheme = useColorScheme();
  //carga una fuente de texto
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  //si la fuente no esta cargada, no se muestra nada
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    //permite cambiar el color de la pantalla segun el tema seleccionado
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          //no muestra el header
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="inicio-sesion"
          options={{
            title: 'Iniciar Sesión',
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            title: 'Inicio',
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
