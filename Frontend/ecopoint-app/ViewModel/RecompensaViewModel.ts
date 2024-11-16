import { useState, useEffect } from "react";
import RecompensaApi from "../api/recompensa";
import ObjetivoApi from "../api/objetivo";
import UsuariosAmigoApi from "../api/usuarioAmigo";
import UsuariosPuntoReciclajeApi from "../api/usuarioPuntoReciclaje";
import UsuariosApi from "../api/usuario";
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
        const recompensasReclamadas = recompensasUsuarioResponse.data
          .filter((registro) => registro.idUsuario === parseInt(userId, 10))
          .map((registro) => registro.idRecompensa);

        const recompensasDisponibles = recompensaResponse.data.filter(
          (recompensa) => !recompensasReclamadas.includes(recompensa.id)
        );

        setRecompensas(recompensasDisponibles || []);

        // Fetch objetivos
        const objetivoResponse = await ObjetivoApi.findAll();
        setObjetivos(objetivoResponse.data || []);

        // Fetch numero de amigos
        const amigosResponse = await UsuariosAmigoApi.findAll();
        const amigos = amigosResponse.data || [];
        const userAmigosCount = amigos.filter(
          (amigo) => amigo.idUsuario === parseInt(userId, 10)
        ).length;
        setNumeroAmigos(userAmigosCount);

        // Fetch puntos de reciclaje visitados
        const puntosReciclajeResponse =
          await UsuariosPuntoReciclajeApi.findAll();
        const puntosReciclaje = puntosReciclajeResponse.data || [];
        const userPuntosCount = puntosReciclaje.filter(
          (punto) => punto.idUsuario === parseInt(userId, 10)
        ).length;
        setPuntosReciclajeVisitados(userPuntosCount);

        // Fetch puntos del usuario desde la API
        const usuarioResponse = await UsuariosApi.findOne(userId);
        setPuntosUsuario(usuarioResponse.data.puntos || 0); // Actualiza los puntos
      } catch (err) {
        setError("Error al cargar datos");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const reclamarRecompensa = async (rewardId, puntosReq) => {
    if (puntosUsuario >= puntosReq) {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        alert("No se pudo encontrar el ID del usuario.");
        return;
      }

      try {
        // Resta los puntos del usuario
        const nuevosPuntos = puntosUsuario - puntosReq;
        setPuntosUsuario(nuevosPuntos);

        // Elimina la recompensa de la lista
        setRecompensas((prevRecompensas) =>
          prevRecompensas.filter((recompensa) => recompensa.id !== rewardId)
        );

        // Actualiza los puntos en la base de datos
        await UsuariosApi.update({
          id: parseInt(userId, 10),
          puntos: nuevosPuntos,
        });

        // Registra la recompensa reclamada
        await RecompensasUsuarioApi.create({
          idUsuario: parseInt(userId, 10),
          idRecompensa: rewardId,
        });

        alert("¡Recompensa reclamada con éxito!");
      } catch (err) {
        console.error("Error al reclamar la recompensa:", err);
        alert("Hubo un error al reclamar la recompensa.");
      }
    } else {
      alert("No tienes suficientes puntos para reclamar esta recompensa.");
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
  };
};

export default useRecompensasViewModel;
