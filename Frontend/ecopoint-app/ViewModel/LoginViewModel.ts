import { useState } from 'react';
import { Usuario } from '../Models/usuarioModel';

// Crear una cuenta predefinida de prueba para Juan
Usuario.crearCuenta(
  'Juan',                      // Nombre
  'Perez',                     // Apellido
  'juan.perez@gmail.com',       // Correo
  '123456',                    // Contraseña
  987654321,                   // Número de teléfono
  12345678,                    // DNI
  100,                         // Puntaje inicial
  []                           // Lista vacía de objetivos
);

const useLoginViewModel = () => {
  const [email, setEmail] = useState<string>('');        // Estado para el correo
  const [password, setPassword] = useState<string>('');  // Estado para la contraseña
  const [isLoading, setIsLoading] = useState<boolean>(false);  // Estado para saber si está cargando
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Mensaje de error

  // Función para manejar el envío del formulario
  const onSubmit = async () => {
    setIsLoading(true); // Iniciar el estado de carga

    try {
      const usuario = Usuario.instance;

      if (usuario) {
        const inicioSesionResponse = usuario.inicioSesion(email, password);

        // Validar si las credenciales son correctas
        if (inicioSesionResponse === `Inicio de sesión exitoso para: ${usuario.getNombre()}`) {
          return true; // Inicio de sesión exitoso
        } else {
          setErrorMessage('Verifique sus credenciales');
          return false;
        }
      } else {
        setErrorMessage('Usuario no registrado.');
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
