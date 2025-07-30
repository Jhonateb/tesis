// /vistas/PantallaConfiguraciones.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator, FlatList, SafeAreaView, StatusBar   } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getAuth } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';

const Icono = ({ children }) => <Text style={styles.icono}>{children}</Text>;

const PantallaConfiguraciones = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [misGrupos, setMisGrupos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const cargarDatos = async () => {
        setLoading(true);
        try {
          const [datosInicio, datosGrupos] = await Promise.all([
            apiClient.get('/grupos/inicio'),
            apiClient.get('/grupos/mis-grupos')
          ]);
          setDatosUsuario(datosInicio.data);
          setMisGrupos(datosGrupos.data);
        } catch (error) {
          console.error("Error cargando datos:", error);
        } finally {
          setLoading(false);
        }
      };
      cargarDatos();
    }, [])
  );

  const handleSwitchGroup = async (nuevoGrupoId) => {
    if (nuevoGrupoId === datosUsuario.grupo_activo_id) return;
    try {
      await apiClient.post('/grupos/cambiar-activo', { grupo_id: nuevoGrupoId });
      navigation.replace('App');
    } catch (error) {
      Alert.alert("Error", "No se pudo cambiar de grupo.");
    }
  };

  const handleLogout = async () => {
    try {
      await getAuth().signOut();
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem('token');
      navigation.replace('Auth');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar la sesión.");
    }
  };

  const handleLeaveGroup = () => {
    Alert.alert(
      "Salir del Grupo",
      "¿Estás seguro de que quieres salir del grupo actual?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, Salir",
          style: "destructive",
          onPress: async () => {
            try {
              await apiClient.delete('/grupos/salirse');
              navigation.replace('App');
            } catch (error) {
              Alert.alert("Error", error.response?.data?.msg || "No se pudo salir del grupo.");
            }
          },
        },
      ]
    );
  };

  const renderGrupoItem = ({ item }) => {
    const esActivo = item.grupo_id === item.grupo_activo_id;
    return (
      <TouchableOpacity 
        style={[styles.opcion, esActivo && styles.opcionActiva]}
        onPress={() => handleSwitchGroup(item.grupo_id)}
      >
        <Icono>{esActivo ? '🔘' : '⚪️'}</Icono>
        <View>
          <Text style={[styles.textoOpcion, esActivo && styles.textoActivo]}>{item.nombre}</Text>
          <Text style={esActivo ? styles.textoActivo : null}>Tu rol: {item.nombre_rol}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <View style={styles.contenedorCarga}><ActivityIndicator size="large" /></View>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#f5f5f5" 
      />
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Configuraciones</Text>

      <View style={styles.seccion}>
        <Text style={styles.subtitulo}>Mi Perfil</Text>
        <View style={styles.opcion}>
          <Icono>👤</Icono>
          <View>
            <Text style={styles.textoOpcion}>{datosUsuario?.nombre_completo}</Text>
            <Text>{datosUsuario?.email}</Text>
          </View>
        </View>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.subtitulo}>Mis Grupos</Text>
        <FlatList
          data={misGrupos}
          renderItem={renderGrupoItem}
          keyExtractor={(item) => item.grupo_id}
          scrollEnabled={false} 
        />
      </View>
      
       <View style={styles.seccion}>
        <Text style={styles.subtitulo}>Grupo Actual: {datosUsuario?.nombre_grupo}</Text>
        <View style={styles.tarjetaCodigo}>
          <Text style={styles.textoTarjeta}>Código de unión:</Text>
          <Text style={styles.codigo}>{datosUsuario?.codigo_union}</Text>
        </View>
      </View>

      <View style={styles.seccion}>
         <TouchableOpacity style={[styles.opcion, styles.opcionSalir]} onPress={handleLeaveGroup}>
          <Icono>🚪</Icono><Text style={[styles.textoOpcion, styles.textoSalir]}>Salirse del grupo actual</Text>
        </TouchableOpacity>

         <TouchableOpacity style={[styles.opcion, styles.opcionSalir]} onPress={handleLogout}>
          <Icono>🔒</Icono><Text style={[styles.textoOpcion, styles.textoSalir]}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedorCarga: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenedor: {
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
  },
  seccion: {
    marginBottom: 20,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  opcion: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  textoOpcion: {
    fontSize: 16,
    marginLeft: 15,
  },
  icono: {
    fontSize: 20,
  },
  tarjetaCodigo: {
    backgroundColor: '#e0eafc',
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  textoTarjeta: {
    fontSize: 16,
    color: '#333',
  },
  codigo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 5,
  },
  opcionSalir: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  textoSalir: {
    color: 'red',
  },
  opcionActiva: {
    backgroundColor: '#e0eafc',
  },
  textoActivo: {
    fontWeight: 'bold',
    color: '#003366',
  },
});

export default PantallaConfiguraciones;