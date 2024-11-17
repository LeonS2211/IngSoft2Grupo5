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
    null,
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
      <View style={{ paddingBottom: insets.bottom }}>
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
        <View>
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

        {/* Modal for Callout content */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Close button in the top right corner */}
              <Pressable style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>✕</Text>
              </Pressable>
              {selectedPoint && (
                <>
                  <Text style={styles.calloutTitle}>
                    {selectedPoint.nombre}
                  </Text>
                  <View style={styles.buttonContainer}>
                    <Pressable
                      style={styles.button}
                      onPress={() => {
                        setDestination({
                          latitude: selectedPoint.getUbicacionCoords().latitud,
                          longitude:
                            selectedPoint.getUbicacionCoords().longitud,
                        });
                        closeModal();
                      }}
                    >
                      <Text style={styles.buttonText}>
                        Ir hacia el punto de reciclaje
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.button}
                      onPress={() => {
                        closeModal();
                        setDestination(null);
                        router.push(`/scannerQR/${selectedPoint.nombre}`);
                      }}
                    >
                      <Text style={styles.buttonText}>Escanear QR</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>

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
    height: "73%",
    width: "100%",
    paddingBottom: 0,
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
});

export default HomeScreen;
