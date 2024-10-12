import { Usuario } from './../Models/usuarioModel'; // Asegúrate de que el path sea correcto
import { useState } from 'react';
import UsuariosApi from '../api/usuario'; // Asegúrate de que el path sea correcto

const useRegisterViewModel = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Función para manejar el envío del formulario
  const onSubmit = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Crear una instancia de Usuario con el email y password
      const usuario = Usuario.crearCuenta(
        "", // nombre vacío ya que no lo usaremos aquí
        "", // apellido vacío ya que no lo usaremos aquí
        email,
        password,
        0, // numTelefono como 0 o el valor que corresponda
        0 // puntajeUsuario inicial
      );

      // Obtener los puntos y el código de amistad desde la instancia del usuario
      const puntos = usuario.getPuntajeUsuario();
      const codigoAmistad = usuario.getCodigoAmistad(); // Ahora obtiene el código de amistad como string

      // Construir el objeto del usuario con los datos del formulario
      const newUser = {
        email,
        contraseña : password,
        puntos, // obtenido de la instancia del usuario
        codigoAmistad, // generado por la clase Usuario
      };

      // Llamada a la API usando UsuariosApi.create
      const response = await UsuariosApi.create(newUser);

      if (response?.status === 200 || response?.status === 201) {
        alert('Registro exitoso');
      } else {
        setErrorMessage(response?.data?.message || 'Hubo un error al registrar el usuario.');
      }
    } catch (error: any) {
      console.error('Error al registrar el usuario:', error);

      // Si el servidor devuelve un error específico
      if (error.response) {
        console.error('Error de respuesta del servidor:', error.response.data);
        setErrorMessage(error.response.data?.message || 'Error en el servidor.');
      } else if (error.request) {
        console.error('No se recibió respuesta del servidor:', error.request);
        setErrorMessage('No se recibió respuesta del servidor.');
      } else {
        console.error('Error al configurar la solicitud:', error.message);
        setErrorMessage('Error en la configuración de la solicitud.');
      }
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

export default useRegisterViewModel;
