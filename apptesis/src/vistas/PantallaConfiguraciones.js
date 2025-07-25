import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
// --- AÑADIDO: Importaciones para cerrar sesión ---
import { getAuth } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const Icono = ({ children }) => <Text style={styles.icono}>{children}</Text>;

const PantallaConfiguraciones = () => {

  const codigoGrupo = "AB7DE2";
  const nombreUsuario = "Jhonatan Tebalan";
  const emailUsuario = "jhonatan.tebalan@email.com";
  const esAdmin = true;

  // --- AÑADIDO: Función para manejar el cierre de sesión ---
  const handleLogout = async () => {
    try {
      // Cierra la sesión de Google
      await GoogleSignin.signOut();
      // Cierra la sesión de Firebase
      await getAuth().signOut();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar la sesión.");
    }
  };

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Configuraciones</Text>

      <View style={styles.seccion}>
        <Text style={styles.subtitulo}>Mi Perfil</Text>
        <TouchableOpacity style={styles.opcion}>
          <Icono>👤</Icono>
          <View>
            <Text style={styles.textoOpcion}>{nombreUsuario}</Text>
            <Text>{emailUsuario}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.seccion}>
        <Text style={styles.subtitulo}>Gestión de Grupos</Text>
        
        <TouchableOpacity style={styles.opcion}>
          <Icono>➕</Icono>
          <Text style={styles.textoOpcion}>Unirse a otro grupo con código</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opcion}>
          <Icono>🔄</Icono>
          <Text style={styles.textoOpcion}>Cambiar de grupo</Text>
        </TouchableOpacity>
        
        {esAdmin && (
          <View style={styles.tarjetaCodigo}>
            <Text style={styles.textoTarjeta}>Código del grupo actual:</Text>
            <Text style={styles.codigo}>{codigoGrupo}</Text>
          </View>
        )}
      </View>

      <View style={styles.seccion}>
         <TouchableOpacity style={[styles.opcion, styles.opcionSalir]}>
          <Icono>🚪</Icono>
          <Text style={[styles.textoOpcion, styles.textoSalir]}>Salirse del grupo actual</Text>
        </TouchableOpacity>

        {/* --- AÑADIDO: Botón para Cerrar Sesión --- */}
        <TouchableOpacity style={[styles.opcion, styles.opcionSalir]} onPress={handleLogout}>
          <Icono>🔒</Icono>
          <Text style={[styles.textoOpcion, styles.textoSalir]}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
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
    margin: 20,
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
  }
});

export default PantallaConfiguraciones;