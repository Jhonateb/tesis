// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavegadorPrincipal from './src/navegacion/NavegadorPrincipal';
import { AuthProvider } from './src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
      <NavigationContainer>
        <NavegadorPrincipal />
      </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
    
  );
}