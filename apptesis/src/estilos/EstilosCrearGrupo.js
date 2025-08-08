import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme/theme';

export const EstilosCrearGrupo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fondo,
    padding: 30,
  },
  titulo: {
    ...FONTS.h2, 
    color: COLORS.textoPrincipal, 
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: SIZES.body, 
    color: COLORS.textoSecundario,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.blanco, 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: SIZES.body, 
    borderWidth: 1,
    borderColor: COLORS.borde, 
    color: COLORS.textoPrincipal,
  },
  textArea: {
    height: 120, 
    textAlignVertical: 'top', 
    paddingTop: 15,
  },
  boton: {
    backgroundColor: COLORS.primario, 
    padding: 18,
    borderRadius: SIZES.radio,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: COLORS.blanco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  botonDeshabilitado: {
    backgroundColor: COLORS.deshabilitado, 
  },
});