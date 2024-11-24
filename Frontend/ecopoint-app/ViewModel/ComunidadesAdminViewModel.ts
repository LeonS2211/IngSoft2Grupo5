import { useState } from "react";
import ComunidadApi from "../api/comunidad";

const useComunidadAdminViewModel = () => {
  const [comunidades, setComunidades] = useState<any[]>([]); // Lista de comunidades
  const [allComunidades, setAllComunidades] = useState<any[]>([]); // Lista completa de comunidades
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carga
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Mensaje de error
  const [searchQuery, setSearchQuery] = useState<string>(""); // Cadena de búsqueda

  // Función para obtener todas las comunidades
  const fetchComunidades = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await ComunidadApi.findAll();
      if (response?.status === 200) {
        const todasComunidades = response.data || [];
        setAllComunidades(todasComunidades); // Guardar la lista original
        setComunidades(todasComunidades); // Mostrar todas las comunidades al inicio
      } else {
        setErrorMessage("Error al obtener las comunidades.");
      }
    } catch (error) {
      console.error("Error al obtener comunidades:", error);
      setErrorMessage("Ocurrió un error al cargar las comunidades.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para filtrar comunidades por texto de búsqueda
  const filterComunidades = () => {
    if (!searchQuery) {
      setComunidades(allComunidades); // Restaurar la lista completa si no hay búsqueda
      return;
    }

    const filteredComunidades = allComunidades.filter((comunidad) =>
      comunidad.nombreComunidad
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setComunidades(filteredComunidades);
  };

  return {
    comunidades, // Lista de comunidades
    isLoading, // Estado de carga
    errorMessage, // Mensaje de error
    fetchComunidades, // Método para recargar manualmente
    filterComunidades, // Método para filtrar comunidades
    searchQuery, // Cadena de búsqueda
    setSearchQuery, // Actualizar la cadena de búsqueda
  };
};

export default useComunidadAdminViewModel;
