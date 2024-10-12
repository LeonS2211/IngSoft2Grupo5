import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"; // Para los iconos de navegación
import MapView, { Callout, Marker } from "react-native-maps";
import BotBar from "../components/BotBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import markers from "../Models/ubicacionModel";
import { Link } from "expo-router";

const HomeScreen: React.FC = () => {
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
          <View style={styles.profileContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/50" }} // Foto del perfil, puedes cambiarlo por una imagen local
              style={styles.profilePic}
            />
          </View>
        </View>

        {/* Ubicación actual */}
        <View style={styles.locationContainer}>
          <FontAwesome5 name="map-marker-alt" size={18} color="green" />
          <Text style={styles.locationText}>Ubicación actual</Text>
        </View>

        {/* Espacio vacío donde podrías poner el mapa u otra información */}
        <View>
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
            {markers.map((marker, index) => (
              <Marker key={index} coordinate={marker}>
                <Link asChild href={`/scannerQR/${marker.name}`}>
                  <Callout>
                    <View style={styles.marker}>
                      <Text style={styles.markerText}>
                        Ir a escanear el QR de {marker.name}
                      </Text>
                    </View>
                  </Callout>
                </Link>
              </Marker>
            ))}
          </MapView>
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
  map: {
    height: "73%",
    width: "100%",
    paddingBottom: 0,
  },
  marker: { padding: 10, alignItems: "center" },
  markerText: { fontSize: 16, textAlign: "center", color: "#000" },
});

export default HomeScreen;
