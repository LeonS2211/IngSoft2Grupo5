import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import BotBar from "../../components/BotBar";
import { CameraView, useCameraPermissions } from "expo-camera";
import useGetCodesViewModel from "../../ViewModel/GetCodesViewModel";

export default function ScannerQR() {
  const { Ubicacion } = useLocalSearchParams();
  const {
    isLoading,
    errorMessage,
    fetchCodes,
    validateQRCode,
    fetchUserLocation,
  } = useGetCodesViewModel();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const isPermissionGranted = Boolean(permission?.granted);

  useEffect(() => {
    fetchCodes(); // Obtener los códigos QR al cargar la vista
    fetchUserLocation(); // Obtener la ubicación del usuario al cargar la vista
  }, []);

  const handleBarCodeScanned = async ({
    data,
  }: {
    data: string;
  }): Promise<void> => {
    setScanned(true); // Evitar escaneos repetidos

    const isValid = await validateQRCode(data); // Validar el código QR y la ubicación del usuario

    if (isValid) {
      router.push("scannerQR/scannerSuccess");
    } else {
      Alert.alert(
        "Error",
        "El código QR no coincide o no estás cerca del punto de reciclaje.",
      );
    }

    // Usar un tiempo de cooldown para evitar múltiples escaneos consecutivos
    setTimeout(() => {
      setScanned(false); // Reactivar el escaneo después de 3 segundos
    }, 2000); // Ajusta el tiempo según tus necesidades
  };

  return (
    <View style={styles.container}>
      {/* Título */}
      <Text style={styles.title}>Escanea el código QR con tu cámara</Text>
      <View>
        <Text style={styles.subtitle}> {Ubicacion}</Text>
      </View>

      {!isPermissionGranted ? (
        <View style={styles.qrContainer}>
          <Pressable onPress={requestPermission}>
            <Text>Dar permisos de cámara</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          {!scanned ? (
            <CameraView
              style={styles.camera}
              facing="back"
              onBarcodeScanned={({ data }) => handleBarCodeScanned({ data })}
            />
          ) : (
            <Text>Escaneando...</Text>
          )}
          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#3D550C" />
              <Text>Validando código QR...</Text>
            </View>
          )}
          {errorMessage && <Text>{errorMessage}</Text>}
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
  camera: {
    width: "100%",
    height: 400,
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
