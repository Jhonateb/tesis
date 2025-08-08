import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PantallaAnuncios from '../vistas/PantallaAnuncios';
import CrearAnuncio from '../vistas/CrearAnuncio';
import GestionAnunciosScreen from '../vistas/GestionAnunciosScreen';

const Stack = createStackNavigator();

const NavegadorAnuncios = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ListaAnuncios" component={PantallaAnuncios} options={{ headerShown: false }} />
            <Stack.Screen name="CrearAnuncio" component={CrearAnuncio} options={{ title: 'Nuevo Anuncio' }} />
            <Stack.Screen name="GestionAnuncios" component={GestionAnunciosScreen} options={{ title: 'Gestionar Anuncios' }} />
        </Stack.Navigator>
    );
};

export default NavegadorAnuncios;