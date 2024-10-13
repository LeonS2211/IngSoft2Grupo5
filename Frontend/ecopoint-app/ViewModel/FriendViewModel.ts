import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario"; // API para buscar amigos y usuario logueado
import UsuariosAmigoApi from "../api/usuarioAmigo"; // API para incrementar recompensas

const useFriendViewModel = () => {
  const [codigoAmistad, setCodigoAmistad] = useState<string>(""); // Estado para el código de amistad del usuario logueado
  const [friends, setFriends] = useState<string[]>([]); // Estado para almacenar los correos de los amigos
  const [usedCodes, setUsedCodes] = useState<string[]>([]); // Estado para almacenar los códigos ya utilizados
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para el mensaje de error

  useEffect(() => {
    fetchCodigoAmistad(); // Llamamos a fetchCodigoAmistad al cargar la vista
  }, []);

  // Función para obtener el userId almacenado en AsyncStorage
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

  // Función para obtener el código de amistad del usuario logueado
  const fetchCodigoAmistad = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const userId = await getUserId();
      if (!userId) {
        setIsLoading(false);
        return;
      }

      const numericUserId = parseInt(userId, 10);
      if (isNaN(numericUserId)) {
        throw new Error("El ID del usuario no es válido.");
      }

      // Llamada a la API para obtener el código de amistad del usuario
      const response = await UsuariosApi.findOne(numericUserId);
      if (response?.status === 200) {
        const usuario = response.data;
        setCodigoAmistad(usuario.codigoAmistad); // Guardamos el código de amistad
      } else {
        setErrorMessage("Error al obtener el código de amistad.");
      }
    } catch (error) {
      console.error("Error al obtener el código de amistad:", error);
      setErrorMessage("Error en la solicitud al obtener el código de amistad.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para verificar si un código de amistad coincide con algún usuario
  const checkFriendCode = async (enteredCode: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Llamada a la API para buscar el usuario por el código de amistad (UsuariosApi)
      const response = await UsuariosApi.findAll();

      if (response?.status === 200) {
        const foundUser = response.data.find(
          (user) => user.codigoAmistad === enteredCode
        );

        if (foundUser) {
          // Agregamos el correo del amigo a la lista de amigos y el código a la lista de usados
          const updatedFriends = [...friends, foundUser.email];
          setFriends(updatedFriends);
          setUsedCodes((prevCodes) => [...prevCodes, enteredCode]); // Agregar el código a los usados
        } else {
          setErrorMessage(
            "No se encontró ningún usuario con ese código de amistad."
          );
        }
      } else {
        setErrorMessage("Error al buscar el código de amistad.");
      }
    } catch (error) {
      console.error("Error al buscar el código de amistad:", error);
      setErrorMessage("Error en la solicitud al buscar el código de amistad.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función para reclamar la recompensa y actualizar los puntos del usuario logueado y del amigo
  const reclamarRecompensa = async (friendEmail: string) => {
    try {
      // Verificar si el correo del amigo ya fue utilizado
      if (usedCodes.includes(friendEmail)) {
        setErrorMessage("Ya has reclamado puntos con este amigo.");
        return;
      }

      // Obtener el ID del usuario logueado desde AsyncStorage
      const userId = await getUserId();
      if (!userId) {
        setErrorMessage("No se pudo obtener el ID del usuario logueado.");
        return;
      }

      // Obtener información del usuario logueado
      const responseUsuarioLogueado = await UsuariosApi.findOne(
        parseInt(userId, 10)
      );
      if (responseUsuarioLogueado?.status === 200) {
        const usuarioLogueado = responseUsuarioLogueado.data;

        // Obtener información del amigo
        const responseAmigo = await UsuariosApi.findAll();
        const amigo = responseAmigo?.data.find(
          (user) => user.email === friendEmail
        );

        if (!amigo) {
          setErrorMessage("Amigo no encontrado.");
          return;
        }

        // Sumar puntos
        const nuevosPuntosLogueado = (usuarioLogueado.puntos || 0) + 20;
        const nuevosPuntosAmigo = (amigo.puntos || 0) + 15;

        console.log(`Nuevos puntos usuario logueado: ${nuevosPuntosLogueado}`);
        console.log(`Nuevos puntos amigo: ${nuevosPuntosAmigo}`);

        // Actualizar puntos del usuario logueado
        const updateUsuarioLogueado = await UsuariosApi.update({
          id: usuarioLogueado.id,
          puntos: nuevosPuntosLogueado,
        });

        // Actualizar puntos del amigo
        const updateAmigo = await UsuariosApi.update({
          id: amigo.id,
          puntos: nuevosPuntosAmigo,
        });

        // Verificar si ambas actualizaciones fueron exitosas
        if (
          updateUsuarioLogueado?.status === 200 &&
          updateAmigo?.status === 200
        ) {
          console.log("Puntos actualizados correctamente para ambos.");

          // Guardar el correo del amigo como utilizado y limpiar la bandeja de amigos
          setUsedCodes((prevCodes) => [...prevCodes, friendEmail]);
          setFriends([]); // Limpiar la bandeja
        } else {
          // Si hay algún error en la actualización de puntos
          setErrorMessage("Error al actualizar los puntos.");
          return; // No marcar el correo como utilizado si hay errores
        }
      } else {
        setErrorMessage("Usuario logueado no encontrado.");
      }
    } catch (error) {
      console.error("Error al reclamar recompensa:", error);
      setErrorMessage("Error en la solicitud al reclamar la recompensa.");
    }
  };

  return {
    codigoAmistad,
    friends,
    isLoading,
    errorMessage,
    fetchCodigoAmistad,
    checkFriendCode,
    reclamarRecompensa, // Agregamos reclamarRecompensa al objeto de retorno
  };
};

export default useFriendViewModel;
