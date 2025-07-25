import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const misContenidos = [
  { id: '1', titulo: 'Letra - Cuan Grande es Él', modo_proyeccion: 'scroll' },
  { id: '2', titulo: 'Versículos de Bienvenida', modo_proyeccion: 'slides' },
  { id: '3', titulo: 'Anuncios de la semana', modo_proyeccion: 'slides' },
  { id: '4', titulo: 'Letra - Renuévame', modo_proyeccion: 'scroll' },
];

const PantallaControlador = ({ navigation }) => {

  const renderItem = ({ item }) => (
    <View style={styles.itemContenido}>
      <View style={{ flex: 1 }}>
        <Text style={styles.tituloContenido}>{item.titulo}</Text>
        <Text style={styles.modoTexto}>Modo: {item.modo_proyeccion}</Text>
      </View>
      <TouchableOpacity style={styles.botonPresentar}>
        <Text style={styles.textoBoton}>Presentar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Biblioteca de Contenidos</Text>
      <TouchableOpacity style={styles.botonCrear}>
        <Text style={styles.textoBoton}>+ Crear Nuevo Contenido</Text>
      </TouchableOpacity>

      <FlatList
        data={misContenidos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#fff', paddingTop: 40, paddingHorizontal: 20 },
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  botonCrear: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center' },
  textoBoton: { color: 'white', fontWeight: 'bold' },
  itemContenido: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f9f9f9', padding: 15, marginVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: '#eee' },
  tituloContenido: { fontSize: 16, fontWeight: 'bold' },
  modoTexto: { fontSize: 14, color: '#666', fontStyle: 'italic' },
  botonPresentar: { backgroundColor: '#2ecc71', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8 }
});

export default PantallaControlador;