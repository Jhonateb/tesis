import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { EstilosCrearGrupo as styles } from '../estilos/EstilosCrearGrupo'; 
import apiClient from '../api/client';

const CrearGrupoScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCrearGrupo = async () => {
    if (!nombre) {
      Alert.alert('Campo Requerido', 'El nombre del grupo es obligatorio.');
      return;
    }
    setLoading(true);
    try {
      await apiClient.post('/grupos/crear', { nombre, descripcion });
      Alert.alert('Éxito', 'El grupo ha sido creado.', [
        { text: 'OK', onPress: () => navigation.replace('MainApp') }
      ]);
    } catch (error) {
      const msg = error.response?.data?.msg || 'No se pudo crear el grupo.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Crear un Nuevo Grupo</Text>

      <Text style={styles.label}>Nombre del Grupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Conectados por la fe"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Descripción (Opcional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Propósito del grupo, horarios, etc."
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={[styles.boton, loading && styles.botonDeshabilitado]}
        onPress={handleCrearGrupo}
        disabled={loading}
      >
        <Text style={styles.botonTexto}>
          {loading ? "Creando..." : "Crear Grupo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CrearGrupoScreen;