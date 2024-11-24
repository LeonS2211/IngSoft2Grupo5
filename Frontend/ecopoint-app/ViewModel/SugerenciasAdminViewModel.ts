import { useState, useEffect } from "react";
import SugerenciaPuntoReciclajeApi from "../api/sugerenciaPuntoReciclaje";

const useSugerenciasViewModel = () => {
  const [sugerencias, setSugerencias] = useState([]); // Lista de sugerencias
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Obtener sugerencias de la API
  const fetchSugerencias = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await SugerenciaPuntoReciclajeApi.findAll();
      if (response?.status === 200) {
        setSugerencias(response.data);
      } else {
        setErrorMessage("Error al obtener las sugerencias.");
      }
    } catch (error) {
      console.error("Error al obtener sugerencias:", error);
      setErrorMessage("Ocurrió un error al intentar obtener las sugerencias.");
    } finally {
      setIsLoading(false);
    }
  };

  // Eliminar sugerencia por ID
  const deleteSugerencia = async (id: number) => {
    try {
      const response = await SugerenciaPuntoReciclajeApi.remove(id);
      if (response?.status === 200) {
        setSugerencias((prevSugerencias) =>
          prevSugerencias.filter((sugerencia) => sugerencia.id !== id)
        );
      } else {
        setErrorMessage("Error al eliminar la sugerencia.");
      }
    } catch (error) {
      console.error("Error al eliminar sugerencia:", error);
      setErrorMessage("No se pudo eliminar la sugerencia.");
    }
  };

  useEffect(() => {
    fetchSugerencias();
  }, []);

  return {
    sugerencias,
    isLoading,
    errorMessage,
    fetchSugerencias,
    deleteSugerencia,
  };
};

export default useSugerenciasViewModel;
