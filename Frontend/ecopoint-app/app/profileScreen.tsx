import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import useProfileViewModel from "../ViewModel/ProfileViewModel";

const { width } = Dimensions.get("window");

const ProfileScreen: React.FC = () => {
  const router = useRouter();
  const {
    email,
    puntos,
    rankingPosition,
    isLoading,
    errorMessage,
    fetchEmail,
    logout,
  } = useProfileViewModel();

  useEffect(() => {
    fetchEmail();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <FontAwesome5 name="arrow-left" size={24} color="green" />
      </TouchableOpacity>

      <View style={styles.headerBackground}>
        <Image
          source={require("../assets/fondo.jpeg")}
          style={styles.headerImage}
        />
      </View>

      <View style={styles.profileContainer}>
        <View style={styles.profilePicContainer}>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
            }}
            style={styles.profilePic}
          />
        </View>
      </View>

      <View style={styles.profileHeader}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : errorMessage ? (
          <Text style={styles.statLabel}>{errorMessage}</Text>
        ) : (
          <Text style={styles.name}>{email || "Cargando..."}</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/friends")}
        >
          <Text style={styles.buttonText}>AGREGAR AMIGOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>MIS AMIGOS</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <FontAwesome5 name="recycle" size={24} color="green" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statNumber}>-</Text>
              <Text style={styles.statLabel}>Cantidad total</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <FontAwesome5 name="calendar-alt" size={24} color="green" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statNumber}>-</Text>
              <Text style={styles.statLabel}>Días de racha</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <FontAwesome5 name="star" size={24} color="green" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statNumber}>
                {puntos !== null ? puntos : "Cargando..."}
              </Text>
              <Text style={styles.statLabel}>Puntaje total</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <FontAwesome5 name="chart-bar" size={24} color="green" />
            <View style={styles.statTextContainer}>
              <Text style={styles.statNumber}>
                {rankingPosition !== null
                  ? `${rankingPosition}`
                  : "Cargando..."}
              </Text>
              <Text style={styles.statLabel}>Ranking</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionItem}
          onPress={() => router.push("/configuracion")}
        >
          <FontAwesome5 name="cog" size={20} color="#9E9E9E" />
          <Text style={styles.optionText}>Configuración</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <FontAwesome5 name="headset" size={20} color="#9E9E9E" />
          <Text style={styles.optionText}>Soporte</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          logout();
          router.push("/");
        }}
      >
        <FontAwesome5 name="sign-out-alt" size={24} color="#FF3D3D" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 1,
  },
  headerBackground: {
    width: width,
    height: width * 0.4,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  profileContainer: {
    position: "absolute",
    top: width * 0.25,
    alignItems: "center",
  },
  profilePicContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#4CAF50",
    overflow: "hidden",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 65,
  },
  profileHeader: {
    marginTop: 65,
    alignItems: "center",
    marginBottom: 20,
  },
  name: {
    marginVertical: 18,
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: "#9E9E9E",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    backgroundColor: "#A8E6CF",
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2D2D2D",
  },
  statsSection: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    width: "100%",
  },
  statItem: {
    width: "48%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row",
  },
  statTextContainer: {
    marginLeft: 10,
    alignItems: "flex-start",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  statLabel: {
    fontSize: 14,
    color: "#7D7D7D",
  },
  optionsContainer: {
    width: "100%",
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },
  optionText: {
    fontSize: 16,
    color: "#2D2D2D",
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 0,
    backgroundColor: "transparent",
  },
  logoutText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF3D3D",
    marginLeft: 10,
  },
});

export default ProfileScreen;
