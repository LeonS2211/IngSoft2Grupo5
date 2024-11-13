import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario";
import { Alert } from "react-native";

const useProfileViewModel = () => {
  const [email, setEmail] = useState<string>("");
  const [puntos, setPuntos] = useState<number | null>(null);
  const [rankingPosition, setRankingPosition] = useState<number | null>(null); // Nueva variable para el ranking
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getUserId = async (): Promise<string | null> => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error(
          "No se pudo encontrar el ID del usuario en AsyncStorage."
        );
      }
      return userId;
    } catch (error) {
      console.error("Error al obtener el userId del almacenamiento:", error);
      return null;
    }
  };

  const fetchEmail = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const userId = await getUserId();

      if (!userId) {
        setErrorMessage("No se pudo obtener el ID del usuario.");
        setIsLoading(false);
        return;
      }

      const response = await UsuariosApi.findOne(parseInt(userId, 10));

      if (response?.status === 200) {
        const usuario = response.data;
        setEmail(usuario.nombre);
        setPuntos(usuario.puntos);
        await calculateRankingPosition(usuario.puntos); // Calcula la posición en el ranking
      } else {
        setErrorMessage("Error al obtener el nombre del usuario.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error en la solicitud al obtener el email.");
    } finally {
      setIsLoading(false);
    }
  };

  // Nueva función para calcular la posición en el ranking
  const calculateRankingPosition = async (userPoints: number) => {
    try {
      const response = await UsuariosApi.findAll();
      if (response?.status === 200) {
        const users = response.data;

        // Ordena los usuarios por puntos de forma descendente
        const sortedUsers = users.sort((a: any, b: any) => b.puntos - a.puntos);

        // Encuentra la posición del usuario actual en la lista ordenada
        const position = sortedUsers.findIndex(
          (user: any) => user.puntos === userPoints
        );

        setRankingPosition(position + 1); // Guarda la posición (añade 1 para el ranking)
      } else {
        setErrorMessage(
          "Error al obtener la lista de usuarios para el ranking."
        );
      }
    } catch (error) {
      console.error("Error al calcular la posición en el ranking:", error);
      setErrorMessage("Hubo un problema al calcular el ranking.");
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userId");
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "Hubo un problema al cerrar la sesión.");
    }
  };

  return {
    email,
    puntos,
    rankingPosition,
    isLoading,
    errorMessage,
    fetchEmail,
    logout,
  };
};

export default useProfileViewModel;
