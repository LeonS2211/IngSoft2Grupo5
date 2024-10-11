import { useState } from 'react';
import CitasApi from '../api/usuario'; // Asegúrate de que el path sea correcto

const useRegisterViewModel = () => {
  // Estado para capturar los datos del formulario
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [telefono, setTelefono] = useState<number | null>(null);
  const [dni, setDni] = useState<number | null>(null);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Función para manejar el envío del formulario
  const onSubmit = async () => {
    setIsLoading(true); // Iniciar el estado de carga
    setErrorMessage(null); // Limpiar el mensaje de error

    // Construir el objeto del usuario con los datos del formulario
    const newUser = {
      nombre,
      apellido,
      telefono,
      dni,
      email,
      password,
    };

    try {
      // Llamada a la API usando CitasApi.create
      const response = await CitasApi.create(newUser);

      if (response.status === 200 || response.status === 201) {
        alert('Registro exitoso');
      } else {
        // Maneja errores de validación
        if (response.data.errors) {
          const errorMessages = response.data.errors.map((error) => error.message);
          setErrorMessage(errorMessages.join(', '));
        } else {
          setErrorMessage(response.data.message || 'Hubo un error al registrar el usuario.');
        }
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      setErrorMessage('Error de conexión. Intenta nuevamente.');
    } finally {
      setIsLoading(false); // Finalizar el estado de carga
    }
  };

  return {
    nombre,
    apellido,
    telefono,
    dni,
    email,
    password,
    isLoading,
    errorMessage,
    setNombre,
    setApellido,
    setTelefono,
    setDni,
    setEmail,
    setPassword,
    onSubmit,
  };
};

export default useRegisterViewModel;