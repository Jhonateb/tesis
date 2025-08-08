import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import apiClient from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { EstilosCrearAnuncio as styles } from '../estilos/EstilosCrearAnuncio';

const CrearAnuncio = ({ navigation }) => {
  const { usuario } = useAuth();

  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');

  const onDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setShowPicker(false);
      return;
    }

    if (selectedDate) {
      const currentDate = selectedDate;
      setShowPicker(false);

      if (pickerMode === 'date') {
        setDate(currentDate);
        setPickerMode('time');
        setShowPicker(true);
      } else {
        setDate(currentDate);
        setPickerMode('date'); 
      }
    }
  };
  
  const handleShowPicker = () => {
    setPickerMode('date'); 
    setShowPicker(true);
  };

  const handleCrearAnuncio = async () => {
    if (!titulo) {
      return Alert.alert('Campo Requerido', 'El título es obligatorio.');
    }
    setLoading(true);

    const puedeCrearDirectamente = [1, 2, 3].includes(usuario?.rol_id);
    const endpoint = puedeCrearDirectamente ? '/anuncios/crear' : '/anuncios/solicitar';
    const mensajeExito = puedeCrearDirectamente
      ? 'Anuncio creado correctamente.'
      : 'Solicitud de anuncio enviada para aprobación.';

    try {
      await apiClient.post(endpoint, {
        titulo,
        descripcion,
        ubicacion,
        fecha_evento: date.toISOString(),
      });

      Alert.alert('Éxito', mensajeExito, [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.msg || 'No se pudo completar la operación.'
      );
    } finally {
      setLoading(false);
    }
  };

  const textoBoton = [1, 2, 3].includes(usuario?.rol_id)
    ? 'Crear Anuncio'
    : 'Solicitar Anuncio';

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={styles.header}>Nuevo Anuncio</Text>

        <Text style={styles.label}>Título</Text>
        <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Ej: Ensayo General" />

        <Text style={styles.label}>Descripción</Text>
        <TextInput style={[styles.input, styles.textArea]} value={descripcion} onChangeText={setDescripcion} placeholder="Detalles del anuncio..." multiline />

        <Text style={styles.label}>Ubicación (Opcional)</Text>
        <TextInput style={styles.input} value={ubicacion} onChangeText={setUbicacion} placeholder="Ej: Salón Principal" />

        <Text style={styles.label}>Fecha y Hora del Evento</Text>
        <TouchableOpacity onPress={handleShowPicker} style={styles.dateButton}>
          <Text style={styles.dateButtonText}>{date.toLocaleString('es-GT')}</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker value={date} mode={pickerMode} is24Hour={true} display="default" onChange={onDateChange} />
        )}

        <View style={{ flex: 1 }} />

        <TouchableOpacity style={styles.submitButton} onPress={handleCrearAnuncio} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>{textoBoton}</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CrearAnuncio;