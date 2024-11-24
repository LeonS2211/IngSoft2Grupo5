import { useState, useEffect } from "react";
import UbicacionesApi from "../api/ubicacion";
import CodigosQRApi from "../api/codigoQR";
import PuntosReciclajeApi from "../api/puntoReciclaje";
import SugerenciaPuntoReciclajeApi from "../api/sugerenciaPuntoReciclaje"; // API para sugerencias
import { useLocalSearchParams } from "expo-router";

const usePuntoReciclajeViewModel = () => {
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>(""); // Autocompletar
  const [latitud, setLatitud] = useState<string>(""); // Autocompletar
  const [longitud, setLongitud] = useState<string>(""); // Autocompletar
  const [contenidoQR, setContenidoQR] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { idSugerencia } = useLocalSearchParams(); // Obtener idSugerencia desde params

  useEffect(() => {
    if (idSugerencia) {
      fetchSugerenciaData(); // Cargar datos de la sugerencia cuando el componente se monta
    }
  }, [idSugerencia]);

  const fetchSugerenciaData = async () => {
    setIsLoading(true);
    try {
      const response = await SugerenciaPuntoReciclajeApi.findOne(idSugerencia);
      if (response?.status === 200) {
        const sugerencia = response.data;
        setDescripcion(sugerencia.descripcion);
        setLatitud(sugerencia.ubicacionPropuestaLatitud.toString());
        setLongitud(sugerencia.ubicacionPropuestaLongitud.toString());
      } else {
        throw new Error("No se pudo obtener los datos de la sugerencia.");
      }
    } catch (error) {
      console.error("Error al cargar datos de la sugerencia:", error);
      setErrorMessage("Error al cargar los datos de la sugerencia.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSugerencia = async () => {
    try {
      await SugerenciaPuntoReciclajeApi.remove(idSugerencia);
    } catch (error) {
      console.error("Error al eliminar la sugerencia:", error);
    }
  };

  const validarCoordenadas = (): boolean => {
    const lat = parseFloat(latitud);
    const lng = parseFloat(longitud);

    if (isNaN(lat) || lat < -90 || lat > 90) {
      setErrorMessage("La latitud debe estar entre -90 y 90.");
      return false;
    }

    if (isNaN(lng) || lng < -180 || lng > 180) {
      setErrorMessage("La longitud debe estar entre -180 y 180.");
      return false;
    }

    setErrorMessage(null); // No hay errores
    return true;
  };

  const validarCampos = async (): Promise<boolean> => {
    setErrorMessage(null); // Reinicia el mensaje de error
    try {
      const puntosResponse = await PuntosReciclajeApi.findAll();
      const puntos = puntosResponse?.data || [];
      const nombreDuplicado = puntos.some(
        (punto: any) => punto.nombre.toLowerCase() === nombre.toLowerCase(),
      );

      if (nombreDuplicado) {
        setErrorMessage("El nombre del punto de reciclaje ya existe.");
        return false;
      }

      const qrResponse = await CodigosQRApi.findAll();
      const codigosQR = qrResponse?.data || [];
      const qrDuplicado = codigosQR.some(
        (qr: any) => qr.contenido === contenidoQR,
      );

      if (qrDuplicado) {
        setErrorMessage("El contenido del código QR ya existe.");
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error al validar los campos:", error);
      setErrorMessage("Error al validar los datos. Intente nuevamente.");
      return false;
    }
  };

  const createPuntoReciclaje = async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      if (!validarCoordenadas()) {
        return false;
      }

      const validacionExitosa = await validarCampos();
      if (!validacionExitosa) {
        return false;
      }

      const ubicacionResponse = await UbicacionesApi.create({
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
      });

      if (ubicacionResponse?.status !== 200) {
        throw new Error("Error al crear la ubicación.");
      }

      const ubicacionId = ubicacionResponse.data.id;

      const qrResponse = await CodigosQRApi.create({
        contenido: contenidoQR,
      });

      if (qrResponse?.status !== 200) {
        throw new Error("Error al crear el código QR.");
      }

      const qrId = qrResponse.data.id;

      const puntoResponse = await PuntosReciclajeApi.create({
        nombre,
        descripcion,
        idUbicacion: ubicacionId,
        idCodigoQR: qrId,
      });

      if (puntoResponse?.status === 200) {
        return true;
      } else {
        throw new Error("Error al crear el punto de reciclaje.");
      }
    } catch (error) {
      console.error("Error al crear el punto de reciclaje:", error);
      setErrorMessage("Error inesperado al crear el punto de reciclaje.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    nombre,
    descripcion,
    latitud,
    longitud,
    contenidoQR,
    isLoading,
    errorMessage,
    setNombre,
    setDescripcion,
    setLatitud,
    setLongitud,
    setContenidoQR,
    createPuntoReciclaje,
    deleteSugerencia,
  };
};

export default usePuntoReciclajeViewModel;
