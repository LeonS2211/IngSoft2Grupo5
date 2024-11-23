import { useState, useEffect } from "react";
import UsuariosApi from "../api/usuario";

const SugerenciasAdminViewModel = () => {
  const [users, setUsers] = useState([]); // Lista de los 10 primeros usuarios con msgSoporte
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchTop10FirstUsers = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await UsuariosApi.findAll(); // Obtener todos los usuarios

      if (response?.status === 200) {
        const sortedUsers = response.data
          .filter(
            (user) =>
              user.msgSoporte &&
              user.msgSoporte.trim() !== "" &&
              user.msgResponseSoporte.trim() === ""
          ) // Filtrar usuarios con msgSoporte
          .sort((a, b) => new Date(a.fechaRegistro) - new Date(b.fechaRegistro)) // Ordenar por fecha de registro
          .slice(0, 10); // Tomar los primeros 10 usuarios

        setUsers(sortedUsers);
      } else {
        setErrorMessage("Error al obtener la lista de usuarios.");
      }
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      setErrorMessage("Ocurrió un error al intentar obtener los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTop10FirstUsers();
  }, []);

  return {
    users, // Lista de los 10 primeros usuarios
    isLoading, // Estado de carga
    errorMessage, // Mensaje de error
    fetchTop10FirstUsers, // Método para actualizar manualmente
  };
};

export default SugerenciasAdminViewModel;
