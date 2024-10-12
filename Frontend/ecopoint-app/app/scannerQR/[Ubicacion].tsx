import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router";
import BotBar from "../../components/BotBar";
import { useCameraPermissions } from "expo-camera";
export default function ScannerQR() {
  const { Ubicacion } = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);
  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Escanea el codigo QR con tu cámara</Text>
      <View>
        <Text style={styles.subtitle}> {Ubicacion}</Text>
      </View>

      {/* Marco del QR (simulación con Image por ahora) */}
      {!isPermissionGranted ? (
        <View style={styles.qrContainer}>
          <Pressable onPress={requestPermission}>
            <Text>Dar Permisos de camara</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <Text>Camara</Text>
        </View>
      )}

      {/* Barra inferior con iconos */}
      <BotBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  header: {
    backgroundColor: "#EAF5E8", // Fondo verde claro
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3D550C", // Color verde oscuro
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3D550C", // Color verde oscuro
    paddingTop: 50,
  },
  qrContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  qrImage: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#3D550C", // Borde verde oscuro
    borderRadius: 10,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },
  circle: {
    width: 6,
    height: 6,
    backgroundColor: "black",
    borderRadius: 3,
  },
});
