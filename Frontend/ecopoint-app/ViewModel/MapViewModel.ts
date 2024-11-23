import { useState, useEffect } from "react";
import PuntosReciclajeApi from "../api/puntoReciclaje"; // Importamos la API
import { PuntoReciclaje } from "../Models/puntoReciclajeModel"; // Importamos el modelo de PuntoReciclaje
import { Ubicacion } from "../Models/ubicacionModel"; // Importamos el modelo de Ubicacion
import { CodigoQR } from "../Models/codigoQRModel"; // Importamos el modelo de CodigoQR

const useMapViewModel = () => {
  const [puntos, setPuntos] = useState<PuntoReciclaje[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Método para cargar los puntos de reciclaje desde la API
  const cargarPuntosDeReciclaje = async () => {
    try {
      const response = await PuntosReciclajeApi.findAll(); // Usamos la API para obtener todos los puntos de reciclaje

      const puntosReciclaje: PuntoReciclaje[] = response?.data.map(
        (punto: any) => {
          const ubicacion = new Ubicacion(
            punto.ubicacione.latitud,
            punto.ubicacione.longitud,
          );

          const codigoQR = new CodigoQR(punto.codigosQR.contenido);

          // Creas instancias del modelo PuntoReciclaje
          return new PuntoReciclaje(
            ubicacion,
            codigoQR,
            punto.nombre,
            punto.descripcion,
          );
        },
      );

      setPuntos(puntosReciclaje); // Guardar los puntos en el estado
      setIsLoading(false);
    } catch (error: any) {
      setErrorMessage("Error al obtener los puntos de reciclaje.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    cargarPuntosDeReciclaje(); // Cargar los puntos al iniciar el componente
  }, []);

  return {
    puntos, // Lista de puntos de reciclaje
    isLoading, // Estado de carga
    errorMessage, // Mensaje de error si ocurre
  };
};

export default useMapViewModel;
