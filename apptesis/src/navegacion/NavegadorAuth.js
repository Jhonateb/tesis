import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaLogin from '../vistas/PantallaLogin';
import PantallaRegistro from '../vistas/PantallaRegistro';

const Stack = createStackNavigator();

const NavegadorAuth = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={PantallaLogin} />
      <Stack.Screen name="Registro" component={PantallaRegistro} />
    </Stack.Navigator>
  );
}

export default NavegadorAuth;