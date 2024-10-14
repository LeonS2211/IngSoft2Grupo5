import { useState } from "react";
import CodigosQRApi from "../api/codigoQR";
import * as Location from "expo-location";
import UbicacionesApi from "../api/ubicacion";

type QRCode = {
  contenido: string;
  puntoReciclaje: {
    idUbicacion: number;
  } | null;
};

const useGetCodesModel = () => {
  const [codigos, setCodigos] = useState<QRCode[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Obtener la ubicación del usuario
  const fetchUserLocation = async (): Promise<void> => {
    let location = await Location.getCurrentPositionAsync({});
    setUserLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  // Fórmula de Haversine para calcular la distancia entre dos puntos
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distancia en km
    return distance;
  };

  // Obtener los códigos QR
  const fetchCodes = async (): Promise<void> => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await CodigosQRApi.findAll();
      if (response?.status === 200) {
        setCodigos(response.data); // Almacenar los códigos obtenidos de la API
      } else {
        setErrorMessage("Error al obtener los códigos QR.");
      }
    } catch (error: any) {
      setErrorMessage("Error en la solicitud de los códigos QR.");
      console.error("Error al obtener los códigos QR:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Validar el código QR y la ubicación del usuario
  const validateQRCode = async (data: string): Promise<boolean> => {
    if (!userLocation) {
      setErrorMessage("No se ha podido obtener la ubicación del usuario.");
      return false;
    }

    // Buscar el código escaneado en la lista de códigos
    const codigoEncontrado = codigos.find(
      (codigo) => codigo.contenido === data,
    );

    if (!codigoEncontrado || !codigoEncontrado.puntoReciclaje) {
      return false; // Código no encontrado o sin punto de reciclaje asociado
    }

    try {
      // Obtener la ubicación del punto de reciclaje usando `idUbicacion`
      const ubicacionResponse = await UbicacionesApi.findOne(
        codigoEncontrado.puntoReciclaje.idUbicacion,
      );

      if (ubicacionResponse?.status !== 200 || !ubicacionResponse.data) {
        setErrorMessage(
          "Error al obtener la ubicación del punto de reciclaje.",
        );
        return false;
      }

      const ubicacion = ubicacionResponse.data;

      // Calcular la distancia entre el usuario y el punto de reciclaje
      const distancia = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        ubicacion.latitud,
        ubicacion.longitud,
      );

      // Verificar si la distancia es menor o igual a 2 metros
      return distancia <= 0.01;
    } catch (error: any) {
      console.error(
        "Error al obtener la ubicación del punto de reciclaje:",
        error,
      );
      setErrorMessage("Error en la solicitud al obtener la ubicación.");
      return false;
    }
  };

  return {
    codigos,
    isLoading,
    errorMessage,
    fetchCodes,
    validateQRCode,
    fetchUserLocation,
  };
};

export default useGetCodesModel;
