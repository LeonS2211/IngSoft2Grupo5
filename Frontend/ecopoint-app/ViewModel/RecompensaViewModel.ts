import { useState, useEffect } from "react";
import RecompensaApi from "../api/recompensa";
import ObjetivoApi from "../api/objetivo";
import UsuariosAmigoApi from "../api/usuarioAmigo";
import UsuariosPuntoReciclajeApi from "../api/usuarioPuntoReciclaje";
import UsuariosApi from "../api/usuario";
import UsuarioObjetivoApi from "../api/usuarioObjetivo";
import RecompensasUsuarioApi from "../api/usuarioRecompensa"; // Nueva API para registrar recompensas reclamadas
import AsyncStorage from "@react-native-async-storage/async-storage";

const useRecompensasViewModel = () => {
  const [recompensas, setRecompensas] = useState([]);
  const [objetivos, setObjetivos] = useState([]);
  const [numeroAmigos, setNumeroAmigos] = useState(0);
  const [puntosReciclajeVisitados, setPuntosReciclajeVisitados] = useState(0);
  const [puntosUsuario, setPuntosUsuario] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [objetivosReclamados, setObjetivosReclamados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          throw new Error("No se encontró el ID del usuario logueado.");
        }

        // Fetch recompensas y filtra las que ya fueron reclamadas
        const recompensaResponse = await RecompensaApi.findAll();
        const recompensasUsuarioResponse =
          await RecompensasUsuarioApi.findAll();
        const recompensasReclamadas = recompensasUsuarioResponse?.data
          .filter((registro) => registro.idUsuario === parseInt(userId, 10))
          .map((registro) => registro.idRecompensa);

        const recompensasDisponibles = recompensaResponse?.data.filter(
          (recompensa) => !recompensasReclamadas.includes(recompensa.id)
        );

        setRecompensas(recompensasDisponibles || []);

        // Fetch objetivos
        const objetivoResponse = await ObjetivoApi.findAll();
        setObjetivos(objetivoResponse?.data || []);

        // Fetch numero de amigos
        const amigosResponse = await UsuariosAmigoApi.findAll();
        const amigos = amigosResponse?.data || [];
        const userAmigosCount = amigos.filter(
          (amigo) => amigo.idUsuario === parseInt(userId, 10)
        ).length;
        setNumeroAmigos(userAmigosCount);

        // Fetch puntos de reciclaje visitados
        const puntosReciclajeResponse =
          await UsuariosPuntoReciclajeApi.findAll();
        const puntosReciclaje = puntosReciclajeResponse?.data || [];
        const userPuntosCount = puntosReciclaje.filter(
          (punto) => punto.idUsuario === parseInt(userId, 10)
        ).length;
        setPuntosReciclajeVisitados(userPuntosCount);

        // Fetch puntos del usuario desde la API
        const usuarioResponse = await UsuariosApi.findOne(userId);
        setPuntosUsuario(usuarioResponse?.data.puntosObjetivo || 0); // Actualiza los puntos
      } catch (err) {
        setError("Error al cargar datos");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    const fetchObjetivosReclamados = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        if (!userId) {
          throw new Error("No se encontró el ID del usuario logueado.");
        }

        const response = await UsuarioObjetivoApi.findAll();
        const objetivosDelUsuario = response?.data.filter(
          (registro) => registro.idUsuario === parseInt(userId, 10)
        );

        // Guarda los IDs de los objetivos ya reclamados
        setObjetivosReclamados(
          objetivosDelUsuario.map((item) => item.idObjetivo)
        );
      } catch (err) {
        console.error("Error al obtener objetivos reclamados:", err);
      }
    };

    fetchData();
    fetchObjetivosReclamados();
  }, []);

  const reclamarRecompensa = async (reward) => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      alert("No se pudo encontrar el ID del usuario.");
      return;
    }

    try {
      // Verifica si el usuario tiene suficientes puntos
      if (puntosUsuario >= reward.puntosReq) {
        // Actualiza los datos del usuario según el tipo de recompensa
        if (reward.nombre.includes("puntos")) {
          const usuarioResponse = await UsuariosApi.findOne(userId);
          const puntosActuales = usuarioResponse?.data.puntos || 0; // Obtiene los puntos actuales del usuario
          // Extrae el número de puntos del nombre
          const puntosGanados = parseInt(reward.nombre.split(" ")[0], 10);
          const nuevosPuntos = puntosActuales + puntosGanados;

          // Actualiza los puntos del usuario en la base de datos
          await UsuariosApi.update({
            id: userId,
            puntos: nuevosPuntos,
          });
        } else if (reward.nombre.includes("Avatar")) {
          // Extrae el rango del nombre (ejemplo: "Avatar bronce")
          const [, rango] = reward.nombre.split(" ");

          // Actualiza el rango del usuario en la base de datos
          await UsuariosApi.update({ id: userId, rango });
        }

        // Registra la recompensa reclamada en la base de datos
        await RecompensasUsuarioApi.create({
          idUsuario: parseInt(userId, 10),
          idRecompensa: reward.id,
        });

        // Marca la recompensa como reclamada localmente
        setRecompensas((prev) =>
          prev.map((r) => (r.id === reward.id ? { ...r, achieved: true } : r))
        );

        alert("¡Recompensa reclamada con éxito!");
      } else {
        alert("No tienes suficientes puntos para reclamar esta recompensa.");
      }
    } catch (err) {
      console.error("Error al reclamar la recompensa:", err);
      alert("Hubo un error al reclamar la recompensa.");
    }
  };
  const reclamarObjetivo = async (objetivoId, puntos) => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      alert("No se pudo encontrar el ID del usuario.");
      return;
    }

    try {
      // Actualiza los puntos del usuario
      const usuarioResponse = await UsuariosApi.findOne(userId);
      const nuevosPuntos = usuarioResponse?.data.puntosObjetivo + puntos;

      await UsuariosApi.update({ id: userId, puntosObjetivo: nuevosPuntos });

      // Crea un nuevo registro en usuarioObjetivo
      await UsuarioObjetivoApi.create({
        idUsuario: parseInt(userId, 10),
        idObjetivo: objetivoId,
      });

      // Marca el objetivo como reclamado localmente
      setObjetivosReclamados((prev) => [...prev, objetivoId]);
      setPuntosUsuario(nuevosPuntos);

      alert("¡Objetivo reclamado con éxito!");
    } catch (err) {
      console.error("Error al reclamar el objetivo:", err);
      alert("Hubo un error al reclamar el objetivo.");
    }
  };

  return {
    recompensas,
    objetivos,
    numeroAmigos,
    puntosReciclajeVisitados,
    puntosUsuario,
    reclamarRecompensa,
    isLoading,
    error,
    reclamarObjetivo,
    objetivosReclamados,
  };
};

export default useRecompensasViewModel;
