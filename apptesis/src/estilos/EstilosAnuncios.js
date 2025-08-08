import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../theme/theme';

export const EstilosAnuncios = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.fondo,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  header: {
    ...FONTS.h1,
    color: COLORS.textoPrincipal,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  manageButton: {
    marginRight: 10,
    backgroundColor: COLORS.textoSecundario,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  manageButtonText: {
    color: COLORS.blanco,
    fontWeight: 'bold',
  },
  crearButton: {
    backgroundColor: COLORS.primario,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  crearButtonText: {
    color: COLORS.blanco,
    fontSize: 28,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  announcementCard: {
    backgroundColor: COLORS.blanco,
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.textoPrincipal,
  },
  announcementDescription: {
    fontSize: 14,
    color: COLORS.textoSecundario,
    marginBottom: 10,
  },
  detailsContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.borde,
    paddingTop: 10,
  },
  detailText: {
    fontSize: 14,
    marginBottom: 5,
    color: COLORS.textoPrincipal,
  },
  calendarButton: {
    backgroundColor: COLORS.primario,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.blanco,
    fontWeight: 'bold',
  },
  errorText: {
    color: COLORS.error,
    fontSize: 16,
    textAlign: 'center',
  },
});