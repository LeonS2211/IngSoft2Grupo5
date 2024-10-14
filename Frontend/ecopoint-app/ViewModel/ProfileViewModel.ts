import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario";

const useProfileViewModel = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Función para obtener el ID del usuario logueado desde AsyncStorage
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

  // Función para obtener el email del usuario logueado
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

      // Llamada a la API para obtener la información del usuario
      const response = await UsuariosApi.findOne(parseInt(userId, 20));

      if (response?.status === 200) {
        const usuario = response.data;
        setEmail(usuario.email);
      } else {
        setErrorMessage("Error al obtener el correo del usuario.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error en la solicitud al obtener el email.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    isLoading,
    errorMessage,
    fetchEmail,
  };
};

export default useProfileViewModel;
