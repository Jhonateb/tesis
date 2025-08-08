import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme/theme';

export const EstilosUnirseGrupo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: COLORS.fondo,
  },
  titulo: {
    ...FONTS.h2,
    textAlign: 'center',
    marginBottom: 15,
    color: COLORS.textoPrincipal,
  },
  subtitulo: {
    fontSize: SIZES.body,
    textAlign: 'center',
    color: COLORS.textoSecundario,
    marginBottom: 40,
  },
  inputContenedor: {
    backgroundColor: COLORS.blanco,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borde,
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
    color: COLORS.textoPrincipal,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  botonPrimario: {
    backgroundColor: COLORS.primario,
    padding: 18,
    borderRadius: SIZES.radio,
    alignItems: 'center',
  },
  botonTexto: {
    color: COLORS.blanco,
    fontSize: 18,
    fontWeight: 'bold',
  },
  botonDeshabilitado: {
    backgroundColor: COLORS.deshabilitado,
  },
  separadorContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  linea: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.grisClaro,
  },
  separadorTexto: {
    width: 50,
    textAlign: 'center',
    color: COLORS.textoSecundario,
    fontWeight: 'bold',
  },
  botonSecundario: {
    backgroundColor: 'transparent',
    borderColor: COLORS.primario,
    borderWidth: 2,
    padding: 16,
    borderRadius: SIZES.radio,
    alignItems: 'center',
  },
  botonTextoSecundario: {
    color: COLORS.primario,
    fontSize: 18,
    fontWeight: 'bold',
  },
});