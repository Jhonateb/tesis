// /src/theme/theme.js
export const COLORS = {
  primario: '#4a90e2',
  secundario: '#50c878',
  fondo: '#f7f8fa',
  textoPrincipal: '#333333',
  textoSecundario: '#7f8c8d',
  borde: '#ddd',
  blanco: '#ffffff',
  grisClaro: '#ccc',
  deshabilitado: '#a9cbf5',
  error: '#dc3545',
  exito: '#28a745',
};

export const SIZES = {
  base: 8,
  padding: 16,
  radio: 12, 
  h1: 28,
  h2: 24,
  h3: 20,
  body: 16,
};

export const FONTS = {
  h1: { fontSize: SIZES.h1, fontWeight: 'bold' },
  h2: { fontSize: SIZES.h2, fontWeight: 'bold' },
  body: { fontSize: SIZES.body, color: COLORS.textoPrincipal },
};