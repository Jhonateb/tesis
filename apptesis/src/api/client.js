
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token'); 
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

export default apiClient;