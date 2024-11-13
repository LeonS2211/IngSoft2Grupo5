import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario";
import { IPerfil } from "../Models/IPerfil";
import { Alert } from "react-native";

const useConfig = (): IPerfil => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [nombre, setNombre] = useState<string>("");
  const [contraseña, setContraseña] = useState<string>("");
  const [puntos, setPuntos] = useState<number>(0); // Estado para puntos

  useEffect(() => {
    fetchUserData();
  }, []);

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

  const fetchUserData = async () => {
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
        const user = response.data;
        setPerfil(user.nombre || "", user.email || "", "", user.puntos || 0);
      } else {
        setErrorMessage("Error al obtener la información del usuario.");
      }
    } catch (error) {
      console.error(
        "Error en la solicitud al obtener los datos del usuario:",
        error
      );
      setErrorMessage(
        "Error en la solicitud al obtener los datos del usuario."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const verifyUniqueUser = async (
    email: string,
    nombre: string
  ): Promise<boolean> => {
    try {
      const userId = await getUserId();
      if (!userId) {
        Alert.alert("Error", "No se pudo obtener el ID del usuario.");
        return false;
      }

      const response = await UsuariosApi.findAll();
      if (response?.status === 200) {
        const users = response.data;

        const duplicate = users.some(
          (user: any) =>
            (user.email === email || user.nombre === nombre) &&
            user.id !== parseInt(userId, 10)
        );

        if (duplicate) {
          Alert.alert(
            "Error",
            "El correo o nombre ya están registrados por otro usuario."
          );
          return false;
        }
      } else {
        Alert.alert("Error", "No se pudo obtener la lista de usuarios.");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error al verificar el correo y nombre:", error);
      Alert.alert("Error", "Hubo un problema al verificar la información.");
      return false;
    }
  };

  const updateUserData = async () => {
    setIsLoading(true);
    try {
      const userId = await getUserId();
      if (!userId) {
        setErrorMessage("No se pudo obtener el ID del usuario.");
        setIsLoading(false);
        return;
      }

      const isUnique = await verifyUniqueUser(email, nombre);
      if (!isUnique) {
        setIsLoading(false);
        return;
      }

      // Asegúrate de obtener los puntos actuales del usuario antes de hacer la actualización
      const currentUserResponse = await UsuariosApi.findOne(
        parseInt(userId, 10)
      );
      const currentPoints = currentUserResponse?.data?.puntos || puntos;

      const response = await UsuariosApi.update({
        id: parseInt(userId, 10),
        nombre,
        email,
        contraseña,
        puntos: currentPoints, // Incluye los puntos actuales en la actualización
      });

      if (response?.status === 200) {
        Alert.alert("Éxito", "Los cambios se han guardado correctamente");
        setPuntos(currentPoints); // Actualiza los puntos en el estado local
      } else {
        setErrorMessage("Error al guardar los cambios.");
      }
    } catch (error) {
      console.error(
        "Error en la solicitud al actualizar los datos del usuario:",
        error
      );
      setErrorMessage(
        "Error en la solicitud al actualizar los datos del usuario."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const setPerfil = (
    nombre: string,
    correoElectronico: string,
    contraseña: string,
    puntos: number
  ): void => {
    setNombre(nombre);
    setEmail(correoElectronico);
    setContraseña(contraseña);
    setPuntos(puntos); // Asegúrate de incluir los puntos en el perfil
  };

  const mostrarDetalles = (): string => {
    return `Nombre: ${nombre}, Email: ${email}, Puntos: ${puntos}`;
  };

  return {
    setPerfil,
    mostrarDetalles,
    email,
    nombre,
    contraseña,
    puntos,
    isLoading,
    errorMessage,
    fetchUserData,
    updateUserData,
    verifyUniqueUser,
  };
};

export default useConfig;
