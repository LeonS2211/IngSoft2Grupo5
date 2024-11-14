import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  // Guardar el comentario en AsyncStorage
  const saveCommentToStorage = async (text) => {
    try {
      await AsyncStorage.setItem(COMMENT_KEY, text);
    } catch (error) {
      console.error("Error al guardar el comentario:", error);
    }
  };

  // Limpiar el comentario almacenado (cuando se envía o se cierra sesión)
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

  // Manejar el envío del comentario
  const handleSendFeedback = () => {
    if (comment.trim() === "") {
      alert("Por favor, escribe un comentario.");
      return false;
    } else {
      alert("Gracias por tu comentario.");
      clearStoredComment(); // Limpiar el comentario después de enviarlo
      return true;
    }
  };

  useEffect(() => {
    loadStoredComment(); // Cargar el comentario almacenado al montar el componente
  }, []);

  return {
    comment,
    maxCharacters,
    handleCommentChange,
    handleSendFeedback,
    clearStoredComment,
  };
};

export default useFeedbackViewModel;
