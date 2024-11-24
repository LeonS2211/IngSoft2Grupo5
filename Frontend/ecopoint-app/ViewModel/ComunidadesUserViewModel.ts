import { useState, useEffect } from "react";
import ComunidadApi from "../api/comunidad";

const useComunidadViewModel = () => {
  const [comunidades, setComunidades] = useState<any[]>([]); // Lista de comunidades
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carga
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Mensaje de error

  // Función para obtener todas las comunidades
  const fetchComunidades = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await ComunidadApi.findAll();
      if (response?.status === 200) {
        setComunidades(response.data || []);
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

  // Función para mover una comunidad a la parte superior
  const highlightCommunity = (id: string) => {
    setComunidades((prevComunidades) => {
      const updatedComunidades = [...prevComunidades];
      const index = updatedComunidades.findIndex(
        (comunidad) => comunidad.id === id
      );
      if (index !== -1) {
        const [selectedCommunity] = updatedComunidades.splice(index, 1);
        updatedComunidades.unshift(selectedCommunity); // Mover a la parte superior
      }
      return updatedComunidades;
    });
  };

  // Efecto para cargar comunidades al montar el componente
  useEffect(() => {
    fetchComunidades();
  }, []);

  return {
    comunidades, // Lista de comunidades
    isLoading, // Estado de carga
    errorMessage, // Mensaje de error
    fetchComunidades, // Método para recargar manualmente
    highlightCommunity, // Método para mover la comunidad a la parte superior
  };
};

export default useComunidadViewModel;
