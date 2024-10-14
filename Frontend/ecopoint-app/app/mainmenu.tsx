import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router"; // Uso de useRouter para la navegación
import { View, Text, StyleSheet, Image, TouchableOpacity  } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Para los iconos de navegación
import MapView, { Callout, Marker } from "react-native-maps";
import BotBar from "../components/BotBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import useMapViewModel from "../ViewModel/MapViewModel";
import { Link } from "expo-router";

const HomeScreen: React.FC = () => {
  const router = useRouter(); // Hook de router para la navegación
  const { puntos, isLoading, errorMessage } = useMapViewModel();
  const [origin, setOrigin] = useState({
    latitude: -12.08511625487562,
    longitude: -76.97726574392497,
  });
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
                  coordinate={{
                    latitude: punto.getUbicacionCoords().latitud,
                    longitude: punto.getUbicacionCoords().longitud,
                  }}
                >
                  <Link asChild href={`/scannerQR/${punto.nombre}`}>
                    <Callout>
                      <View style={styles.marker}>
                        <Text style={styles.markerText}>
                          Ir a escanear el QR de {punto.nombre}
                        </Text>
                      </View>
                    </Callout>
                  </Link>
                </Marker>
              ))}
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
  map: {
    height: "73%",
    width: "100%",
    paddingBottom: 0,
  },
  marker: { padding: 10, alignItems: "center" },
  markerText: { fontSize: 16, textAlign: "center", color: "#000" },
});

export default HomeScreen;
