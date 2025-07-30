// /vistas/PantallaInicio.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Button } from 'react-native';
import apiClient from '../api/client';



const PantallaInicio = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [datos, setDatos] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const { data } = await apiClient.get('/grupos/inicio');
        setDatos(data);
      } catch (error) {
        console.error("Error cargando datos de inicio:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido, {datos?.nombre_completo}!</Text>
      <Text style={styles.subtitle}>Estás en el grupo:</Text>
      <Text style={styles.groupName}>{datos?.nombre_grupo}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    color: 'gray',
  },
  groupName: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 8,
    color: '#6200ee',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 40,
  },
});

export default PantallaInicio;