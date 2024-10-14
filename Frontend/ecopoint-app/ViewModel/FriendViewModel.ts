// FriendViewModel.ts
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario"; // API para buscar amigos y usuario logueado
import { Usuario } from "../Models/usuarioModel"; // Asegúrate de que la ruta sea correcta

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
      const response = await UsuariosApi.findAll();
      if (response?.status === 200) {
        const foundUser = response.data.find(
          (user) => user.codigoAmistad === enteredCode
        );
        if (foundUser) {
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

  const reclamarRecompensa = async (friendEmail: string) => {
    try {
      if (usedCodes.includes(friendEmail)) {
        setErrorMessage("Ya has reclamado puntos con este amigo.");
        return;
      }

      const userId = await getUserId();
      if (!userId) {
        setErrorMessage("No se pudo obtener el ID del usuario logueado.");
        return;
      }

      // Asegúrate de que la cuenta del usuario esté creada
      // Aquí debes proporcionar datos válidos para crear la cuenta del usuario
      const usuarioLogueado = Usuario.crearCuenta(
        "NombreEjemplo", // Sustituir por el nombre real
        "ApellidoEjemplo", // Sustituir por el apellido real
        "correo@ejemplo.com", // Sustituir por el correo real
        "contraseñaSegura", // Sustituir por la contraseña real
        123456789, // Sustituir por el número real
        0 // Puntaje inicial
      );

      // Obtener información del usuario logueado
      const responseUsuarioLogueado = await UsuariosApi.findOne(
        parseInt(userId, 10)
      );
      if (responseUsuarioLogueado?.status === 200) {
        const usuarioLogueado = responseUsuarioLogueado.data;

        const responseAmigo = await UsuariosApi.findAll();
        const amigo = responseAmigo?.data.find(
          (user) => user.email === friendEmail
        );

        if (!amigo) {
          setErrorMessage("Amigo no encontrado.");
          return;
        }

        const puntosCapturadosUser = usuarioLogueado.puntos || 0;
        const puntosCapturadosUserAmigo = amigo.puntos || 0;

        console.log(
          `Puntos capturados de usuario logueado: ${puntosCapturadosUser}`
        );
        console.log(
          `Puntos capturados de usuario amigo: ${puntosCapturadosUserAmigo}`
        );

        // Llama a la función reclamarRecompensa para sumar puntos
        const {
          puntosCapturadosUser: nuevosPuntosUser,
          puntosCapturadosUserAmigo: nuevosPuntosAmigo,
        } = Usuario.reclamarRecompensa(
          puntosCapturadosUser,
          puntosCapturadosUserAmigo
        );

        // Actualizar puntos del usuario logueado
        const updateUsuarioLogueado = await UsuariosApi.update({
          id: usuarioLogueado.id,
          puntos: nuevosPuntosUser, // Sumar 20 puntos al usuario logueado
        });

        // Actualizar puntos del amigo
        const updateAmigo = await UsuariosApi.update({
          id: amigo.id,
          puntos: nuevosPuntosAmigo, // Sumar 15 puntos al amigo
        });

        // Verificar si ambas actualizaciones fueron exitosas
        if (
          updateUsuarioLogueado?.status === 200 &&
          updateAmigo?.status === 200
        ) {
          console.log("Puntos actualizados correctamente para ambos.");
          setUsedCodes((prevCodes) => [...prevCodes, friendEmail]);
          setFriends([]); // Limpiar la bandeja
        } else {
          setErrorMessage("Error al actualizar los puntos.");
          return;
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
    // Agregamos reclamarRecompensa al objeto de retorno
  };
};

export default useFriendViewModel;
