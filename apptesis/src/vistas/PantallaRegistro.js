import React, { useState } from 'react';
import { 
  View, Text, TextInput, Button, Alert, TouchableOpacity, 
  TouchableWithoutFeedback, Keyboard 
} from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import apiClient from '../api/client';
import { getAuth } from '@react-native-firebase/auth';
import { EstilosRegistro } from '../estilos/EstilosRegistro';

const auth = getAuth();

const PantallaRegistro = ({ navigation }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);


  const handleRegister = async () => {
    if (!nombre || !email || !contrasena) {
      Alert.alert('Campos incompletos', 'Por favor, completa todos los campos.');
      return;
    }

    try {

      await apiClient.post('/auth/register', {
        nombre_completo: nombre,
        email: email,
        contrasena: contrasena
      });


      Alert.alert(
        'Registro Exitoso',
        'Tu cuenta ha sido creada. Ahora, por favor, inicia sesión.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );

    } catch (error) {
      const msg = error.response?.data?.msg || 'No se pudo completar el registro.';
      Alert.alert('Error de Registro', msg);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={EstilosRegistro.container}>
        <Text style={EstilosRegistro.title}>Crear una Cuenta</Text>
        
        <TextInput
          style={EstilosRegistro.input}
          placeholder="Nombre Completo"
          value={nombre}
          onChangeText={setNombre}
          placeholderTextColor="#888"
        />
        <TextInput
          style={EstilosRegistro.input}
          placeholder="Correo Electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#888"
        />
        
        <View style={EstilosRegistro.inputConIconoContenedor}>
          <TextInput
            style={EstilosRegistro.inputConIcono}
            placeholder="Contraseña"
            value={contrasena}
            onChangeText={setContrasena}
            secureTextEntry={!mostrarContrasena} 
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={() => setMostrarContrasena(!mostrarContrasena)}>
            <AntDesign 
              name={mostrarContrasena ? "eye" : "eyeo"} 
              size={22} 
              style={EstilosRegistro.iconoOjo} 
            />
          </TouchableOpacity>
        </View>

        <Button title="Registrarse" onPress={handleRegister} />

        <TouchableOpacity style={EstilosRegistro.loginLink} onPress={() => navigation.goBack()}>
          <Text style={EstilosRegistro.loginText}>¿Ya tienes una cuenta? Inicia Sesión</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PantallaRegistro;