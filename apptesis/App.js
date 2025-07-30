// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import NavegadorPrincipal from './src/navegacion/NavegadorPrincipal';

import { SafeAreaProvider } from 'react-native-safe-area-context';


export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <NavegadorPrincipal />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}