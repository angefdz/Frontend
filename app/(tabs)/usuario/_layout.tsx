import { Stack } from 'expo-router';

export default function UsuarioLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, // 👈 Habilita el gesto de swipe back
      }}
    />
  );
}
