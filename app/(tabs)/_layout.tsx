import useResponsive from '@/hooks/utils/useResponsive';
import { Feather } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import type { ColorValue } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { palette } from '@/constants/Theme';
import { useLanguage } from '@/context/LanguageContext';

const HomeIcon = (size: number) => function HomeTabIcon({ color }: { color: ColorValue }) {
  return <Feather name="home" color={color} size={size} />;
};
const BibliotecaIcon = (size: number) => function LibraryTabIcon({ color }: { color: ColorValue }) {
  return <Feather name="book" color={color} size={size} />;
};
const UsuarioIcon = (size: number) => function UserTabIcon({ color }: { color: ColorValue }) {
  return <Feather name="user" color={color} size={size} />;
};

export default function TabsLayout() {
  const { tr } = useLanguage();
  const { scaleFont, scaleSpacing, scaleIcon } = useResponsive();

  const iconBaseSize = 24;
  const labelBaseSize = 11;

  const scaledIconSize = scaleIcon(iconBaseSize);
  const scaledLabelSize = scaleFont(labelBaseSize);

  return (
    <MenuProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: palette.textMuted,
          headerTintColor: palette.text,
          headerStyle: { backgroundColor: palette.surface },
          headerShadowVisible: false,
          headerTitleStyle: { fontWeight: '800' },
          tabBarLabelStyle: {
            fontSize: scaledLabelSize,
            paddingBottom: 2,
            fontWeight: '700',
          },
          tabBarStyle: {
            height: scaleSpacing(60),
            paddingTop: 4,
            paddingBottom: 6,
            backgroundColor: palette.surface,
            borderTopColor: palette.border,
          },
        }}
      >
        <Tabs.Screen
          name="pantalla-principal"
          options={{
            title: tr('Inicio'),
            tabBarIcon: HomeIcon(scaledIconSize),
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="biblioteca"
          options={{
            title: tr('Biblioteca'),
            tabBarIcon: BibliotecaIcon(scaledIconSize),
            headerShown: true,
          }}
        />
        <Tabs.Screen
          name="usuario"
          options={{
            title: tr('Usuario'),
            tabBarIcon: UsuarioIcon(scaledIconSize),
            headerShown: true,
          }}
        />
      </Tabs>
    </MenuProvider>
  );
}
