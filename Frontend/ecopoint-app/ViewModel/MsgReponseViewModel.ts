import { useState, useEffect } from "react";
import UsuariosApi from "../api/usuario";
import { useLocalSearchParams } from "expo-router";

const useFeedbackViewModel = () => {
  const [comment, setComment] = useState("");
  const maxCharacters = 120;
  const { Usuario } = useLocalSearchParams();
  const [lastMsgSoporte, setLastMsgSoporte] = useState(null); // To track the last msgSoporte

  const getUserByName = async () => {
    try {
      const response = await UsuariosApi.findAll();
      if (response?.status === 200) {
        const user = response.data.find((user) => user.nombre === Usuario);
        if (!user)
          throw new Error("Usuario no encontrado con el nombre especificado");
        return user;
      } else {
        console.error("Error al obtener usuarios:", response?.data);
        return null;
      }
    } catch (error) {
      console.error("Error al buscar usuario por nombre:", error);
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
      const user = await getUserByName();
      if (!user) {
        alert("No se encontró el usuario. Por favor, verifica los parámetros.");
        return false;
      }

      const response = await UsuariosApi.update({
        id: user.id,
        msgResponseSoporte: comment,
      });

      if (response?.status === 200) {
        alert("Respuesta enviada correctamente.");
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
      const user = await getUserByName();
      if (!user) return null;

      // Check if msgSoporte is new
      if (user.msgSoporte !== lastMsgSoporte) {
        setLastMsgSoporte(user.msgSoporte); // Update the last seen msgSoporte
        await clearMsgResponseSoporte(); // Clear msgResponseSoporte
      }

      return user.msgSoporte || "";
    } catch (error) {
      console.error("Error al obtener el msgSoporte:", error);
      return null;
    }
  };

  const fetchMsgResponseSoporte = async () => {
    try {
      const user = await getUserByName();
      if (!user) return null;

      return user.msgResponseSoporte || "";
    } catch (error) {
      console.error("Error al obtener el msgResponseSoporte:", error);
      return null;
    }
  };

  const clearMsgResponseSoporte = async () => {
    try {
      const user = await getUserByName();
      if (!user) return;

      const response = await UsuariosApi.update({
        id: user.id,
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
  }, [Usuario]);

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
