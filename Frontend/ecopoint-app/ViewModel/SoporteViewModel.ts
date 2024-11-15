import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario";

const useFeedbackViewModel = () => {
  const [comment, setComment] = useState("");
  const maxCharacters = 120;
  const [lastMsgSoporte, setLastMsgSoporte] = useState(null); // To track the last msgSoporte

  const getUserId = async () => {
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

  const handleCommentChange = (text) => {
    if (text.length <= maxCharacters) {
      setComment(text);
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
        console.error("No se pudo obtener el ID del usuario.");
        return;
      }
      const response = await UsuariosApi.update({
        id: userId,
        msgSoporte: comment,
      });

      if (response?.status === 200) {
        alert("Gracias por tu comentario. Lo revisaremos pronto.");
        setComment("");
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
      const response = await UsuariosApi.findOne(parseInt(userId, 10));
      if (response?.status === 200) {
        const user = response.data;
        // Check if msgSoporte is new
        if (user.msgSoporte !== lastMsgSoporte) {
          setLastMsgSoporte(user.msgSoporte); // Update the last seen msgSoporte
        }

        return user.msgSoporte || "";
      } else {
        console.error("Error al obtener el mensaje de soporte.");
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
      const response = await UsuariosApi.findOne(parseInt(userId, 10));
      if (response?.status === 200) {
        const user = response.data;
        return user.msgResponseSoporte || "";
      } else {
        console.error("Error al obtener el msgResponseSoporte.");
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
    const fetchInitialData = async () => {
      const msgSoporte = await fetchMsgSoporte();
      if (msgSoporte) {
        setLastMsgSoporte(msgSoporte); // Initialize lastMsgSoporte
      }
    };
    fetchInitialData();
  }, []);

  return {
    comment,
    maxCharacters,
    handleCommentChange,
    handleSendFeedback,
    fetchMsgSoporte,
    fetchMsgResponseSoporte,
    clearMsgResponseSoporte,
  };
};

export default useFeedbackViewModel;
