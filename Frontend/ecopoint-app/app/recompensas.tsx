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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.rewardsContainer}
      >
        {recompensas
          .sort((a, b) => a.puntosReq - b.puntosReq) // Ordena las recompensas por puntosReq
          .map((reward, index) => (
            <View key={reward.id} style={styles.rewardWrapper}>
              <TouchableOpacity style={styles.rewardCard}>
                <View style={styles.rewardIconContainer}>
                  {/* Verifica que reward.nombre exista y contiene "puntos" */}
                  {reward.nombre && reward.nombre.includes("puntos") && (
                    <Image
                      source={require("../assets/trash.png")} // Replace with your asset
                      style={styles.rewardIcon}
                    />
                  )}

                  {/* Verifica que reward.nombre contiene "Avatar" y procesa el rango */}
                  {reward.nombre &&
                    reward.nombre.includes("Avatar") &&
                    (() => {
                      const [, rank] = reward.nombre.split(" "); // Divide el texto para obtener el "rank"
                      return (
                        <Image
                          source={imagenes[rank]} // Usa el valor de "rank" para seleccionar la imagen
                          style={styles.rewardIcon}
                        />
                      );
                    })()}
                </View>
                {/* Renderiza el nombre de la recompensa */}
                <Text style={styles.rewardName}>{reward.nombre}</Text>
                {/* Renderiza el nombre de la recompensa */}
                <Text style={styles.rewardText}>
                  {reward.puntosReq
                    ? `${reward.puntosReq} PO`
                    : "Próxima recompensa"}
                </Text>

                {/* Muestra el ícono de logrado si corresponde */}
                {reward.achieved && (
                  <FontAwesome5 name="check-circle" size={16} color="green" />
                )}
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
          ))}
      </ScrollView>

      {/* Objectives */}
      <Text style={styles.sectionTitle}>Objetivos</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.objectivesContainer}
      >
        {objetivos.map((objective) => (
          <View key={objective.id} style={styles.objectiveCard}>
            <Text style={styles.objectiveTitle}>{objective.descripcion}</Text>

            {/* Progress Ring for Objectives */}
            <View style={{ alignItems: "center" }}>
              {objective.descripcion.includes("amigos") && (
                <Progress.Circle
                  size={80}
                  progress={numeroAmigos / objective.numObjetivo} // Assuming "Haz dos amigos" objective
                  color={"#4CAF50"}
                  thickness={8}
                  showsText={true}
                  formatText={() =>
                    `${Math.round(Math.min((numeroAmigos / 2) * 100, 100))}%`
                  }
                  textStyle={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#333",
                  }}
                />
              )}
              {objective.descripcion.includes("reciclaje") && (
                <Progress.Circle
                  size={80}
                  progress={puntosReciclajeVisitados / objective.numObjetivo} // Dynamically using the required number of points
                  color={"#4CAF50"}
                  thickness={8}
                  showsText={true}
                  formatText={() =>
                    `${Math.round(
                      Math.min(
                        (puntosReciclajeVisitados / objective.numObjetivo) *
                          100,
                        100,
                      ),
                    )}%`
                  }
                  textStyle={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#333",
                  }}
                />
              )}
            </View>
            <Text style={styles.rewardText}>
              Recompensa al completar: {objective.puntosObtenibles} PO
            </Text>
          </View>
        ))}
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  rewardsContainer: {
    flexDirection: "row",
    paddingVertical: 30,
    paddingHorizontal: 5,
    backgroundColor: "#FFF8E1",
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
