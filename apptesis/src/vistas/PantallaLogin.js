import React, { useState } from 'react';
import { Alert, ActivityIndicator, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, GoogleAuthProvider, signInWithCredential, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import apiClient from '../api/client';
import LoginView from './LoginView';

const auth = getAuth();

GoogleSignin.configure({
  webClientId: '631827940213-57oq4046iospjpvrg46k2vch3rojbr2k.apps.googleusercontent.com',
});

const PantallaLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onGoogleButtonPress() {
  if (loading) return;
  setLoading(true);
  try {
    const isSignedIn = await GoogleSignin.hasPreviousSignIn();
    if (isSignedIn) {
      await GoogleSignin.signOut();
    }
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, googleCredential);
    
    const firebaseIdToken = await userCredential.user.getIdToken();
    const response = await apiClient.post('/auth/google-login', { idToken: firebaseIdToken });
    await AsyncStorage.setItem('token', response.data.token);

    navigation.replace('App');

  } catch (error) {
    console.error("Error en Google Login:", error);
    if (error.code !== '12501') {
      Alert.alert("Error", "Ocurrió un error inesperado.");
    }
  } finally {
    setLoading(false);
  }
}

const handlePasswordLogin = async () => {
  if (loading) return;
  if (!email || !contrasena) {
    Alert.alert("Campos requeridos", "Por favor, introduce tu email y contraseña.");
    return;
  }
  setLoading(true);
  try {
    await signInWithEmailAndPassword(auth, email, contrasena);

    const response = await apiClient.post('/auth/login', { email, contrasena });
    await AsyncStorage.setItem('token', response.data.token);

    navigation.replace('App');

  } catch (error) {
    let msg = 'Ocurrió un error inesperado. Inténtalo de nuevo.';
    if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
      msg = 'El correo o la contraseña son incorrectos.';
    }
    Alert.alert('Error de Inicio de Sesión', msg);
  } finally {
    setLoading(false);
  }
};

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
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
  );
};

export default PantallaLogin;