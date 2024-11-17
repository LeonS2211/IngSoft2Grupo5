import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as Progress from "react-native-progress"; // Use for circular progress
import { FontAwesome5 } from "@expo/vector-icons"; // For navigation icons
import BotBar from "../components/BotBar"; // Replace with your bottom bar component
import useRecompensasViewModel from "../ViewModel/RecompensaViewModel";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width; // Obtén el ancho de la pantalla

const Recompensas: React.FC = () => {
  const imagenes = {
    plata: require("../assets/plata.png"),
    oro: require("../assets/oro.png"),
    bronce: require("../assets/bronce.png"),
  };
  const {
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
  } = useRecompensasViewModel();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    Alert.alert("Error", error);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recompensas</Text>
      </View>

      {/* Horizontal Scrollable Rewards */}
      <View style={styles.userPointsContainer}>
        <Text style={styles.userPointsText}>
          Puntos Totales: {puntosUsuario} PO
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[
          styles.rewardsContainer,
          recompensas.length === 0 && {
            justifyContent: "center",
            alignItems: "center",
          }, // Ajusta el centro si no hay recompensas
        ]}
      >
        {recompensas.length > 0 ? (
          recompensas
            .sort((a, b) => a.puntosReq - b.puntosReq) // Ordena las recompensas por puntosReq
            .map((reward, index) => (
              <View key={reward.id} style={styles.rewardWrapper}>
                <TouchableOpacity
                  disabled={reward.achieved || puntosUsuario < reward.puntosReq} // Deshabilita si ya fue reclamado o no tiene suficientes puntos
                  onPress={() => reclamarRecompensa(reward)}
                  style={[
                    styles.rewardCard,
                    puntosUsuario >= reward.puntosReq && !reward.achieved
                      ? styles.cardCumplido // Estilo amarillo si puede reclamar
                      : null,
                    reward.achieved ? styles.cardReclamado : null, // Estilo semi-visible si ya fue reclamado
                  ]}
                >
                  <View style={styles.rewardIconContainer}>
                    {reward.nombre.includes("puntos") && (
                      <Image
                        source={require("../assets/trash.png")} // Reemplaza con tu asset
                        style={styles.rewardIcon}
                      />
                    )}
                    {reward.nombre.includes("Avatar") &&
                      (() => {
                        const [, rank] = reward.nombre.split(" "); // Divide el texto para obtener el rango
                        return (
                          <Image
                            source={imagenes[rank]} // Usa el valor del rango para seleccionar la imagen
                            style={styles.rewardIcon}
                          />
                        );
                      })()}
                  </View>
                  <Text style={styles.rewardName}>{reward.nombre}</Text>
                  <Text style={styles.rewardText}>
                    {reward.puntosReq
                      ? `${reward.puntosReq} PO`
                      : "Próxima recompensa"}
                  </Text>
                </TouchableOpacity>

                {/* Añadir la flecha excepto en el último elemento */}
                {index < recompensas.length - 1 && (
                  <FontAwesome5
                    name="arrow-right"
                    size={16}
                    color="#888"
                    style={styles.arrow}
                  />
                )}
              </View>
            ))
        ) : (
          <View style={styles.noRewardsContainer}>
            <Text style={styles.noRewardsText}>
              🎉 Todas las recompensas han sido reclamadas 🎉
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Objectives */}
      <Text style={styles.sectionTitle}>Objetivos</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.objectivesContainer}
      >
        {objetivos.map((objective) => {
          const progreso = objective.descripcion.includes("amigos")
            ? numeroAmigos / objective.numObjetivo
            : puntosReciclajeVisitados / objective.numObjetivo;

          const cumplido = progreso >= 1; // Objetivo cumplido si el progreso es 100%
          const reclamado = objetivosReclamados.includes(objective.id); // Verificar si ya fue reclamado

          return (
            <TouchableOpacity
              key={objective.id}
              disabled={reclamado || !cumplido} // Deshabilitar si ya fue reclamado o no cumplido
              onPress={() =>
                reclamarObjetivo(objective.id, objective.puntosObtenibles)
              }
              style={[
                styles.objectiveCard,
                cumplido && !reclamado ? styles.cardCumplido : null, // Estilo amarillo
                reclamado ? styles.cardReclamado : null, // Estilo semi visible
              ]}
            >
              <Text style={styles.objectiveTitle}>{objective.descripcion}</Text>

              {/* Progress Ring */}
              <View style={{ alignItems: "center" }}>
                <Progress.Circle
                  size={80}
                  progress={Math.min(progreso, 1)} // Limitar al 100%
                  color={"#4CAF50"}
                  thickness={8}
                  showsText={true}
                  formatText={() =>
                    `${Math.round(Math.min(progreso * 100, 100))}%`
                  }
                  textStyle={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#333",
                  }}
                />
              </View>
              <Text style={styles.rewardText}>
                Recompensa al completar: {objective.puntosObtenibles} PO
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BotBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F8F0",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rewardWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    backgroundColor: "#DFFFD6",
    padding: 5,
    alignItems: "center",
  },
  userPointsContainer: {
    backgroundColor: "#FAD02E",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  userPointsText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  rewardsContainer: {
    flexDirection: "row",
    paddingVertical: 30,
    paddingHorizontal: 5,
  },
  arrow: {
    marginHorizontal: 5,
  },
  rewardCard: {
    width: 100,
    height: 120,
    marginHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardCumplido: {
    backgroundColor: "#FAD02E", // Amarillo si puede reclamar
  },
  cardReclamado: {
    opacity: 0.5, // Semi-visible si ya fue reclamado
  },
  rewardIconContainer: {
    marginBottom: 5,
  },
  rewardIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  objectivesContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  sectionTitle: {
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#DFFFD6",
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  objectiveCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    opacity: 1, // Visibilidad completa por defecto
  },
  noRewardsContainer: {
    width: screenWidth - 20,
    justifyContent: "center", // Centra verticalmente el texto
    alignItems: "center", // Centra horizontalmente el texto
    backgroundColor: "#FFF8E1",
    borderRadius: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    minHeight: 100, // Asegura que el contenedor sea lo suficientemente alto
  },
  noRewardsText: {
    fontSize: 18, // Tamaño de fuente más grande
    fontWeight: "bold",
    color: "#FF5722", // Color vibrante
    textAlign: "center", // Asegura que el texto esté centrado
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    lineHeight: 22, // Agrega espacio entre líneas para mejorar la legibilidad
  },
  objectiveTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  rewardText: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
  },
});

export default Recompensas;
