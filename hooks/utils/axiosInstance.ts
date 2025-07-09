
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      console.warn('Token inválido o caducado. Cerrando sesión...');

      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('usuarioId');

      router.replace('/inicio-sesion');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
