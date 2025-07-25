import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const fakeAnnouncements = [
  {
    id: '1',
    title: 'Ensayo General Ministerio de Alabanza',
    date: '2025-07-25T19:00:00',
    location: 'Salón Principal',
  },
  {
    id: '2',
    title: 'Reunión de Líderes',
    date: '2025-07-28T20:00:00',
    location: 'Oficina Pastoral',
  },
  {
    id: '3',
    title: 'Culto de Jóvenes',
    date: '2025-08-01T18:30:00',
    location: 'Anexo B',
  },
];

const PantallaAnuncios = () => {
  const renderItem = ({ item }) => (
    <View style={styles.announcementCard}>
      <Text style={styles.announcementTitle}>{item.title}</Text>
      <Text>Fecha: {new Date(item.date).toLocaleString()}</Text>
      <Text>Lugar: {item.location}</Text>
      <TouchableOpacity style={styles.calendarButton}>
        <Text style={styles.buttonText}>Añadir al Calendario</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Anuncios</Text>
      <FlatList
        data={fakeAnnouncements}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 20 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  announcementCard: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  announcementTitle: { fontSize: 18, fontWeight: 'bold' },
  calendarButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: { color: '#ffffff' },
});

export default PantallaAnuncios;