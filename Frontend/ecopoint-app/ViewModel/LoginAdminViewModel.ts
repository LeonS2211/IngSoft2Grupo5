import { useState } from "react"; // Asegúrate de importar useState correctamente
import AsyncStorage from "@react-native-async-storage/async-storage";
import AdministradoresApi from "../api/administrador"; // Asegúrate de que el path sea correcto

const useLoginViewModel = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Expresión regular para validar el correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Función para manejar el envío del formulario
  const onSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (!emailRegex.test(email)) {
        setErrorMessage("Por favor, introduce un correo electrónico válido.");
        return false;
      }

      const response = await AdministradoresApi.findAll();

      if (response?.status === 200) {
        const admin = response.data.find(
          (admin) => admin.email === email && admin.contraseña === password
        );

        if (admin) {
          // Guardar el adminId en AsyncStorage
          await AsyncStorage.setItem("adminId", String(admin.id));
          return true; // Inicio de sesión exitoso
        } else {
          setErrorMessage("Correo o contraseña incorrectos");
          return false;
        }
      } else {
        setErrorMessage("Error al obtener la lista de usuarios");
        return false;
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al iniciar sesión. Intenta nuevamente.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    isLoading,
    errorMessage,
    setEmail,
    setPassword,
    onSubmit,
  };
};

export default useLoginViewModel;
