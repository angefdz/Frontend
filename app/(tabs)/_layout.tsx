import useResponsive from '@/hooks/utils/useResponsive';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';

const HomeIcon = (size: number) => ({ color }: { color: string }) => (
  <Feather name="home" color={color} size={size} />
);
const BibliotecaIcon = (size: number) => ({ color }: { color: string }) => (
  <Feather name="book" color={color} size={size} />
);
const UsuarioIcon = (size: number) => ({ color }: { color: string }) => (
  <Feather name="user" color={color} size={size} />
);

export default function TabsLayout() {
  const { scaleFont, scaleSpacing, scaleIcon } = useResponsive();

  const iconBaseSize = 24;
  const labelBaseSize = 11;

  const scaledIconSize = scaleIcon(iconBaseSize);
  const scaledLabelSize = scaleFont(labelBaseSize);

  return (
    <MenuProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarLabelStyle: {
            fontSize: scaledLabelSize,
            paddingBottom: 2,
          },
          tabBarStyle: {
            height: scaleSpacing(60),
            paddingTop: 4,
            paddingBottom: 6,
          },
        }}
      >
        <Tabs.Screen
          name="pantalla-principal"
          options={{
            title: 'Inicio',
            tabBarIcon: HomeIcon(scaledIconSize),
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="biblioteca"
          options={{
            title: 'Biblioteca',
            tabBarIcon: BibliotecaIcon(scaledIconSize),
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="usuario"
          options={{
            title: 'Usuario',
            tabBarIcon: UsuarioIcon(scaledIconSize),
            headerShown: true,
          }}
        />
      </Tabs>
    </MenuProvider>
  );
}
