import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import apiClient from '../api/client';

const UnirseCrearGrupoScreen = ({ navigation }) => {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUnirseGrupo = async () => {
    if (!codigo) {
      Alert.alert('Campo Requerido', 'Por favor, ingresa un código de grupo.');
      return;
    }
    setLoading(true);
    try {
      await apiClient.post('/grupos/unirse', { codigo_union: codigo });
      Alert.alert('Éxito', 'Te has unido al grupo.', [
        { text: 'OK', onPress: () => navigation.replace('MainApp') }
      ]);
    } catch (error) {
      const msg = error.response?.data?.msg || 'No se pudo unir al grupo. Verifica el código.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleNavegarACrear = () => {
    navigation.navigate('CrearGrupo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>No perteneces a ningún grupo</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el código del grupo"
        value={codigo}
        onChangeText={setCodigo}
        autoCapitalize="characters"
      />
      <Button title={loading ? "Uniéndose..." : "Unirse al Grupo"} onPress={handleUnirseGrupo} disabled={loading} />

      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>O</Text>
        <View style={styles.separator} />
      </View>

      <Button
        title="Crear un Nuevo Grupo"
        onPress={handleNavegarACrear}
        color="#841584"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#888'
  },
});

export default UnirseCrearGrupoScreen;