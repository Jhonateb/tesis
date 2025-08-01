import { StyleSheet } from 'react-native';

const colores = {
  primario: '#4a90e2',
  fondo: '#f7f8fa',
  textoSecundario: '#7f8c8d',
};

export const EstilosCheckGroup = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.fondo, 
  },
  textoCarga: {
    marginTop: 20,
    fontSize: 16,
    color: colores.textoSecundario,
  }
});