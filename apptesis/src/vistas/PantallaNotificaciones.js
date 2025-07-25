import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const notificacionesGenerales = [
  { id: '1', titulo: 'Recordatorio de ensayo', fecha: 'hace 5 minutos' },
  { id: '2', titulo: 'Se ha añadido una nueva canción: "Digno y Santo"', fecha: 'hace 1 hora' },
  { id: '3', titulo: 'La reunión de líderes se ha movido a las 8 PM', fecha: 'hace 3 horas' },
];

const notificacionesImportantes = [
  { id: '1', titulo: 'URGENTE: El culto de hoy se cancela', fecha: 'hace 10 minutos' },
  { id: '2', titulo: 'Se requiere la presencia de todos los músicos mañana a las 9 AM', fecha: 'ayer' },
];


const PantallaNotificaciones = () => {
  const [tabActiva, setTabActiva] = useState('Generales'); // 'Generales' o 'Importantes'

  const datosAMostrar = tabActiva === 'Generales' ? notificacionesGenerales : notificacionesImportantes;

  const renderItemNotificacion = ({ item }) => (
    <View style={tabActiva === 'Generales' ? styles.itemNotificacion : styles.itemImportante}>
      {tabActiva === 'Importantes' && <Text style={styles.iconoImportante}>⚠️</Text>}
      <View style={styles.textoContenedor}>
        <Text style={styles.tituloNotificacion}>{item.titulo}</Text>
        <Text style={styles.fechaNotificacion}>{item.fecha}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Notificaciones</Text>
      
      <View style={styles.contenedorPestanas}>
        <TouchableOpacity 
          style={[styles.pestana, tabActiva === 'Generales' && styles.pestanaActiva]} 
          onPress={() => setTabActiva('Generales')}
        >
          <Text style={styles.textoPestana}>Generales</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.pestana, tabActiva === 'Importantes' && styles.pestanaActiva]}
          onPress={() => setTabActiva('Importantes')}
        >
          <Text style={styles.textoPestana}>Importantes</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={datosAMostrar}
        renderItem={renderItemNotificacion}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.botonFlotante}>
        <Text style={styles.textoBotonFlotante}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#fff' },
  titulo: { fontSize: 28, fontWeight: 'bold', margin: 20 },
  contenedorPestanas: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  pestana: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  pestanaActiva: {
    backgroundColor: '#007bff',
  },
  textoPestana: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  },
  itemNotificacion: {
    padding: 15,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  itemImportante: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    backgroundColor: '#fffbe6',
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#f1c40f',
  },
  iconoImportante: {
    fontSize: 24,
    marginRight: 10,
  },
  textoContenedor: {
    flex: 1,
  },
  tituloNotificacion: {
    fontSize: 16,
  },
  fechaNotificacion: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  botonFlotante: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, 
  },
  textoBotonFlotante: {
    fontSize: 30,
    color: 'white',
  }
});

export default PantallaNotificaciones;