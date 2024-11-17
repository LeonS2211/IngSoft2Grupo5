// ViewModel actualizado
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario";

interface User {
  id: number;
  nombre: string;
  puntos: number;
}

const useCommunityViewModel = () => {
  const [users, setUsers] = useState<User[]>([]); // Top 10 usuarios
  const [currentUser, setCurrentUser] = useState<User | null>(null); // Datos del usuario logueado
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null); // Posición del usuario logueado
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Función para obtener el ID del usuario logueado desde AsyncStorage
  const fetchCurrentUserId = async (): Promise<number | null> => {
    try {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        return parseInt(storedUserId, 10);
      } else {
        throw new Error("No se encontró el ID del usuario logueado.");
      }
    } catch (error) {
      console.error("Error al obtener el ID del usuario logueado:", error);
      setErrorMessage("Error al obtener el ID del usuario logueado.");
      return null;
    }
  };

  // Función para obtener los datos del usuario logueado
  const fetchCurrentUserData = async (userId: number) => {
    try {
      const response = await UsuariosApi.findOne(userId);
      if (response?.status === 200) {
        setCurrentUser(response.data as User);
      } else {
        throw new Error(
          "No se pudieron obtener los datos del usuario logueado."
        );
      }
    } catch (error) {
      console.error("Error al obtener los datos del usuario logueado:", error);
      setErrorMessage("Error al obtener los datos del usuario logueado.");
    }
  };

  // Función para obtener el ranking de usuarios
  const fetchUserRanking = async (userId: number) => {
    try {
      const response = await UsuariosApi.findAll();

      if (response?.status === 200) {
        const usersData = response.data as User[];

        const sortedUsers = usersData.sort((a, b) => b.puntos - a.puntos);

        // Calcula la posición del usuario actual
        const userRank =
          sortedUsers.findIndex((user) => user.id === userId) + 1;
        setCurrentUserRank(userRank);

        // Guarda los Top 10 usuarios
        setUsers(sortedUsers.slice(0, 10));
      } else {
        throw new Error("Error al obtener el ranking de usuarios.");
      }
    } catch (error) {
      console.error("Error en la solicitud al obtener los usuarios:", error);
      setErrorMessage(
        "Error en la solicitud al obtener el ranking de usuarios."
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const userId = await fetchCurrentUserId();
        if (userId) {
          await fetchCurrentUserData(userId); // Obtiene los datos del usuario logueado
          await fetchUserRanking(userId); // Obtiene el ranking de usuarios
        }
      } catch (error) {
        console.error("Error general al cargar datos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    users, // Top 10 usuarios
    currentUser, // Datos del usuario logueado
    currentUserRank,
    isLoading,
    errorMessage,
  };
};

export default useCommunityViewModel;
