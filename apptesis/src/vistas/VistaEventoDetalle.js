import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

const VistaEventoDetalle = () => {
  const evento = {
    titulo: "Conferencia Anual de Jóvenes: 'Raíces'",
    ponente: "Pastor Ricardo Gómez",
    descripcion: "Una conferencia de tres días enfocada en fortalecer las bases de nuestra fe. Tendremos talleres, plenarias y tiempos de alabanza. ¡No te lo puedes perder!",
    fecha: "Viernes, 25 de Julio de 2025",
    horario: "09:00 AM - 05:00 PM",
    lugar: "Centro de Convenciones 'La Roca'",
    imagen: "https://via.placeholder.com/400x200.png?text=Evento+Principal" // URL de una imagen de ejemplo
  };

  return (
    <ScrollView style={styles.contenedor}>
      <Image source={{ uri: evento.imagen }} style={styles.imagenCabecera} />
      
      <View style={styles.contenido}>
        <Text style={styles.titulo}>{evento.titulo}</Text>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>🗓️ ¿Cuándo?</Text>
          <Text style={styles.textoContenido}>{evento.fecha}</Text>
          <Text style={styles.textoContenido}>{evento.horario}</Text>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>🎤 ¿Quién expone?</Text>
          <Text style={styles.textoContenido}>{evento.ponente}</Text>
        </View>
        
        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>📍 ¿Dónde?</Text>
          <Text style={styles.textoContenido}>{evento.lugar}</Text>
          <View style={styles.mapaPlaceholder}>
            <Text style={styles.textoPlaceholder}>Mapa aquí</Text>
          </View>
        </View>

        <View style={styles.seccion}>
          <Text style={styles.tituloSeccion}>📖 Descripción Completa</Text>
          <Text style={styles.textoContenido}>{evento.descripcion}</Text>
        </View>

        <View style={styles.contenedorBotones}>
          <TouchableOpacity style={[styles.boton, styles.botonRegistrar]}>
            <Text style={styles.textoBoton}>✅ Registrar Asistencia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.boton, styles.botonRecordatorio]}>
            <Text style={styles.textoBoton}>🔔 Crear Recordatorio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#fff' },
  imagenCabecera: { width: '100%', height: 200 },
  contenido: { padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  seccion: { marginBottom: 20 },
  tituloSeccion: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  textoContenido: { fontSize: 16, lineHeight: 24, color: '#555' },
  mapaPlaceholder: {
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoPlaceholder: { color: '#aaa' },
  contenedorBotones: { marginTop: 20 },
  boton: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  botonRegistrar: { backgroundColor: '#2ecc71' },
  botonRecordatorio: { backgroundColor: '#3498db' },
  textoBoton: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});

export default VistaEventoDetalle;