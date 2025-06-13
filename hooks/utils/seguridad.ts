import AsyncStorage from '@react-native-async-storage/async-storage';

export const guardarCredenciales = async (token: string, usuarioId: number) => {
  await AsyncStorage.setItem('token', token);
  await AsyncStorage.setItem('usuarioId', usuarioId.toString());
};
