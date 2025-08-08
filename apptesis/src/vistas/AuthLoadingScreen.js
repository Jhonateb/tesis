// /vistas/AuthLoadingScreen.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const AuthLoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007bff" />
      <Text style={{ marginTop: 10 }}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default AuthLoadingScreen;