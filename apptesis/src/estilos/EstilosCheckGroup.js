import { StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../theme/theme'; 

export const EstilosCheckGroup = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.fondo, 
  },
  textoCarga: {
    marginTop: 20,
    fontSize: SIZES.body, 
    color: COLORS.textoSecundario, 
  }
});