import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../theme/theme';

export const EstilosGestionAnuncios = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fondo,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...FONTS.body,
    color: COLORS.error,
  },
  emptyText: {
    ...FONTS.body,
    color: COLORS.textoSecundario,
  },
  card: {
    backgroundColor: COLORS.blanco,
    borderRadius: SIZES.radio,
    padding: SIZES.padding,
    marginVertical: SIZES.base,
    marginHorizontal: SIZES.base + 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  cardTitle: {
    ...FONTS.h3,
    fontSize: 18, // Un poco más pequeño que h3
    marginBottom: SIZES.base / 2,
    color: COLORS.textoPrincipal,
  },
  solicitante: {
    fontSize: 12,
    color: COLORS.textoSecundario,
    fontStyle: 'italic',
    marginBottom: SIZES.base,
  },
  cardDescription: {
    ...FONTS.body,
    fontSize: 14,
    color: COLORS.textoPrincipal,
    marginBottom: SIZES.base,
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borde,
    paddingTop: SIZES.base,
    marginTop: SIZES.base / 2,
  },
  detailText: {
    fontSize: 14,
    marginBottom: SIZES.base / 2,
    color: COLORS.textoSecundario,
  },
  botonesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.padding,
  },
  boton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: SIZES.base / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonAprobar: {
    backgroundColor: COLORS.exito,
    marginLeft: SIZES.base / 2,
  },
  botonRechazar: {
    backgroundColor: COLORS.error,
    marginRight: SIZES.base / 2,
  },
  botonTexto: {
    color: COLORS.blanco,
    fontWeight: 'bold',
    fontSize: SIZES.body,
  },
});