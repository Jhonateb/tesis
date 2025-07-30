import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
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
      <Text style={styles.label}>Nombre del Grupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Grupo de Jóvenes"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Descripción (Opcional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe el propósito del grupo"
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
      />

      <Button title={loading ? "Creando..." : "Crear Grupo"} onPress={handleCrearGrupo} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  }
});

export default CrearGrupoScreen;