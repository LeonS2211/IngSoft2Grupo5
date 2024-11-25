import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import BotBar from "../components/BotBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications"; // Importamos Notifications
import useMapViewModel from "../ViewModel/MapViewModel";
import MapViewDirections from "react-native-maps-directions";
import { PuntoReciclaje } from "../Models/puntoReciclajeModel";
import { GOOGLE_MAPS_KEY } from "@env";

const RecBin = require("../assets/RecycleBin.png");

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const { puntos, isLoading, errorMessage } = useMapViewModel();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<PuntoReciclaje | null>(
    null
  );

  const [origin, setOrigin] = useState({
    latitude: -12.08511625487562,
    longitude: -76.97726574392497,
  });
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null);
  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Solicitar permisos para notificaciones
  const requestNotificationPermissions = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Se requieren permisos para mostrar notificaciones.");
    }
  };

  const openModal = (punto: PuntoReciclaje) => {
    setSelectedPoint(punto);
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setSelectedPoint(null);
  };

  // Solicitar permisos y activar seguimiento de ubicación
  const startLocationUpdates = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Se requiere permiso para acceder a tu ubicación.");
      return;
    }

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 1000, // Actualizar cada 1 segundo
        distanceInterval: 5, // Actualizar cada 5 metros
      },
      async (location) => {
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setOrigin(userLocation);

        // Verificar si el usuario está cerca del destino
        if (destination) {
          const distance = getDistance(userLocation, destination); // Calcula la distancia
          if (distance <= 50) {
            await sendNotification(); // Enviar notificación
          }
        }
      }
    );

    setLocationSubscription(subscription);
  };

  // Detener seguimiento de ubicación
  const stopLocationUpdates = () => {
    if (locationSubscription) {
      locationSubscription.remove();
      setLocationSubscription(null);
    }
  };

  // Calcular la distancia entre dos puntos usando la fórmula de Haversine
  const getDistance = (
    origin: { latitude: number; longitude: number },
    destination: { latitude: number; longitude: number }
  ) => {
    const R = 6371e3; // Radio de la Tierra en metros
    const φ1 = (origin.latitude * Math.PI) / 180;
    const φ2 = (destination.latitude * Math.PI) / 180;
    const Δφ = ((destination.latitude - origin.latitude) * Math.PI) / 180;
    const Δλ = ((destination.longitude - origin.longitude) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distancia en metros
  };

  // Enviar notificación
  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Estás cerca!",
        body: "Estás a menos de 50 metros de tu destino.",
        sound: "default",
      },
      trigger: null, // Inmediatamente
    });
  };

  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Solicitar permisos de notificaciones al cargar la pantalla
    requestNotificationPermissions();
    startLocationUpdates();
    return () => {
      stopLocationUpdates();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, paddingBottom: insets.bottom }}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>¡Bienvenido!</Text>
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
              region={{
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
        {/* Modal para detalles del marcador */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
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
