// /navegacion/NavegadorApp.js
import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

import MenuTabs from './MenuTabs';
import UnirseCrearGrupoScreen from '../vistas/UnirseCrearGrupoScreen';
import CrearGrupoScreen from '../vistas/CrearGrupoScreen';

const Stack = createStackNavigator();

const NavegadorApp = () => {
  const { usuario } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {usuario && usuario.nombre_grupo ? (
        <Stack.Screen name="MainApp" component={MenuTabs} options={{ headerShown: false }} />
      ) : (
        <>
          <Stack.Screen
            name="UnirseCrearGrupo"
            component={UnirseCrearGrupoScreen}
            options={{ title: 'Únete o Crea un Grupo' }}
          />
          <Stack.Screen
            name="CrearGrupo"
            component={CrearGrupoScreen}
            options={{ title: 'Crear Nuevo Grupo' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default NavegadorApp;