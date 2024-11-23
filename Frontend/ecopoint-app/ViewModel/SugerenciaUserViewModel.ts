import { useState, useEffect } from "react";
import { SugerenciaPuntoReciclaje } from "../Models/SugerenciarReciclaje";
import UsuariosPuntoReciclajeApi from "../api/usuarioPuntoReciclaje";

export const useSugerenciaViewModel = () => {
  const [sugerencias, setSugerencias] = useState<SugerenciaPuntoReciclaje[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cargarSugerencias = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const response = await UsuariosPuntoReciclajeApi.findAll();
      if (response?.data) {
        setSugerencias(response.data);
      } else {
        throw new Error("No se recibió una respuesta válida del servidor.");
      }
    } catch (error: any) {
      console.error("Error al cargar las sugerencias:", error);
      setErrorMessage(
        error.response?.data?.message || "Error al cargar las sugerencias."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const agregarSugerencia = async (
    idUsuario: number,
    latitud: number,
    longitud: number,
    descripcion: string
  ) => {
    try {
      const nuevaSugerencia = new SugerenciaPuntoReciclaje(
        latitud,
        longitud,
        descripcion,
        idUsuario
      );
      nuevaSugerencia.validarDatos();
      const response = await UsuariosPuntoReciclajeApi.create(nuevaSugerencia);

      if (response?.data) {
        setSugerencias((prev) => [...prev, response.data]);
      } else {
        throw new Error("No se pudo agregar la sugerencia.");
      }
    } catch (error: any) {
      console.error("Error al agregar la sugerencia:", error);
      setErrorMessage(
        error.response?.data?.message || "Error al agregar la sugerencia."
      );
    }
  };

  useEffect(() => {
    cargarSugerencias();
  }, []);

  return {
    sugerencias,
    isLoading,
    errorMessage,
    cargarSugerencias,
    agregarSugerencia,
  };
};
