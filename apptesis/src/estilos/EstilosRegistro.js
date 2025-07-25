import { StyleSheet } from 'react-native';

// --- AÑADIDO: Paleta de colores para consistencia ---
const colores = {
  primario: '#4a90e2',
  fondo: '#f7f8fa',
  textoPrincipal: '#333333',
  textoSecundario: '#7f8c8d',
};

export const EstilosRegistro = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: colores.fondo,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: colores.textoPrincipal,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: colores.textoPrincipal, // <-- MODIFICADO: Se añade color
  },
  // --- ESTILOS COPIADOS DE LOGIN PARA EL CAMPO DE CONTRASEÑA ---
  inputConIconoContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20, // Se mantiene el margen inferior
  },
  inputConIcono: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: colores.textoPrincipal,
  },
  iconoOjo: {
    color: colores.textoSecundario,
    padding: 15,
  },
  // -------------------------------------------------------------
  loginLink: {
    marginTop: 25,
    alignItems: 'center'
  },
  loginText: {
    color: colores.primario,
    fontWeight: 'bold',
  }
});