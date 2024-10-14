import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario";

const GetPuntosViewModel = () => {
  const [userPuntaje, setUserPuntaje] = useState<number>(0); // Estado para almacenar el puntaje del usuario
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error
  const [Fecha, setFecha] = useState<string>();

  // Función para obtener el userId almacenado en AsyncStorage
  const getUserId = async (): Promise<string | null> => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      //console.log(userId);
      //console.log("==============");
      //console.log(parseInt(userId));
      if (!userId) {
        throw new Error(
          "No se pudo encontrar el ID del usuario en AsyncStorage.",
        );
      }
      return userId;
    } catch (error) {
      console.error("Error al obtener el userId del almacenamiento:", error);
      return null;
    }
  };

  // Función para obtener el puntaje del usuario logueado
  const fetchUserPuntaje = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const userId = await getUserId();
      if (!userId) {
        setIsLoading(false);
        return;
      }

      const response = await UsuariosApi.findOne(parseInt(userId, 10));
      //console.log(response.status);
      if (response?.status === 200) {
        const usuario = response.data;
        console.log(usuario);
        setUserPuntaje(usuario.puntos); // Guardamos el puntaje del usuario
        console.log(usuario.puntos);
      } else {
        setErrorMessage("Error al obtener el puntaje del usuario.");
      }
    } catch (error) {
      console.error("Error al obtener el puntaje del usuario:", error);
      setErrorMessage("Error en la solicitud al obtener el puntaje.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para sumar puntos al usuario
  const sumarPuntosUsuario = async (puntosASumar: number) => {
    try {
      const userId = await getUserId();
      if (!userId) {
        setErrorMessage("No se pudo obtener el ID del usuario.");
        return;
      }

      // Obtener la información del usuario
      const response = await UsuariosApi.findOne(parseInt(userId, 10));
      if (response?.status === 200) {
        const usuario = response.data;
        const nuevoPuntaje = usuario.puntos + puntosASumar; // Sumar los puntos al puntaje actual

        // Actualizar el puntaje del usuario en la API
        const updateResponse = await UsuariosApi.update({
          id: usuario.id,
          puntos: nuevoPuntaje,
        });

        if (updateResponse?.status === 200) {
          setUserPuntaje(nuevoPuntaje); // Actualizar el estado local con el nuevo puntaje
          const responseF = await UsuariosApi.findOne(parseInt(userId, 10));
          if (responseF?.status === 200) {
            const usuariosF = responseF.data;
            setFecha(usuariosF.updatedAt.toString());
          } else {
            setErrorMessage("Error al actualizar la fecha actual.");
          }
        } else {
          setErrorMessage("Error al actualizar el puntaje del usuario.");
        }
      } else {
        setErrorMessage("Usuario no encontrado.");
      }
    } catch (error) {
      console.error("Error al sumar puntos:", error);
      setErrorMessage("Error en la solicitud para sumar puntos.");
    }
  };

  return {
    userPuntaje,
    isLoading,
    errorMessage,
    Fecha,
    fetchUserPuntaje,
    sumarPuntosUsuario, // Función para sumar puntos al usuario
  };
};

export default GetPuntosViewModel;
