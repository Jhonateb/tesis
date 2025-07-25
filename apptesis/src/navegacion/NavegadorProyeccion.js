import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import PantallaControlador from '../vistas/PantallaControlador.js';
import PantallaEspectador from '../vistas/PantallaEspectador.js';

const Stack = createStackNavigator();

const NavegadorProyeccion = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="Controlador" component={PantallaControlador} />
      

      <Stack.Screen name="Espectador" component={PantallaEspectador} />
    </Stack.Navigator>
  );
}

export default NavegadorProyeccion;