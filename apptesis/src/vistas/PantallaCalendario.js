import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';

const eventosDelDia = [
  {
    id: '1',
    hora: '10:00 AM',
    titulo: 'Ensayo General de Alabanza',
    tipo: 'Ensayo', // 
  },
  {
    id: '2',
    hora: '05:00 PM',
    titulo: 'Reunión de Líderes de Ministerio',
    tipo: 'Reunión', // 
  },
  {
    id: '3',
    hora: '07:00 PM',
    titulo: 'Culto de Servicio General',
    tipo: 'Culto', // 
  },
  {
    id: '4',
    hora: 'Todo el día',
    titulo: 'Anuncio: Entrega de víveres',
    tipo: 'Anuncio', // 
  }
];


const coloresPorTipo = {
  'Ensayo': '#3498db',
  'Reunión': '#f1c40f',
  'Culto': '#e74c3c',
  'Anuncio': '#2ecc71'
};

const PantallaCalendario = () => {

  const renderItemEvento = ({ item }) => (
    <View style={styles.itemEvento}>
      <View style={styles.columnaHora}>
        <Text style={styles.textoHora}>{item.hora}</Text>
      </View>
      <View style={styles.columnaDetalle}>
        <View style={[styles.marcadorTipo, { backgroundColor: coloresPorTipo[item.tipo] || '#95a5a6' }]} />
        <View>
          <Text style={styles.tituloEvento}>{item.titulo}</Text>
          <Text style={styles.tipoEvento}>{item.tipo}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.contenedor}>
      <Text style={styles.titulo}>Calendario</Text>

      <View style={styles.placeholderCalendario}>
        <Text style={styles.textoPlaceholder}>Vista Mensual del Calendario</Text>
      </View>

      <Text style={styles.subtitulo}>Eventos del día</Text>

      <FlatList
        data={eventosDelDia}
        renderItem={renderItemEvento}
        keyExtractor={item => item.id}
        scrollEnabled={false} 
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 20,
  },
  placeholderCalendario: {
    height: 100,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 20,
  },
  textoPlaceholder: {
    color: '#aaa',
    fontSize: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  itemEvento: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  columnaHora: {
    width: '25%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  textoHora: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333'
  },
  columnaDetalle: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marcadorTipo: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  tituloEvento: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  tipoEvento: {
    fontSize: 14,
    color: '#666',
  }
});

export default PantallaCalendario;