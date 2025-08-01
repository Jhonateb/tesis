import { StyleSheet } from 'react-native';

const colores = {
  primario: '#4a90e2',
  secundario: '#50c878',
  fondo: '#f7f8fa',
  textoPrincipal: '#333333',
  textoSecundario: '#7f8c8d',
  borde: '#ddd',
  blanco: '#ffffff',
  grisClaro: '#ccc',
  deshabilitado: '#a9cbf5',
};

export const EstilosUnirseGrupo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: colores.fondo,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: colores.textoPrincipal,
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: colores.textoSecundario,
    marginBottom: 40,
  },

   inputContenedor: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
    height: 55, 
  },

  input: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    fontSize: 18,
    color: '#333333',
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 3,
  },


  botonPrimario: {
    backgroundColor: colores.primario,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  botonTexto: {
    color: colores.blanco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  botonDeshabilitado: {
    backgroundColor: colores.deshabilitado,
  },
  separadorContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
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
  botonSecundario: {
    backgroundColor: 'transparent',
    borderColor: colores.primario,
    borderWidth: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  botonTextoSecundario: {
    color: colores.primario,
    fontSize: 18,
    fontWeight: 'bold',
  },
});