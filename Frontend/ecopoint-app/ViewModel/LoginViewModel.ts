import { useState } from 'react';
import UsuariosApi from '../api/usuario'; // Asegúrate de que el path sea correcto

const useLoginViewModel = () => {
  const [email, setEmail] = useState<string>('');        // Estado para el correo
  const [password, setPassword] = useState<string>('');  // Estado para la contraseña
  const [isLoading, setIsLoading] = useState<boolean>(false);  // Estado para saber si está cargando
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Mensaje de error

  // Expresión regular para validar el correo
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Función para manejar el envío del formulario
  const onSubmit = async () => {
    setIsLoading(true); // Iniciar el estado de carga
    setErrorMessage(null); // Limpiar mensajes de error previos

    try {
      // Validar si el correo tiene un formato correcto
      if (!emailRegex.test(email)) {
        setErrorMessage('Por favor, introduce un correo electrónico válido.');
        return false;
      }

      // Llamada a la API para obtener todos los usuarios y filtrar por email y password
      const response = await UsuariosApi.findAll();

      if (response?.status === 200) {
        // Buscar el usuario en la lista
        const usuario = response.data.find(
          (user) => user.email === email && user.contraseña === password
        );

        if (usuario) {
          // Autenticación exitosa
          return true;
        } else {
          // Credenciales incorrectas
          setErrorMessage('Correo o contraseña incorrectos');
          return false;
        }
      } else {
        setErrorMessage('Error al obtener la lista de usuarios');
        return false;
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al iniciar sesión. Intenta nuevamente.');
      return false;
    } finally {
      setIsLoading(false); // Finalizar el estado de carga
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
