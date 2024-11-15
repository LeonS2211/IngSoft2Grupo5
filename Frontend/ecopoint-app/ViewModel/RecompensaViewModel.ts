import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuarioRecompensa from "../api/usuarioRecompensa";
import UsuarioObjetivo from "../api/usuarioObjetivo";
import RecompensaApi from "../api/recompensa";
import ObjetivoApi from "../api/objetivo";

const useRecompensasViewModel = () => {
  const [recompensas, setRecompensas] = useState([]);
  const [objetivos, setObjetivos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) throw new Error("Usuario no autenticado");
      return userId;
    } catch (error) {
      console.error("Error obteniendo el ID del usuario:", error);
      setError("No se pudo obtener el usuario actual.");
      return null;
    }
  };

  const fetchRecompensas = async (userId) => {
    try {
      const response = await UsuarioRecompensa.findAll();
      const userRewards = response?.data.filter(
        (recompensa) => recompensa.idUsuario === parseInt(userId, 10)
      );

      const detailedRecompensas = await Promise.all(
        userRewards.map(async (r) => {
          const recompensaDetails = await RecompensaApi.findOne(r.idRecompensa);
          return recompensaDetails?.data;
        })
      );

      setRecompensas(detailedRecompensas);
    } catch (error) {
      console.error("Error cargando recompensas:", error);
      setError("No se pudieron cargar las recompensas.");
    }
  };

  const fetchObjetivos = async (userId) => {
    try {
      const response = await UsuarioObjetivo.findAll();
      const userObjectives = response?.data.filter(
        (objetivo) => objetivo.idUsuario === parseInt(userId, 10)
      );

      const detailedObjetivos = await Promise.all(
        userObjectives.map(async (o) => {
          const objetivoDetails = await ObjetivoApi.findOne(o.idObjetivo);
          return { ...objetivoDetails?.data, progreso: o.progreso };
        })
      );

      setObjetivos(detailedObjetivos);
    } catch (error) {
      console.error("Error cargando objetivos:", error);
      setError("No se pudieron cargar los objetivos.");
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const userId = await getUserId();
      if (!userId) return;

      await Promise.all([fetchRecompensas(userId), fetchObjetivos(userId)]);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setError("Ocurrió un error al cargar los datos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return { recompensas, objetivos, isLoading, error };
};

export default useRecompensasViewModel;
