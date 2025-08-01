import { StyleSheet } from 'react-native';

const colores = {
  primario: '#4a90e2',
  fondo: '#f7f8fa',
  textoPrincipal: '#333333',
  textoSecundario: '#7f8c8d',
  borde: '#ddd',
  blanco: '#ffffff',
  deshabilitado: '#a9cbf5', 
};

export const EstilosCrearGrupo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colores.fondo,
    padding: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colores.textoPrincipal,
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 16,
    color: colores.textoSecundario,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: colores.blanco,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colores.borde,
    color: colores.textoPrincipal,
  },
  textArea: {
    height: 120, 
    textAlignVertical: 'top', 
    paddingTop: 15,
  },
  boton: {
    backgroundColor: colores.primario,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: colores.blanco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  botonDeshabilitado: {
    backgroundColor: colores.deshabilitado,
  },
});