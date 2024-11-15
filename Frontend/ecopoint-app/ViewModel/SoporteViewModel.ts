import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario";

const useFeedbackViewModel = () => {
  const [comment, setComment] = useState("");
  const maxCharacters = 120;
  const COMMENT_KEY = "user_comment"; // Clave para almacenar el comentario en AsyncStorage

  const loadStoredComment = async () => {
    try {
      const storedComment = await AsyncStorage.getItem(COMMENT_KEY);
      if (storedComment) {
        setComment(storedComment);
      }
    } catch (error) {
      console.error("Error al cargar el comentario almacenado:", error);
    }
  };

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId)
        throw new Error("ID de usuario no encontrado en AsyncStorage");
      return parseInt(userId, 10);
    } catch (error) {
      console.error("Error al obtener el ID del usuario:", error);
      return null;
    }
  };

  // Guardar el comentario en AsyncStorage
  const saveCommentToStorage = async (text) => {
    try {
      await AsyncStorage.setItem(COMMENT_KEY, text);
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
    }
  };

  const clearStoredComment = async () => {
    try {
      await AsyncStorage.removeItem(COMMENT_KEY);
      setComment("");
    } catch (error) {
      console.error("Error al limpiar el comentario almacenado:", error);
    }
  };

  const handleCommentChange = (text) => {
    if (text.length <= maxCharacters) {
      setComment(text);
      saveCommentToStorage(text); // Guardar automáticamente el comentario
    }
  };

  const handleSendFeedback = async () => {
    if (comment.trim() === "") {
      alert("Por favor, escribe un comentario.");
      return false;
    }

    try {
      const userId = await getUserId();
      if (!userId) {
        alert(
          "No se encontró el usuario. Por favor, inicia sesión nuevamente."
        );
        return false;
      }

      // Actualizar msgSoporte del usuario con el comentario
      const response = await UsuariosApi.update({
        id: userId,
        msgSoporte: comment,
      });

      if (response?.status === 200) {
        alert(
          "Te agredecemos por tus comentarios , soporte analizará su comentario."
        );
        clearStoredComment(); // Limpiar el comentario después de enviarlo
        return true;
      } else {
        console.error("Error al actualizar el comentario:", response?.data);
        alert("Hubo un error al enviar tu comentario. Intenta de nuevo.");
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud para enviar el comentario:", error);
      alert("Hubo un error al enviar tu comentario. Intenta de nuevo.");
      return false;
    }
  };

  const fetchMsgSoporte = async () => {
    try {
      const userId = await getUserId();
      if (!userId) return null;

      const response = await UsuariosApi.findOne(userId);
      if (response?.status === 200) {
        // Si llega un nuevo msgSoporte, limpiar msgResponseSoporte
        if (response.data.msgSoporte) {
          await clearMsgResponseSoporte();
        }
        return response.data.msgSoporte || "";
      } else {
        console.error("Error al obtener el msgSoporte:", response?.data);
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el msgSoporte:", error);
      return null;
    }
  };

  const fetchMsgResponseSoporte = async () => {
    try {
      const userId = await getUserId();
      if (!userId) return null;

      const response = await UsuariosApi.findOne(userId);
      if (response?.status === 200) {
        return response.data.msgResponseSoporte || "";
      } else {
        console.error(
          "Error al obtener el msgResponseSoporte:",
          response?.data
        );
        return null;
      }
    } catch (error) {
      console.error("Error al obtener el msgResponseSoporte:", error);
      return null;
    }
  };

  const clearMsgResponseSoporte = async () => {
    try {
      const userId = await getUserId();
      if (!userId) return;

      const response = await UsuariosApi.update({
        id: userId,
        msgResponseSoporte: "", // Clear the msgResponseSoporte field
      });

      if (response?.status === 200) {
        console.log("msgResponseSoporte limpiado correctamente.");
      } else {
        console.error(
          "Error al limpiar el msgResponseSoporte:",
          response?.data
        );
      }
    } catch (error) {
      console.error("Error al limpiar el msgResponseSoporte:", error);
    }
  };

  useEffect(() => {
    loadStoredComment();
  }, []);

  return {
    comment,
    maxCharacters,
    handleCommentChange,
    handleSendFeedback,
    fetchMsgSoporte,
    fetchMsgResponseSoporte,
    clearMsgResponseSoporte,
    clearStoredComment,
  };
};

export default useFeedbackViewModel;
