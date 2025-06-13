import useResponsive from '@/hooks/utils/useResponsive';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { MenuProvider } from 'react-native-popup-menu';

export default function TabsLayout() {
  const { scaleFont, scaleSpacing, scaleIcon } = useResponsive();

  const iconBaseSize = 24;
  const labelBaseSize = 11;

  const scaledIconSize = scaleIcon(iconBaseSize); // por ejemplo: 28 en tablet
  const scaledLabelSize = scaleFont(labelBaseSize); // por ejemplo: 12.5 en tablet

  return (
    <MenuProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarLabelStyle: {
            fontSize: scaledLabelSize,
            paddingBottom: 2, // le damos espacio al texto
          },
          tabBarStyle: {
            height: scaleSpacing(60), // moderado
            paddingTop: 4,
            paddingBottom: 6,
          },
        }}
      >
        <Tabs.Screen
          name="pantalla-principal"
          options={{
            title: 'Inicio',
            tabBarIcon: ({ color }) => (
              <Feather name="home" color={color} size={scaledIconSize} />
            ),
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="biblioteca"
          options={{
            title: 'Biblioteca',
            tabBarIcon: ({ color }) => (
              <Feather name="book" color={color} size={scaledIconSize} />
            ),
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="usuario"
          options={{
            title: 'Usuario',
            tabBarIcon: ({ color }) => (
              <Feather name="user" color={color} size={scaledIconSize} />
            ),
            headerShown: true,
          }}
        />
      </Tabs>
    </MenuProvider>
  );
}