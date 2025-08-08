// /src/api/client.js

import axios from 'axios';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      Alert.alert(
        'Error de Conexión',
        'No se pudo conectar con el servidor. Por favor, revisa tu conexión a internet.'
      );
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      Alert.alert(
        'Sesión Expirada',
        'Tu sesión ha finalizado. Por favor, inicia sesión de nuevo.'
      );
    }
    return Promise.reject(error);
  }
);

export default apiClient;