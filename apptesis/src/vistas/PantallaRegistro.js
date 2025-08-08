import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, ActivityIndicator, TouchableOpacity, TouchableWithoutFeedback, Keyboard, SafeAreaView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { EstilosRegistro } from '../estilos/EstilosRegistro';

const PantallaRegistro = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);

  const handleRegister = async () => {
    if (!nombre || !email || !contrasena) {
      return Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
    }
    setLoading(true);
    const resultado = await register(nombre, email, contrasena);
    setLoading(false);

    if (resultado === true) {
      Alert.alert(
        'Registro Exitoso',
        'Tu cuenta ha sido creada. Ahora, por favor, inicia sesión.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } else {
      Alert.alert('Error de Registro', resultado); 
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={EstilosRegistro.container}>
        <Text style={EstilosRegistro.title}>Crear una Cuenta</Text>
        
        <TextInput
          style={EstilosRegistro.input}
          placeholder="Nombre Completo"
          value={nombre}
          onChangeText={setNombre}
          placeholderTextColor="#888"
          editable={!loading} 
        />
        <TextInput
          style={EstilosRegistro.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
          editable={!loading} 
        />
        
        <View style={EstilosRegistro.inputConIconoContenedor}>
          <TextInput
            style={EstilosRegistro.inputConIcono}
            placeholder="Contraseña"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry={!mostrarContrasena} 
            placeholderTextColor="#888"
            editable={!loading} 
          />
          <TouchableOpacity onPress={() => setMostrarContrasena(!mostrarContrasena)} disabled={loading}>
            <AntDesign 
              name={mostrarContrasena ? "eye" : "eyeo"} 
              size={22} 
              style={EstilosRegistro.iconoOjo} 
            />
          </TouchableOpacity>
        </View>

        <Button title="Registrarse" onPress={handleRegister} disabled={loading} />

        <TouchableOpacity style={EstilosRegistro.loginLink} onPress={() => navigation.goBack()} disabled={loading}>
          <Text style={EstilosRegistro.loginText}>¿Ya tienes una cuenta? Inicia Sesión</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PantallaRegistro;