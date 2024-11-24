import { useState, useEffect } from "react";
import ComunidadApi from "../api/comunidad";
import UsuarioComunidadApi from "../api/usuarioComunidad";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useComunidadViewModel = () => {
  const [comunidades, setComunidades] = useState<any[]>([]); // Lista de comunidades
  const [isLoading, setIsLoading] = useState<boolean>(true); // Estado de carga
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Mensaje de error
  const [searchQuery, setSearchQuery] = useState<string>(""); // Cadena de búsqueda
  const [userId, setUserId] = useState<string | null>(null); // ID del usuario logueado
  const [allComunidades, setAllComunidades] = useState<any[]>([]); // Lista completa de comunidades

  // Obtener el ID del usuario logueado

  const fetchUserId = async () => {
    try {
      const id1 = await AsyncStorage.getItem("userId");
      const id = parseInt(id1);
      setUserId(id);
    } catch (error) {
      console.error("Error al obtener el userId:", error);
    }
  };

  // Función para obtener todas las comunidades
  const fetchComunidades = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Asegurarse de obtener el userId antes de continuar
      const id1 = await AsyncStorage.getItem("userId");
      const id = parseInt(id1);
      setUserId(id); // Establece el userId en el estado

      if (!id) {
        setErrorMessage("No se pudo identificar al usuario.");
        setIsLoading(false);
        return;
      }

      const response = await ComunidadApi.findAll();
      if (response?.status === 200) {
        const todasComunidades = response.data || [];

        // Verificar cuáles son favoritas
        const userComunidadResponse = await UsuarioComunidadApi.findAll();
        const comunidadesFavoritas = userComunidadResponse.data.filter(
          (rel: any) => rel.idUsuario === id
        );

        // Marcar las comunidades favoritas
        todasComunidades.forEach((comunidad: any) => {
          comunidad.isHighlighted = comunidadesFavoritas.some(
            (rel: any) => rel.idComunidad === comunidad.id
          );
        });

        // Ordenar: primero los favoritos
        todasComunidades.sort(
          (a: any, b: any) => b.isHighlighted - a.isHighlighted
        );

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

  // Función para manejar la interacción con favoritos (agregar o eliminar)
  const highlightCommunity = async (
    id: string,
    isCurrentlyHighlighted: boolean
  ) => {
    if (!userId) {
      setErrorMessage("No se pudo identificar al usuario.");
      return;
    }

    try {
      if (isCurrentlyHighlighted) {
        // Eliminar todos los registros relacionados con este usuario y comunidad
        const userComunidadResponse = await UsuarioComunidadApi.findAll();
        const relacionesAEliminar = userComunidadResponse.data.filter(
          (rel: any) =>
            rel.idUsuario === userId && rel.idComunidad === parseInt(id)
        );

        // Eliminar cada relación de la API
        await Promise.all(
          relacionesAEliminar.map((rel: any) =>
            UsuarioComunidadApi.remove(rel.id)
          )
        );

        // Actualizar la lista localmente
        setComunidades((prevComunidades) => {
          const updatedComunidades = [...prevComunidades];
          const index = updatedComunidades.findIndex(
            (comunidad) => comunidad.id === parseInt(id)
          );

          if (index !== -1) {
            updatedComunidades[index].isHighlighted = false;
            // Mover al final de los no favoritos
            const [removedCommunity] = updatedComunidades.splice(index, 1);
            const firstNonFavoriteIndex = updatedComunidades.findIndex(
              (comunidad) => !comunidad.isHighlighted
            );
            updatedComunidades.splice(
              firstNonFavoriteIndex !== -1
                ? firstNonFavoriteIndex
                : updatedComunidades.length,
              0,
              removedCommunity
            );
          }

          return updatedComunidades;
        });
      } else {
        // Agregar a favoritos
        await UsuarioComunidadApi.create({
          idUsuario: userId,
          idComunidad: parseInt(id),
        });

        // Actualizar la lista localmente
        setComunidades((prevComunidades) => {
          const updatedComunidades = [...prevComunidades];
          const index = updatedComunidades.findIndex(
            (comunidad) => comunidad.id === parseInt(id)
          );

          if (index !== -1) {
            updatedComunidades[index].isHighlighted = true;
            // Mover a la parte superior
            const [selectedCommunity] = updatedComunidades.splice(index, 1);
            updatedComunidades.unshift(selectedCommunity);
          }

          return updatedComunidades;
        });
      }
    } catch (error) {
      console.error(
        isCurrentlyHighlighted
          ? "Error al eliminar los favoritos:"
          : "Error al agregar el favorito:",
        error
      );
      setErrorMessage("No se pudo actualizar el estado de favorito.");
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
    highlightCommunity, // Método para manejar favoritos
    filterComunidades, // Método para filtrar comunidades
    searchQuery, // Cadena de búsqueda
    setSearchQuery, // Actualizar la cadena de búsqueda
  };
};

export default useComunidadViewModel;
