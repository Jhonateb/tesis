import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { EstilosCrearGrupo as styles } from '../estilos/EstilosCrearGrupo';
import { useAuth } from '../hooks/useAuth';

const CrearGrupoScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [loading, setLoading] = useState(false);
  const { crearGrupo } = useAuth();

  const handleCrearGrupo = async () => {
    if (!nombre) {
      return Alert.alert(
        'Campo Requerido',
        'El nombre del grupo es obligatorio.'
      );
    }
    setLoading(true);
    const resultado = await crearGrupo(nombre, descripcion);
    setLoading(false);

    if (resultado !== true) {
      Alert.alert('Error', resultado);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Crear un Nuevo Grupo</Text>

      <Text style={styles.label}>Nombre del Grupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Conectados por la fe"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#999"
        editable={!loading}
      />

      <Text style={styles.label}>Descripción (Opcional)</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Propósito del grupo, horarios, etc."
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        placeholderTextColor="#999"
        editable={!loading}
      />
      <TouchableOpacity
        style={[styles.boton, loading && styles.botonDeshabilitado]}
        onPress={handleCrearGrupo}
        disabled={loading}
      >
        <Text style={styles.botonTexto}>
          {loading ? 'Creando...' : 'Crear Grupo'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CrearGrupoScreen;