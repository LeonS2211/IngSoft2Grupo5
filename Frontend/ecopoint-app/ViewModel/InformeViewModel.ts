import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario";
import UsuariosAmigoApi from "../api/usuarioAmigo";
import UsuariosPuntoReciclajeApi from "../api/usuarioPuntoReciclaje";

const useInformeViewModel = () => {
  const [adminName, setAdminName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [amigos, setAmigos] = useState([]);
  const [puntosReciclaje, setPuntosReciclaje] = useState([]);

  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        const adminData = await AsyncStorage.getItem("adminToken");
        if (adminData) {
          const parsedData = JSON.parse(adminData);
          setAdminName(parsedData.nombre);
        }
      } catch (error) {
        console.error("Error al obtener los datos del administrador:", error);
      }
    };

    fetchAdminName();
  }, []);

  const handleUserSearch = async () => {
    setIsLoading(true);
    try {
      const response = await UsuariosApi.findAll();
      if (response && response.data) {
        const foundUser = response.data.find(
          (user) => user.email === userEmail
        );
        if (foundUser) {
          setUserDetails(foundUser);

          // Obtener amigos
          const amigosResponse = await UsuariosAmigoApi.findAll();
          if (amigosResponse && amigosResponse.data) {
            const userAmigos = amigosResponse.data.filter(
              (amigo) => amigo.idUsuario === foundUser.id
            );
            setAmigos(userAmigos);
          }

          // Obtener puntos de reciclaje
          const puntosResponse = await UsuariosPuntoReciclajeApi.findAll();
          if (puntosResponse && puntosResponse.data) {
            const userPuntos = puntosResponse.data.filter(
              (punto) => punto.idUsuario === foundUser.id
            );
            setPuntosReciclaje(userPuntos);
          }
        } else {
          alert("Usuario no encontrado");
        }
      } else {
        alert("No se pudo recuperar la lista de usuarios");
      }
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
      alert("No se pudo encontrar al usuario, intenta nuevamente");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return {
    adminName,
    isLoading,
    userEmail,
    userDetails,
    amigos,
    puntosReciclaje,
    setUserEmail,
    handleUserSearch,
    formatDate,
  };
};

export default useInformeViewModel;
