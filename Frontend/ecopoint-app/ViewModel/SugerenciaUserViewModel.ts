import { useState } from "react";
import UbicacionesApi from "../api/ubicacion";
import SugerenciaPuntoReciclajeApi from "../api/sugerenciaPuntoReciclaje";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FA5Style } from "@expo/vector-icons/build/FontAwesome5";

const useSugerenciaViewModel = () => {
  const [descripcion, setDescripcion] = useState<string>("");
  const [latitud, setLatitud] = useState<string>("");
  const [longitud, setLongitud] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetFields = () => {
    setDescripcion("");
    setLatitud("");
    setLongitud("");
    setErrorMessage(null);
  };
  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        throw new Error(
          "No se pudo encontrar el ID del usuario en AsyncStorage."
        );
      }
      return userId;
    } catch (error) {
      console.error("Error al obtener el userId del almacenamiento:", error);
      return null;
    }
  };
  // Función para validar campos antes de crear
  const validarCampos = async (): Promise<boolean> => {
    setErrorMessage(null); // Reinicia el mensaje de error

    try {
      // Validar ubicación
      const ubicacionesResponse = await UbicacionesApi.findAll();
      const ubicaciones = ubicacionesResponse?.data || [];
      const ubicacionDuplicada = ubicaciones.some(
        (ubicacion: any) =>
          parseFloat(ubicacion.latitud) === parseFloat(latitud) &&
          parseFloat(ubicacion.longitud) === parseFloat(longitud)
      );

      if (ubicacionDuplicada) {
        setErrorMessage("La ubicación ya existe.");
        return false;
      }

      // Si no hay errores, retorna true
      return true;
    } catch (error) {
      console.error("Error al validar los campos:", error);
      setErrorMessage("Error al validar los datos. Intente nuevamente.");
      return false;
    }
  };

  const createSugerencia = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      const userId = await getUserId();

      if (!userId) {
        console.error("No se pudo obtener el ID del usuario.");
        return false;
      }
      const validacionExitosa = await validarCampos();
      if (!validacionExitosa) {
        return false;
      }
      console.log("ubicacionPropuestaLatitud :", parseFloat(latitud));
      console.log("ubicacionPropuestaLongitud ", parseFloat(longitud));
      console.log("descripcion:", descripcion);
      console.log("idUsuario: ", parseInt(userId, 10));

      // Crear ubicación
      const sugerenciaResponse = await SugerenciaPuntoReciclajeApi.create({
        ubicacionPropuestaLatitud: parseFloat(latitud),
        ubicacionPropuestaLongitud: parseFloat(longitud),
        descripcion: descripcion,
        idUsuario: parseInt(userId, 10),
      });

      if (sugerenciaResponse?.status === 200) {
        resetFields();
        return true;
      } else {
        throw new Error("Error al enviar la sugerencia de punto de reciclaje.");
      }
    } catch (error) {
      console.error("Error al enviar sugerencia de punto de reciclaje:", error);
      setErrorMessage(
        "Error inesperado al enviar sugerencia de punto de reciclaje."
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    descripcion,
    latitud,
    longitud,
    isLoading,
    errorMessage,
    setDescripcion,
    setLatitud,
    setLongitud,
    createSugerencia,
  };
};

export default useSugerenciaViewModel;
