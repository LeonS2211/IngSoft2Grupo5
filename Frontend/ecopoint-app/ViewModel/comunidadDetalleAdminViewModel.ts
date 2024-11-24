import { useState, useEffect } from "react";
import ComentarioComunidadApi from "../api/comentarioComunidad";
import ComunidadApi from "../api/comunidad";
import { useLocalSearchParams } from "expo-router";

const useComunidadAdminViewModel = () => {
  const [publicaciones, setPublicaciones] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { idComunidad } = useLocalSearchParams();
  const [comunidadNombre, setComunidadNombre] = useState<string>("");

  useEffect(() => {
    const fetchComunidadNombre = async () => {
      try {
        const response = await ComunidadApi.findOne(idComunidad);
        if (response?.status === 200) {
          setComunidadNombre(response.data.nombreComunidad);
        }
      } catch (error) {
        setErrorMessage("No se pudo obtener el nombre de la comunidad.");
      }
    };

    fetchComunidadNombre();
  }, [idComunidad]);

  // Función para obtener comentarios
  const fetchComentarios = async () => {
    setIsLoading(true);
    try {
      const response = await ComentarioComunidadApi.findAll();
      if (response?.status === 200) {
        const comentarios = response.data
          .filter(
            (comentario: any) =>
              comentario.idComunidad === parseInt(idComunidad)
          )
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 20);
        setPublicaciones(comentarios);
      } else {
        setErrorMessage("Error al cargar los comentarios.");
      }
    } catch (error) {
      console.error("Error al cargar comentarios:", error);
      setErrorMessage("No se pudo cargar los comentarios.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para eliminar un comentario
  const deleteComentario = async (id: number) => {
    try {
      await ComentarioComunidadApi.remove(id);
      setPublicaciones((prev) =>
        prev.filter((comentario: any) => comentario.id !== id),
      );
      return true;
    } catch (error) {
      console.error("Error al eliminar comentario:", error);
      setErrorMessage("No se pudo eliminar el comentario.");
      return false;
    }
  };

  return {
    publicaciones,
    isLoading,
    errorMessage,
    fetchComentarios,
    deleteComentario,
    comunidadNombre,
  };
};

export default useComunidadAdminViewModel;
