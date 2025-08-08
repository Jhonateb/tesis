import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { EstilosLogin as styles } from '../estilos/EstilosLogin';
import { AntDesign } from '@expo/vector-icons';

const LoginView = ({
  email,
  setEmail,
  contrasena,
  setContrasena,
  onLogin,
  onPressGoogle,
  onNavigateToRegister,
  mostrarContrasena,
  setMostrarContrasena,
  loading,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Iniciar Sesión</Text>

        <View style={styles.inputContenedor}>
          <Text style={styles.inputLabel}>Correo Electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="tu@correo.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>

        <View style={styles.inputContenedor}>
          <Text style={styles.inputLabel}>Contraseña</Text>
          <View style={styles.inputConIconoContenedor}>
            <TextInput
              style={styles.inputConIcono}
              placeholder="Tu contraseña"
              value={contrasena}
              onChangeText={setContrasena}
              secureTextEntry={!mostrarContrasena}
              editable={!loading}
            />
            <TouchableOpacity
              onPress={() => setMostrarContrasena(!mostrarContrasena)}
              disabled={loading}
            >
              <AntDesign
                name={mostrarContrasena ? 'eye' : 'eyeo'}
                size={22}
                style={styles.iconoOjo}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Button title="Entrar" onPress={onLogin} disabled={loading} />

        <View style={styles.separadorContenedor}>
          <View style={styles.linea} />
          <Text style={styles.separadorTexto}>o</Text>
          <View style={styles.linea} />
        </View>

        <TouchableOpacity
          style={[styles.botonGoogle, loading && { opacity: 0.5 }]}
          onPress={onPressGoogle}
          disabled={loading}
        >
          <AntDesign name="google" size={24} style={styles.iconoGoogle} />
          <Text style={styles.textoBotonGoogle}>Continuar con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNavigateToRegister}
          style={{ marginTop: 25 }}
          disabled={loading}
        >
          <Text style={styles.linkTexto}>
            ¿No tienes una cuenta? Regístrate
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginView;