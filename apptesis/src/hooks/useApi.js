// /src/hooks/useApi.js

import { useState, useEffect } from 'react';

// Nuestro hook aceptará como argumento la función de la API que debe ejecutar.
// ej: () => apiClient.get('/anuncios')
export const useApi = (apiFunc) => {
  // Los tres estados que siempre necesitamos al cargar datos
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Creamos una función para realizar la petición
  const request = async (...args) => {
    setLoading(true);
    try {
      const result = await apiFunc(...args);
      setData(result.data);
      setError(null); // Limpiamos errores previos si la petición es exitosa
    } catch (err) {
      setError(err); // Capturamos el error
    } finally {
      setLoading(false); // La carga siempre termina, con o sin error
    }
  };

  // Usamos useEffect para ejecutar la petición automáticamente
  // cuando el componente que usa este hook se monta por primera vez.
  useEffect(() => {
    request();
  }, []); // El array vacío asegura que se ejecute solo una vez

  // Devolvemos los estados y la función `request` para que el
  // componente pueda usarlos. Devolver `request` es útil para
  // poder refrescar los datos manualmente (ej. pull-to-refresh).
  return { data, loading, error, request };
};