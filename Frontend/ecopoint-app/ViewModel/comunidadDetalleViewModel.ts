import { useState, useEffect } from "react";
import ComentarioComunidadApi from "../api/comentarioComunidad";
import ComunidadApi from "../api/comunidad";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams } from "expo-router";

const useComunidadViewModel = () => {
  const [publicaciones, setPublicaciones] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { comunidadId } = useLocalSearchParams();
  const [userId, setUserId] = useState<string | null>(null);
  const [comunidadNombre, setComunidadNombre] = useState<string>("");

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    };

    const fetchComunidadNombre = async () => {
      try {
        const response = await ComunidadApi.findOne(comunidadId);
        if (response?.status === 200) {
          setComunidadNombre(response.data.nombreComunidad);
        }
      } catch (error) {
        setErrorMessage("No se pudo obtener el nombre de la comunidad.");
      }
    };

    fetchUserId();
    fetchComunidadNombre();
  }, [comunidadId]);

  // Función para obtener comentarios
  const fetchComentarios = async () => {
    setIsLoading(true);
    try {
      const response = await ComentarioComunidadApi.findAll();
      if (response?.status === 200) {
        // Filtrar comentarios por comunidad y ordenar por fecha descendente
        const comentarios = response.data
          .filter(
            (comentario: any) =>
              comentario.idComunidad === parseInt(comunidadId)
          )
          .sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 20); // Tomar solo los últimos 20 comentarios

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

  // Función para agregar un nuevo comentario
  const addComentario = async (descripcion: string) => {
    try {
      const response = await ComentarioComunidadApi.create({
        descripcion,
        idUsuario: userId,
        idComunidad: parseInt(comunidadId),
      });
      if (response?.status === 200) {
        fetchComentarios(); // Recargar comentarios
        return true;
      }
    } catch (error) {
      console.error("Error al agregar comentario:", error);
      setErrorMessage("No se pudo agregar el comentario.");
    }
    return false;
  };

  return {
    publicaciones,
    isLoading,
    errorMessage,
    fetchComentarios,
    addComentario,
    comunidadNombre, // Retornar el nombre de la comunidad
  };
};

export default useComunidadViewModel;
