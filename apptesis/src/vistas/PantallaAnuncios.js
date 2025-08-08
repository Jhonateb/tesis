import React, { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import apiClient from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import { EstilosAnuncios as styles } from '../estilos/EstilosAnuncios';

const AnuncioCard = ({ item }) => {
  const fecha = new Date(item.fecha_evento).toLocaleString('es-GT', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const handleAddToCalendar = () => {
    alert(`Próximamente: Añadir "${item.titulo}" al calendario.`);
  };

  return (
    <View style={styles.announcementCard}>
      <Text style={styles.announcementTitle}>{item.titulo}</Text>
      <Text style={styles.announcementDescription}>{item.descripcion}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>🗓️ Fecha: {fecha}</Text>
        {item.ubicacion && (
          <Text style={styles.detailText}>📍 Lugar: {item.ubicacion}</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.calendarButton}
        onPress={handleAddToCalendar}
      >
        <Text style={styles.buttonText}>Añadir al Calendario</Text>
      </TouchableOpacity>
    </View>
  );
};

const PantallaAnuncios = ({ navigation }) => {
  const { usuario } = useAuth();
  const {
    data: anuncios,
    loading,
    error,
    request: fetchAnuncios,
  } = useApi(() => apiClient.get('/anuncios'));

  const onRefresh = useCallback(() => {
    fetchAnuncios();
  }, []);

  const renderContent = () => {
    if (loading && !anuncios) {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={styles.crearButton.backgroundColor} />
        </View>
      );
    }

    if (error && !anuncios) {
      return (
        <View style={styles.centered}>
          <Text style={styles.errorText}>No se pudieron cargar los anuncios.</Text>
          <TouchableOpacity onPress={onRefresh}>
            <Text style={{ color: styles.crearButton.backgroundColor }}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (anuncios?.length === 0) {
      return (
        <View style={styles.centered}>
          <Text>No hay anuncios disponibles por ahora.</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={anuncios || []}
        renderItem={({ item }) => <AnuncioCard item={item} />}
        keyExtractor={(item) => item.anuncio_id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={[styles.crearButton.backgroundColor]}
          />
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Anuncios</Text>
        <View style={styles.actionsContainer}>
          {usuario?.rol_id === 1 && (
            <TouchableOpacity
              style={styles.manageButton}
              onPress={() => navigation.navigate('GestionAnuncios')}
            >
              <Text style={styles.manageButtonText}>Gestionar</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.crearButton}
            onPress={() => navigation.navigate('CrearAnuncio')}
          >
            <Text style={styles.crearButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      {renderContent()}
    </SafeAreaView>
  );
};

export default PantallaAnuncios;