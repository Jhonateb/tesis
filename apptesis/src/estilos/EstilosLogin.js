// EstilosLogin.js

import { StyleSheet } from 'react-native';

const colores = {
  primario: '#4a90e2',
  fondo: '#f7f8fa',
  textoPrincipal: '#333333',
  textoSecundario: '#7f8c8d',
  blanco: '#ffffff',
  grisClaro: '#ccc',
};

export const EstilosLogin = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: colores.textoPrincipal
  },
  
  inputContenedor: {
    width: '100%',
    marginBottom: 20, 
  },
  inputLabel: {
    fontSize: 16,
    color: colores.textoSecundario,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: colores.textoPrincipal,
  },

  // AGREGADO: Estilo para el contenedor que tiene el input y el ícono del ojo
  inputConIconoContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
  },
  // AGREGADO: Estilo para el TextInput cuando está junto a un ícono
  inputConIcono: {
    flex: 1, // Ocupa el espacio disponible
    padding: 15,
    fontSize: 16,
    color: colores.textoPrincipal,
  },
  // AGREGADO: Estilo para el ícono del ojo
  iconoOjo: {
    color: colores.textoSecundario,
    padding: 15, // Aumenta el área táctil
  },

  separadorContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20, 
  },
  linea: {
    flex: 1,
    height: 1,
    backgroundColor: colores.grisClaro,
  },
  separadorTexto: {
    width: 50,
    textAlign: 'center',
    color: colores.textoSecundario,
    fontWeight: 'bold',
  },
  botonGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colores.blanco,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconoGoogle: {
    marginRight: 15,
  },
  textoBotonGoogle: {
    fontSize: 17,
    fontWeight: '500',
    color: colores.textoPrincipal,
  },
});