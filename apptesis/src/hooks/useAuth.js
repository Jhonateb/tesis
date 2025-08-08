// /src/hooks/useAuth.js

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Creamos nuestro hook personalizado
export const useAuth = () => {
  // Por dentro, simplemente usa el hook de contexto de React
  const context = useContext(AuthContext);

  // Es una buena práctica añadir una validación para asegurar que este
  // hook se use correctamente dentro del árbol de componentes.
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  // Devolvemos todo el valor del contexto.
  return context;
};