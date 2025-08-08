// /vistas/PantallaConfiguraciones.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, FlatList, SafeAreaView, StatusBar, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext'; 

const Icono = ({ children }) => <Text style={styles.icono}>{children}</Text>;

const PantallaConfiguraciones = () => {
  const { usuario, misGrupos, logout, cambiarGrupoActivo, salirseDeGrupo, isLoading } = useContext(AuthContext);

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
            const resultado = await salirseDeGrupo();
            if (resultado !== true) {
              Alert.alert("Error", resultado);
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
        onPress={() => cambiarGrupoActivo(item.grupo_id)} 
      >
        <Icono>{esActivo ? '🔘' : '⚪️'}</Icono>
        <View>
          <Text style={[styles.textoOpcion, esActivo && styles.textoActivo]}>{item.nombre}</Text>
          <Text style={esActivo ? styles.textoActivo : null}>Tu rol: {item.nombre_rol}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <View style={styles.contenedorCarga}><ActivityIndicator size="large" /></View>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <ScrollView style={styles.contenedor}>
        <Text style={styles.titulo}>Configuraciones</Text>

        <View style={styles.seccion}>
          <Text style={styles.subtitulo}>Mi Perfil</Text>
          <View style={styles.opcion}>
            <Icono>👤</Icono>
            <View>
              <Text style={styles.textoOpcion}>{usuario?.nombre_completo}</Text>
              <Text>{usuario?.email}</Text>
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
          <Text style={styles.subtitulo}>Grupo Actual: {usuario?.nombre_grupo}</Text>
          <View style={styles.tarjetaCodigo}>
            <Text style={styles.textoTarjeta}>Código de unión:</Text>
            <Text style={styles.codigo}>{usuario?.codigo_union}</Text>
          </View>
        </View>

        <View style={styles.seccion}>
           <TouchableOpacity style={[styles.opcion, styles.opcionSalir]} onPress={handleLeaveGroup}>
            <Icono>🚪</Icono><Text style={[styles.textoOpcion, styles.textoSalir]}>Salirse del grupo actual</Text>
          </TouchableOpacity>

           <TouchableOpacity style={[styles.opcion, styles.opcionSalir]} onPress={logout}>
            <Icono>🔒</Icono><Text style={[styles.textoOpcion, styles.textoSalir]}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedorCarga: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contenedor: { backgroundColor: '#f5f5f5' },
  titulo: { fontSize: 28, fontWeight: 'bold', margin: 20 },
  seccion: { marginBottom: 20, backgroundColor: 'white', paddingVertical: 10 },
  subtitulo: { fontSize: 16, fontWeight: 'bold', color: '#666', paddingHorizontal: 20, marginBottom: 10 },
  opcion: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 20, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#eee' },
  textoOpcion: { fontSize: 16, marginLeft: 15 },
  icono: { fontSize: 20 },
  tarjetaCodigo: { backgroundColor: '#e0eafc', borderRadius: 8, padding: 15, marginHorizontal: 20, alignItems: 'center' },
  textoTarjeta: { fontSize: 16, color: '#333' },
  codigo: { fontSize: 24, fontWeight: 'bold', color: '#003366', marginTop: 5 },
  opcionSalir: { borderTopWidth: 1, borderTopColor: '#eee' },
  textoSalir: { color: 'red' },
  opcionActiva: { backgroundColor: '#e0eafc' },
  textoActivo: { fontWeight: 'bold', color: '#003366' },
});

export default PantallaConfiguraciones;