import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme/theme';

export const EstilosCrearAnuncio = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.blanco,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    ...FONTS.h2,
    marginBottom: 30,
    color: COLORS.textoPrincipal,
  },
  label: {
    fontSize: SIZES.body,
    marginBottom: 8,
    color: COLORS.textoSecundario,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.fondo,
    paddingHorizontal: SIZES.padding,
    paddingVertical: 12,
    borderRadius: SIZES.radio,
    fontSize: SIZES.body,
    marginBottom: 20,
    color: COLORS.textoPrincipal,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateButton: {
    backgroundColor: COLORS.fondo,
    padding: 15,
    borderRadius: SIZES.radio,
    alignItems: 'center',
    marginBottom: 20,
  },
  dateButtonText: {
    fontSize: SIZES.body,
    color: COLORS.textoPrincipal,
  },
  submitButton: {
    backgroundColor: COLORS.primario,
    padding: 15,
    borderRadius: SIZES.radio,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: COLORS.blanco,
    fontSize: 18,
    fontWeight: 'bold',
  },
});