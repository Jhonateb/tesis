import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PantallaEspectador = () => {
 
  const [sesionActiva, setSesionActiva] = useState(false);
  const [textoActual, setTextoActual] = useState('');

  
  if (!sesionActiva) {
    return (
      <View style={styles.contenedorEspera}>
        <Text style={styles.textoEspera}>Esperando que inicie la presentación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.contenedorProyeccion}>
      <Text style={styles.textoProyeccion}>{textoActual}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedorEspera: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#2c3e50' },
  textoEspera: { fontSize: 18, color: '#bdc3c7', fontStyle: 'italic' },
  contenedorProyeccion: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', padding: 20 },
  textoProyeccion: { fontSize: 24, color: 'white', textAlign: 'center' },
});

export default PantallaEspectador;