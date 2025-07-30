// /navegacion/NavegadorPrincipal.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NavegadorAuth from './NavegadorAuth';
import NavegadorApp from './NavegadorApp'; 
import AuthLoadingScreen from '../vistas/AuthLoadingScreen'; 

const Stack = createStackNavigator();

const NavegadorPrincipal = () => {
  return (
    <Stack.Navigator initialRouteName="AuthLoading" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <Stack.Screen name="Auth" component={NavegadorAuth} />
      <Stack.Screen name="App" component={NavegadorApp} />
    </Stack.Navigator>
  );
}

export default NavegadorPrincipal;