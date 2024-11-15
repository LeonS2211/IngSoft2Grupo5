import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Progress from "react-native-progress"; // Use for circular progress
import { FontAwesome5 } from "@expo/vector-icons"; // For navigation icons
import BotBar from "../components/BotBar"; // Replace with your bottom bar component
import AsyncStorage from "@react-native-async-storage/async-storage";

const getUserId = async (): Promise<string | null> => {
  try {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      throw new Error(
        "No se pudo encontrar el ID del usuario en AsyncStorage."
      );
    }
    return userId;
  } catch (error) {
    console.error("Error al obtener el userId del almacenamiento:", error);
    return null;
  }
};

const Recompensas: React.FC = () => {
  const rewards = [
    { id: 1, type: "coins", amount: 15, achieved: true },
    { id: 2, type: "tokens", amount: 25, achieved: true },
    { id: 3, type: "mega box", amount: 35, achieved: false },
    { id: 4, type: "coins", amount: 75, achieved: true },
    { id: 5, type: "tokens", amount: 85, achieved: true },
    { id: 6, type: "coins", amount: 105, achieved: true },
    { id: 7, type: "coins", amount: 120, achieved: true },
  ];

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
        {rewards.map((reward, index) => (
          <View key={reward.id} style={styles.rewardWrapper}>
            <TouchableOpacity style={styles.rewardCard}>
              <View style={styles.rewardIconContainer}>
                {reward.type === "coins" && (
                  <Image
                    source={require("../assets/trash.png")} // Replace with your asset
                    style={styles.rewardIcon}
                  />
                )}
                {reward.type === "tokens" && (
                  <Image
                    source={require("../assets/trash.png")} // Replace with your asset
                    style={styles.rewardIcon}
                  />
                )}
                {reward.type === "mega box" && (
                  <Image
                    source={require("../assets/trash.png")} // Replace with your asset
                    style={styles.rewardIcon}
                  />
                )}
              </View>
              <Text style={styles.rewardText}>
                {reward.amount ? `${reward.amount}` : "Próxima recompensa"}
              </Text>
              {reward.achieved && (
                <FontAwesome5 name="check-circle" size={16} color="green" />
              )}
            </TouchableOpacity>
            {/* Add the arrow unless it's the last item */}
            {index < rewards.length - 1 && (
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
      <ScrollView contentContainerStyle={styles.objectivesContainer}>
        {/* Objective 1 */}
        <View style={styles.objectiveCard}>
          <Text style={styles.objectiveTitle}>
            Recicla en 3 lugares diferentes esta semana
          </Text>
          <View style={{ alignItems: "center" }}>
            <Progress.Circle
              size={80}
              progress={1.0} // 100% complete
              color={"#FAD02E"}
              thickness={8}
              showsText={true}
              formatText={() => "100%"}
              textStyle={{ fontWeight: "bold", fontSize: 16, color: "#333" }}
            />
          </View>
          <Text style={styles.rewardText}>
            Recompensa al completar: 150 Puntos
          </Text>
        </View>

        {/* Objective 2 */}
        <View style={styles.objectiveCard}>
          <Text style={styles.objectiveTitle}>
            Comparte un consejo ecológico en redes sociales
          </Text>
          <View style={{ alignItems: "center" }}>
            <Progress.Circle
              size={80}
              progress={1.0} // 100% complete
              color={"#FAD02E"}
              thickness={8}
              showsText={true}
              formatText={() => "100%"}
              textStyle={{ fontWeight: "bold", fontSize: 16, color: "#333" }}
            />
          </View>
          <Text style={styles.rewardText}>
            Recompensa al completar: 70 Puntos
          </Text>
        </View>

        {/* Objective 3 */}
        <View style={styles.objectiveCard}>
          <Text style={styles.objectiveTitle}>
            Reúne prendas de vestir o textiles que ya no uses y llévalos a un
            centro de reciclaje de textiles
          </Text>
          <View style={{ alignItems: "center" }}>
            <Progress.Circle
              size={80}
              progress={0.5} // 50% complete
              color={"#FAD02E"}
              thickness={8}
              showsText={true}
              formatText={() => "50%"}
              textStyle={{ fontWeight: "bold", fontSize: 16, color: "#333" }}
            />
          </View>
          <Text style={styles.rewardText}>
            Recompensa al completar: 200 Puntos
          </Text>
        </View>
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
  },
  rewardText: {
    fontSize: 14,
    textAlign: "center",
    color: "#888",
  },
});

export default Recompensas;
