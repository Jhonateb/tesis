// /vistas/CheckGroupScreen.js
import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import apiClient from '../api/client';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CheckGroupScreen = ({ navigation }) => {

    useFocusEffect(
        React.useCallback(() => {
            const verificarGrupo = async () => {
                try {
                      const tokenActual = await AsyncStorage.getItem('token');
        console.log('--- [CheckGroupScreen] Verificando con token:', tokenActual);
                    const { data } = await apiClient.get('/grupos/verificar');
                    if (data.tieneGrupo) {
                        navigation.replace('MainApp');
                    } else {
                        navigation.replace('UnirseCrearGrupo');
                    }
                } catch (error) {
                    console.error("Error verificando grupo:", error);
                    try {
                        await getAuth().signOut(); 
                        await AsyncStorage.removeItem('token'); 
                    } catch (logoutError) {
                        console.error('Error al intentar cerrar sesión:', logoutError);
                    }
                }
            };

            verificarGrupo();
        }, [])
    );

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default CheckGroupScreen;