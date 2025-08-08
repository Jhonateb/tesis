import React, { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import LoginView from './LoginView';
import { COLORS } from '../theme/theme';

const PantallaLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, loginConGoogle } = useAuth();

  const onGoogleButtonPress = async () => {
    setLoading(true);
    const exito = await loginConGoogle();
    setLoading(false); 
    if (!exito && exito !== false) { 
      Alert.alert('Error', 'No se pudo iniciar sesión con Google.');
    }
  };

  const handlePasswordLogin = async () => {
    if (!email || !contrasena) {
      return Alert.alert(
        'Campos requeridos',
        'Por favor, introduce tu email y contraseña.'
      );
    }
    setLoading(true);
    const exito = await login(email, contrasena);
    if (!exito) {
      Alert.alert(
        'Error de Inicio de Sesión',
        'El correo o la contraseña son incorrectos.'
      );
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primario} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LoginView
        email={email}
        setEmail={setEmail}
        contrasena={contrasena}
        setContrasena={setContrasena}
        mostrarContrasena={mostrarContrasena}
        setMostrarContrasena={setMostrarContrasena}
        onLogin={handlePasswordLogin}
        onPressGoogle={onGoogleButtonPress}
        onNavigateToRegister={() => navigation.navigate('Registro')}
        loading={loading}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.fondo,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.fondo,
  },
});

export default PantallaLogin;