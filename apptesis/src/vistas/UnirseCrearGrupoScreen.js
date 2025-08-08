import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { EstilosUnirseGrupo as styles } from '../estilos/EstilosUnirseGrupo';
import { useAuth } from '../hooks/useAuth';

const UnirseCrearGrupoScreen = ({ navigation }) => {
  const [codigo, setCodigo] = useState('');
  const [loading, setLoading] = useState(false);
  const { unirseAGrupo } = useAuth();

  const handleUnirseGrupo = async () => {
    const codigoLimpio = codigo.trim().toUpperCase();
    if (!codigoLimpio) {
      return Alert.alert(
        'Campo Requerido',
        'Por favor, ingresa un código de grupo.'
      );
    }
    setLoading(true);

    const resultado = await unirseAGrupo(codigoLimpio);

    setLoading(false);
    if (resultado !== true) {
      Alert.alert('Error', resultado);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Únete a un Grupo</Text>
      <Text style={styles.subtitulo}>
        Ingresa el código de invitación para formar parte de una comunidad.
      </Text>

      <View style={styles.inputContenedor}>
        <TextInput
            style={styles.input}
            placeholder="CÓDIGO"
            value={codigo}
            onChangeText={setCodigo}
            autoCapitalize="characters"
            placeholderTextColor="#999"
            maxLength={8}
            editable={!loading}
        />
      </View>

      <TouchableOpacity
        style={[styles.botonPrimario, loading && styles.botonDeshabilitado]}
        onPress={handleUnirseGrupo}
        disabled={loading}
      >
        <Text style={styles.botonTexto}>
          {loading ? 'Uniéndose...' : 'Unirse al Grupo'}
        </Text>
      </TouchableOpacity>

      <View style={styles.separadorContenedor}>
        <View style={styles.linea} />
        <Text style={styles.separadorTexto}>O</Text>
        <View style={styles.linea} />
      </View>

      <TouchableOpacity
        style={styles.botonSecundario}
        onPress={() => navigation.navigate('CrearGrupo')}
        disabled={loading}
      >
        <Text style={styles.botonTextoSecundario}>Crear un Nuevo Grupo</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default UnirseCrearGrupoScreen;