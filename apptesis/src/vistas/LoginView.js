import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard 
} from 'react-native';
import { EstilosLogin } from '../estilos/EstilosLogin';
import { AntDesign } from '@expo/vector-icons';

const LoginView = ({ email, setEmail, contrasena, setContrasena, onLogin, onPressGoogle, onNavigateToRegister, mostrarContrasena, setMostrarContrasena }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={EstilosLogin.contenedor}>
        <Text style={EstilosLogin.titulo}>Iniciar Sesión</Text>

        <View style={EstilosLogin.inputContenedor}>
          <Text style={EstilosLogin.inputLabel}>Correo Electrónico</Text>
          <TextInput
            style={EstilosLogin.input}
            placeholder="tu@correo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={EstilosLogin.inputContenedor}>
          <Text style={EstilosLogin.inputLabel}>Contraseña</Text>
          <View style={EstilosLogin.inputConIconoContenedor}>
            <TextInput
              style={EstilosLogin.inputConIcono}
              placeholder="Tu contraseña"
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry={!mostrarContrasena}
            />
            <TouchableOpacity onPress={() => setMostrarContrasena(!mostrarContrasena)}>
              <AntDesign 
                name={mostrarContrasena ? "eye" : "eyeo"} 
                size={22} 
                style={EstilosLogin.iconoOjo} 
              />
            </TouchableOpacity>
          </View>
        </View>
        
        <Button title="Entrar" onPress={onLogin} />
        
        <View style={EstilosLogin.separadorContenedor}>
          <View style={EstilosLogin.linea} />
          <Text style={EstilosLogin.separadorTexto}>o</Text>
          <View style={EstilosLogin.linea} />
        </View>

        <TouchableOpacity style={EstilosLogin.botonGoogle} onPress={onPressGoogle}>
          <AntDesign name="google" size={24} style={EstilosLogin.iconoGoogle} />
          <Text style={EstilosLogin.textoBotonGoogle}>Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNavigateToRegister} style={{ marginTop: 25 }}>
          <Text style={{ color: '#4a90e2', fontWeight: 'bold' }}>
            ¿No tienes una cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginView;