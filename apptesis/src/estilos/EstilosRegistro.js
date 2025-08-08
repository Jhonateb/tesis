import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme/theme';

export const EstilosRegistro = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: COLORS.fondo,
  },
  title: {
    ...FONTS.h1,
    textAlign: 'center',
    marginBottom: 40,
    color: COLORS.textoPrincipal,
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
  inputConIconoContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.blanco,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.borde,
    marginBottom: 20,
  },
  inputConIcono: {
    flex: 1,
    padding: 15,
    fontSize: SIZES.body,
    color: COLORS.textoPrincipal,
  },
  iconoOjo: {
    color: COLORS.textoSecundario,
    padding: 15,
  },
  loginLink: {
    marginTop: 25,
    alignItems: 'center',
  },
  loginText: {
    color: COLORS.primario,
    fontWeight: 'bold',
  },
});