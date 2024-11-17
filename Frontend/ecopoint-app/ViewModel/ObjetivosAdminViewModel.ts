import { useState } from "react";
import { Objetivo } from "../Models/objetivo";
import { Recompensa } from "../Models/recompensa";
import ObjetivoApi from "../api/objetivo";
import RecompensaApi from "../api/recompensa";

const useObjetivosAdminViewModel = () => {
  const [nombreObjetivo, setNombreObjetivo] = useState<string>("");
  const [descripcionObjetivo, setDescripcionObjetivo] = useState<string>("");
  const [puntajeObjetivo, setPuntajeObjetivo] = useState<string>("");
  const [nombreRecompensa, setNombreRecompensa] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Función para verificar si no hay otro objetivo con el mismo nombre
  const isObjetivoRegistered = async (
    descripcion: string
  ): Promise<boolean> => {
    try {
      const response = await ObjetivoApi.findAll();
      const objetivos = response?.data || [];

      // Verificar si la descripción ya está en la lista de objetivos
      return objetivos.some(
        (objetivo: any) => objetivo.descripcion === descripcion
      );
    } catch (error: any) {
      console.error("Error al verificar el objetivo:", error);
      return false;
    }
  };

  // Función para verificar si no hay otra recompensa con el mismo nombre
  const isRecompensaRegistered = async (nombre: string): Promise<boolean> => {
    try {
      const response = await RecompensaApi.findAll();
      const recompensas = response?.data || [];

      // Verificar si el nombre ya está en la lista de recompensas
      return recompensas.some(
        (recompensa: any) => recompensa.nombre === nombre
      );
    } catch (error: any) {
      console.error("Error al verificar la recompensa:", error);
      return false;
    }
  };

  const createObjective = async (
    descripcion: string,
    numObjetivo: number,
    recompensa: Recompensa
  ): Promise<boolean> => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      // Verificar si el objetivo ya está registrado
      const objetivoExists = await isObjetivoRegistered(descripcion);
      if (objetivoExists) {
        setErrorMessage("El objetivo ya está registrado.");
        return false;
      }

      // Verificar si la recompensa ya está registrada
      const recompensaExists = await isRecompensaRegistered(recompensa.nombre);
      if (recompensaExists) {
        setErrorMessage("La recompensa ya está registrada.");
        return false;
      }

      // Crear el objetivo en la API
      const objetivoData = {
        descripcion,
        numObjetivo,
      };
      const objetivoResponse = await ObjetivoApi.create(objetivoData);

      if (objetivoResponse) {
        // Crear la recompensa asociada en la API
        const recompensaResponse = await RecompensaApi.create(recompensa);

        if (recompensaResponse) {
          return true;
        } else {
          setErrorMessage("Error al crear la recompensa.");
          return false;
        }
      } else {
        setErrorMessage("Error al crear el objetivo.");
        return false;
      }
    } catch (error: any) {
      console.error("Error al crear el objetivo:", error);
      setErrorMessage("Error al crear el objetivo.");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    nombreObjetivo,
    setNombreObjetivo,
    descripcionObjetivo,
    setDescripcionObjetivo,
    puntajeObjetivo,
    setPuntajeObjetivo,
    nombreRecompensa,
    setNombreRecompensa,
    isLoading,
    errorMessage,
    createObjective,
    isRecompensaRegistered,
  };
};

export default useObjetivosAdminViewModel;
