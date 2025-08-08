// /vistas/CheckGroupScreen.js
import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { EstilosCheckGroup as styles } from '../estilos/EstilosCheckGroup';

const CheckGroupScreen = ({ navigation }) => {
  const { cargarDatosUsuarioYGrupo, usuario } = useContext(AuthContext);

  useEffect(() => {
    const checkUserStatus = async () => {
      await cargarDatosUsuarioYGrupo();
    };

    checkUserStatus();
  }, []);

  useEffect(() => {
    if (usuario) {
      navigation.replace('MainApp');
    } else {
      navigation.replace('UnirseCrearGrupo');
    }
  }, [usuario]); 

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4a90e2" />
      <Text style={styles.textoCarga}>Verificando tu estado...</Text>
    </View>
  );
};

export default CheckGroupScreen;