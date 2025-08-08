import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  RefreshControl,
} from 'react-native';
import apiClient from '../api/client';
import { useApi } from '../hooks/useApi';
import { EstilosGestionAnuncios as styles } from '../estilos/EstilosGestionAnuncios';

const SolicitudCard = ({ item, onGestionar }) => {
  const fecha = new Date(item.fecha_evento).toLocaleString('es-GT', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.titulo}</Text>
      <Text style={styles.solicitante}>Solicitado por: {item.solicitante_nombre}</Text>
      {item.descripcion && <Text style={styles.cardDescription}>{item.descripcion}</Text>}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>🗓️ Fecha del evento: {fecha}</Text>
        {item.ubicacion && <Text style={styles.detailText}>📍 Lugar: {item.ubicacion}</Text>}
      </View>
      <View style={styles.botonesContainer}>
        <TouchableOpacity
          style={[styles.boton, styles.botonRechazar]}
          onPress={() => onGestionar(item.anuncio_id, 'rechazado')}
        >
          <Text style={styles.botonTexto}>Rechazar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.boton, styles.botonAprobar]}
          onPress={() => onGestionar(item.anuncio_id, 'aprobado')}
        >
          <Text style={styles.botonTexto}>Aprobar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GestionAnunciosScreen = () => {
  const {
    data: solicitudes,
    loading,
    error,
    request: fetchSolicitudes,
  } = useApi(() => apiClient.get('/anuncios/solicitudes'));

  const onRefresh = useCallback(() => {
    fetchSolicitudes();
  }, []);

  const handleGestionar = (anuncioId, decision) => {
    Alert.alert(
      `Confirmar ${decision}`,
      `¿Estás seguro de que quieres ${decision.toLowerCase()} este anuncio?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, Confirmar',
          style: decision === 'rechazado' ? 'destructive' : 'default',
          onPress: async () => {
            try {
              await apiClient.put(`/anuncios/gestionar/${anuncioId}`, { decision });
              Alert.alert('Éxito', `El anuncio ha sido ${decision}.`);
              fetchSolicitudes();
            } catch (err) {
              Alert.alert('Error', 'No se pudo completar la acción.');
            }
          },
        },
      ]
    );
  };

  if (loading && !solicitudes) {
    return <View style={styles.centered}><ActivityIndicator size="large" /></View>;
  }

  if (error) {
    return <View style={styles.centered}><Text style={styles.errorText}>No se pudieron cargar las solicitudes.</Text></View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      {solicitudes?.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>No hay solicitudes pendientes por ahora.</Text>
        </View>
      ) : (
        <FlatList
          data={solicitudes}
          renderItem={({ item }) => <SolicitudCard item={item} onGestionar={handleGestionar} />}
          keyExtractor={item => item.anuncio_id.toString()}
          contentContainerStyle={{ padding: 10 }}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
        />
      )}
    </SafeAreaView>
  );
};

export default GestionAnunciosScreen;