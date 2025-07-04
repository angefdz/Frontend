import { Stack } from 'expo-router';

export default function BibliotecaLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        gestureEnabled: true, // 👈 Habilita el gesto de swipe back
      }}
    />
  );
}
