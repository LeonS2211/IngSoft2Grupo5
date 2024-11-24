import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router"; // Uso de useRouter para la navegación
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Para los iconos de navegación
import MapView, { Marker } from "react-native-maps";
import BotBar from "../components/BotBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import useMapViewModel from "../ViewModel/MapViewModel";
import MapViewDirections from "react-native-maps-directions";
import { PuntoReciclaje } from "../Models/puntoReciclajeModel";
import { GOOGLE_MAPS_KEY } from "@env";

const RecBin = require("../assets/RecycleBin.png");

const HomeScreen: React.FC = () => {
  const router = useRouter(); // Hook de router para la navegación
  const { puntos, isLoading, errorMessage } = useMapViewModel();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<PuntoReciclaje | null>(
    null
  );

  const openModal = (punto: PuntoReciclaje) => {
    setSelectedPoint(punto);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setSelectedPoint(null);
  };
  const [origin, setOrigin] = useState({
    latitude: -12.08511625487562,
    longitude: -76.97726574392497,
  });
  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(current);
  }

  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLocationPermission();
  }, []);
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, paddingBottom: insets.bottom }}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>¡Bienvenido!</Text>

          {/* Imagen de perfil con navegación a ProfileScreen */}
          <TouchableOpacity onPress={() => router.push("/profileScreen")}>
            <View style={styles.profileContainer}>
              <Image
                source={{
                  uri: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
                }}
                style={styles.profilePic}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Botón para añadir sugerencia */}
        <View style={styles.suggestionButtonContainer}>
          <TouchableOpacity
            style={styles.suggestionButton}
            onPress={() => router.push("/sugerencia")}
          >
            <FontAwesome5 name="plus" size={16} color="white" />
            <Text style={styles.suggestionButtonText}>
              Sugerir Punto de Reciclaje
            </Text>
          </TouchableOpacity>
        </View>

        {/* Mapa */}
        <View style={{ flex: 1 }}>
          {isLoading ? (
            <Text>Cargando puntos de reciclaje...</Text>
          ) : errorMessage ? (
            <Text>Error: {errorMessage}</Text>
          ) : (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: origin.latitude,
                longitude: origin.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              showsUserLocation
              showsMyLocationButton
            >
              {puntos.map((punto) => (
                <Marker
                  key={punto.nombre}
                  onPress={() => openModal(punto)}
                  coordinate={{
                    latitude: punto.getUbicacionCoords().latitud,
                    longitude: punto.getUbicacionCoords().longitud,
                  }}
                >
                  <View>
                    <Image source={RecBin} style={{ width: 30, height: 30 }} />
                  </View>
                </Marker>
              ))}
              {destination && Object.keys(destination).length > 0 && (
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={GOOGLE_MAPS_KEY}
                  strokeWidth={1}
                  strokeColor="blue"
                />
              )}
            </MapView>
          )}
        </View>

        {/* Barra de navegación inferior */}
        <BotBar />
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
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
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: "black",
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
  map: {
    flex: 1, // Ocupa todo el espacio disponible
    width: "100%",
  },
  calloutContainer: {
    width: 200, // Ajusta el ancho del Callout según prefieras
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#4CAF50", // Color del botón
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  suggestionButtonContainer: {
    marginVertical: 10,
    alignItems: "center",
  },

  suggestionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8, // Más delgado
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    width: "95%", // Cubre casi todo el ancho
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },

  suggestionButtonText: {
    marginLeft: 8,
    color: "white",
    fontSize: 14, // Ajustado para ser más compacto
    fontWeight: "bold",
  },
});

export default HomeScreen;
