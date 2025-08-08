import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import PantallaInicio from '../vistas/PantallaInicio.js';
import PantallaCalendario from '../vistas/PantallaCalendario.js';
import PantallaConfiguraciones from '../vistas/PantallaConfiguraciones.js';
import NavegadorProyeccion  from './NavegadorProyeccion.js';
import NavegadorAnuncios from './NavegadorAnuncios';

const Tab = createBottomTabNavigator();

const Icono = (texto) => <Text>{texto}</Text>;

const MenuTabs = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name="Inicio"
                component={PantallaInicio}
                options={{ tabBarIcon: () => Icono('🏠') }}
            />
            <Tab.Screen
                name="Proyección"
                component={NavegadorProyeccion}
                options={{ tabBarIcon: () => Icono('📺') }}
            />
            <Tab.Screen
                name="Calendario"
                component={PantallaCalendario}
                options={{ tabBarIcon: () => Icono('🗓️') }}
            />
            <Tab.Screen
                name="Anuncios"
                component={NavegadorAnuncios}
                options={{ tabBarIcon: () => Icono('📢') }}
            />
            <Tab.Screen
                name="Ajustes"
                component={PantallaConfiguraciones}
                options={{ tabBarIcon: () => Icono('⚙️') }}
            />
        </Tab.Navigator>
    );
}

export default MenuTabs;