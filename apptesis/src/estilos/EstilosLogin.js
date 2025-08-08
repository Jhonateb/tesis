import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme/theme';

export const EstilosLogin = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: COLORS.fondo,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  titulo: {
    ...FONTS.h1,
    textAlign: 'center',
    marginBottom: 40,
    color: COLORS.textoPrincipal,
  },
  inputContenedor: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: SIZES.body,
    color: COLORS.textoSecundario,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.blanco,
    width: '100%',
    padding: 15,
    borderRadius: 10,
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
    width: '100%',
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
  separadorContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
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
  botonGoogle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blanco,
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: SIZES.radio,
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
    color: COLORS.textoPrincipal,
  },
   linkTexto: {
    color: COLORS.primario,
    fontWeight: 'bold',
  }

});