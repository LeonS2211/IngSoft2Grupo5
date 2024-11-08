import UsuariosApi from "../api/usuario";
import { Usuario } from "../Models/usuarioModel";
import { useState } from "react";

const useRegisterViewModel = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Función para verificar si el correo ya está registrado
  const isEmailRegistered = async (email: string): Promise<boolean> => {
    try {
      const response = await UsuariosApi.findAll();
      const users = response?.data;

      // Verificar si el correo ya está en la lista de usuarios
      return users.some((user: any) => user.email === email);
    } catch (error: any) {
      console.error("Error al obtener usuarios:", error);
      return false;
    }
  };

  const onSubmit = async (): Promise<boolean> => {
    if (!emailRegex.test(email)) {
      setErrorMessage("Por favor, introduce un correo electrónico válido.");
      return false; // Devuelve false si no es un email válido
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Verificar si el correo ya está registrado
      const emailExists = await isEmailRegistered(email);

      if (emailExists) {
        setErrorMessage("Este correo ya está registrado.");
        setIsLoading(false);
        return false; // Devuelve false si el correo ya existe
      }

      // Si el correo no está registrado, crear la cuenta
      const usuario = Usuario.crearCuenta("", "", email, password, 0, 0);

      const puntos = usuario.getPuntajeUsuario();
      const codigoAmistad = usuario.getCodigoAmistad();

      const newUser = {
        email,
        contraseña: password,
        puntos,
        codigoAmistad,
        nombre: email,
      };

      const response = await UsuariosApi.create(newUser);

      if (response?.status === 200 || response?.status === 201) {
        alert("Registro exitoso");
        return true; // Devuelve true si el registro fue exitoso
      } else {
        setErrorMessage(
          response?.data?.message || "Hubo un error al registrar el usuario."
        );
        return false;
      }
    } catch (error: any) {
      console.error("Error al registrar el usuario:", error);
      setErrorMessage("Error en la solicitud.");
      return false; // Devuelve false si hubo un error
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

export default useRegisterViewModel;
