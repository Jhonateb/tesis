import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TarjetaInfo = ({ titulo, children }) => (
  <View style={styles.tarjeta}>
    <Text style={styles.tituloTarjeta}>{titulo}</Text>
    <Text style={styles.contenidoTarjeta}>{children}</Text>
  </View>
);

const PantallaInformacion = () => {
  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.tituloPrincipal}>Información</Text>
      
      <TarjetaInfo titulo="Nuestra Iglesia">
        Aquí va un texto detallado sobre la historia de la iglesia, su misión, visión y creencias fundamentales, tal como se describe en los requerimientos.
      </TarjetaInfo>

      <TarjetaInfo titulo="Contacto Principal">
        Información de contacto de la iglesia, líderes o encargados de diferentes áreas.
        {"\n\n"}
        Dirección: Av. La Reforma, Huehuetenango
        {"\n"}
        Teléfono: (502) 7764-xxxx
        {"\n"}
        Email: contacto@iglesiaejemplo.com
      </TarjetaInfo>
      
      <TarjetaInfo titulo="Líderes de Ministerios">
        Aquí se puede mostrar la información de las personas responsables de diferentes ministerios o actividades dentro de la iglesia.
        {"\n\n"}
        Ministerio de Alabanza:
        {"\n"}
        - Jhonatan Tebalan
        {"\n\n"}
        Ministerio de Jóvenes:
        {"\n"}
        - Nombre Apellido
      </TarjetaInfo>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tituloPrincipal: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
  },
  tarjeta: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tituloTarjeta: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contenidoTarjeta: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333'
  }
});

export default PantallaInformacion;