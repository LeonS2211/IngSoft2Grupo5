import { useState } from "react";
import UbicacionesApi from "../api/ubicacion";
import CodigosQRApi from "../api/codigoQR";
import PuntosReciclajeApi from "../api/puntoReciclaje";

const usePuntoReciclajeViewModel = () => {
  const [nombre, setNombre] = useState<string>("");
  const [descripcion, setDescripcion] = useState<string>("");
  const [latitud, setLatitud] = useState<string>("");
  const [longitud, setLongitud] = useState<string>("");
  const [contenidoQR, setContenidoQR] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetFields = () => {
    setNombre("");
    setDescripcion("");
    setLatitud("");
    setLongitud("");
    setContenidoQR("");
    setErrorMessage(null);
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

  // Función para validar campos antes de crear
  const validarCampos = async (): Promise<boolean> => {
    setErrorMessage(null); // Reinicia el mensaje de error

    try {
      // Validar nombre
      const puntosResponse = await PuntosReciclajeApi.findAll();
      const puntos = puntosResponse?.data || [];
      const nombreDuplicado = puntos.some(
        (punto: any) => punto.nombre.toLowerCase() === nombre.toLowerCase(),
      );

      if (nombreDuplicado) {
        setErrorMessage("El nombre del punto de reciclaje ya existe.");
        return false;
      }

      // Validar código QR
      const qrResponse = await CodigosQRApi.findAll();
      const codigosQR = qrResponse?.data || [];
      const qrDuplicado = codigosQR.some(
        (qr: any) => qr.contenido === contenidoQR,
      );

      if (qrDuplicado) {
        setErrorMessage("El contenido del código QR ya existe.");
        return false;
      }

      // Validar ubicación
      const ubicacionesResponse = await UbicacionesApi.findAll();
      const ubicaciones = ubicacionesResponse?.data || [];
      const ubicacionDuplicada = ubicaciones.some(
        (ubicacion: any) =>
          parseFloat(ubicacion.latitud) === parseFloat(latitud) &&
          parseFloat(ubicacion.longitud) === parseFloat(longitud),
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

      // Crear ubicación
      const ubicacionResponse = await UbicacionesApi.create({
        latitud: parseFloat(latitud),
        longitud: parseFloat(longitud),
      });

      if (ubicacionResponse?.status !== 200) {
        throw new Error("Error al crear la ubicación.");
      }

      const ubicacionId = ubicacionResponse.data.id;

      // Crear código QR
      const qrResponse = await CodigosQRApi.create({
        contenido: contenidoQR,
      });

      if (qrResponse?.status !== 200) {
        throw new Error("Error al crear el código QR.");
      }

      const qrId = qrResponse.data.id;

      // Crear punto de reciclaje
      const puntoResponse = await PuntosReciclajeApi.create({
        nombre,
        descripcion,
        idUbicacion: ubicacionId,
        idCodigoQR: qrId,
      });

      if (puntoResponse?.status === 200) {
        resetFields();
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
    validarCoordenadas,
  };
};

export default usePuntoReciclajeViewModel;
