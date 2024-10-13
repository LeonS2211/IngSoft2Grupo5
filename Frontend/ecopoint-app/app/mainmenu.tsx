import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Para los iconos de navegación
import { useRouter } from "expo-router"; // Uso de useRouter para la navegación

const HomeScreen: React.FC = () => {
  const router = useRouter(); // Hook de router para la navegación

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>¡Bienvenido!</Text>

        {/* Imagen de perfil con navegación a ProfileScreen */}
        <TouchableOpacity onPress={() => router.push("/profileScreen")}>
          <View style={styles.profileContainer}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
              }} // Imagen predeterminada de usuario
              style={styles.profilePic}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Ubicación actual */}
      <View style={styles.locationContainer}>
        <FontAwesome5 name="map-marker-alt" size={18} color="green" />
        <Text style={styles.locationText}>Ubicación actual</Text>
      </View>

      {/* Espacio vacío donde podrías poner el mapa u otra información */}
      <View style={styles.content}>
        <Text>Contenido principal</Text>
      </View>

      {/* Barra de navegación inferior */}
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="home" size={24} color="green" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="lightbulb" size={24} color="gray" />
          <Text style={styles.navText}>Consejos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="gift" size={24} color="gray" />
          <Text style={styles.navText}>Recompensas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="users" size={24} color="gray" />
          <Text style={styles.navText}>Comunidad</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="map" size={24} color="gray" />
          <Text style={styles.navText}>Recorrido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5F5E5",
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#A8E6CF",
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  profileContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
  },
  profilePic: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  locationText: {
    fontSize: 16,
    color: "green",
    marginLeft: 5,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "gray",
  },
});

export default HomeScreen;
