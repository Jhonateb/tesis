// /navegacion/NavegadorApp.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MenuTabs from './MenuTabs';
import CheckGroupScreen from '../vistas/CheckGroupScreen';
import UnirseCrearGrupoScreen from '../vistas/UnirseCrearGrupoScreen';
import CrearGrupoScreen from '../vistas/CrearGrupoScreen';

const Stack = createStackNavigator();


const NavegadorApp = () => {
  return (

    <Stack.Navigator initialRouteName="CheckGroup" screenOptions={{ headerShown: false }}>
      
      <Stack.Screen name="CheckGroup" component={CheckGroupScreen} />

      <Stack.Screen 
        name="UnirseCrearGrupo" 
        component={UnirseCrearGrupoScreen} 
        options={{ headerShown: true, title: 'Únete o Crea un Grupo' }} 
      />
      <Stack.Screen 
        name="CrearGrupo" 
        component={CrearGrupoScreen} 
        options={{ headerShown: true, title: 'Crear Nuevo Grupo' }} 
      />
      
      <Stack.Screen name="MainApp" component={MenuTabs} />
      
    </Stack.Navigator>
  );
}

export default NavegadorApp;