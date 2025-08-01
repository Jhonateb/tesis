// /vistas/UnirseCrearGrupoScreen.js

import React, { useState, useRef } from 'react'; 
import { View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { EstilosUnirseGrupo as styles } from '../estilos/EstilosUnirseGrupo';
import apiClient from '../api/client';

const UnirseCrearGrupoScreen = ({ navigation }) => {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null); 

  const handleUnirseGrupo = async () => {
    const codigoLimpio = codigo.trim();
    if (!codigoLimpio) {
      Alert.alert('Campo Requerido', 'Por favor, ingresa un código de grupo.');
      return;
    }
    setLoading(true);
    try {
      await apiClient.post('/grupos/unirse', { codigo_union: codigoLimpio });
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

  const handleTextChange = (text) => {
    setCodigo(text);
    if (text === '') {
      inputRef.current.blur();
    }
  };
  
  const handleNavegarACrear = () => {
    navigation.navigate('CrearGrupo');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Únete a un Grupo</Text>
      <Text style={styles.subtitulo}>Aún no formas parte de ninguna comunidad.</Text>
      
      <View style={styles.inputContenedor}>
        <TextInput
          ref={inputRef} 
          style={styles.input}
          placeholder="CÓDIGO"
          value={codigo}
          onChangeText={handleTextChange}
          autoCapitalize="characters"
          placeholderTextColor="#999"
        />
      </View>

      <TouchableOpacity
        style={[styles.botonPrimario, loading && styles.botonDeshabilitado]}
        onPress={handleUnirseGrupo}
        disabled={loading}
      >
        <Text style={styles.botonTexto}>
          {loading ? "Uniéndose..." : "Unirse al Grupo"}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.separadorContenedor}>
        <View style={styles.linea} />
        <Text style={styles.separadorTexto}>O</Text>
        <View style={styles.linea} />
      </View>

      <TouchableOpacity
        style={styles.botonSecundario}
        onPress={handleNavegarACrear}
      >
        <Text style={styles.botonTextoSecundario}>
          Crear un Nuevo Grupo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UnirseCrearGrupoScreen;