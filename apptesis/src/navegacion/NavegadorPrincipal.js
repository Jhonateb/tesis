// /navegacion/NavegadorPrincipal.js
import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext'; 
import NavegadorAuth from './NavegadorAuth';
import NavegadorApp from './NavegadorApp';
import AuthLoadingScreen from '../vistas/AuthLoadingScreen';

const Stack = createNativeStackNavigator();

const NavegadorPrincipal = () => {
  const { usuario, isLoading, cargarDatosUsuarioYGrupo } = useContext(AuthContext);

  useEffect(() => {
    cargarDatosUsuarioYGrupo();
  }, []);

  if (isLoading) {
    return <AuthLoadingScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {usuario ? (
        <Stack.Screen name="App" component={NavegadorApp} />
      ) : (
        <Stack.Screen name="Auth" component={NavegadorAuth} />
      )}
    </Stack.Navigator>
  );
};

export default NavegadorPrincipal;