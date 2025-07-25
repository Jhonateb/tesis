// En tu archivo client.js del front-end
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Necesitarás esta librería

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Esto intercepta cada petición y le añade el token si existe
apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token'); // Asume que guardas el token con la clave 'token'
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default apiClient;