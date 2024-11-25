import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
  Image,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        "El código QR no coincide o no estás cerca del punto de reciclaje."
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
        <Text style={styles.subtitle}>{Ubicacion}</Text>
      </View>

      {!isPermissionGranted ? (
        <View style={styles.qrContainer}>
          <Pressable
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionText}>Dar permisos de cámara</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          {!scanned ? (
            <View style={styles.cameraContainer}>
              <View style={styles.cameraFrame}>
                <CameraView
                  style={styles.camera}
                  facing="back"
                  onBarcodeScanned={({ data }) =>
                    handleBarCodeScanned({ data })
                  }
                />
              </View>
            </View>
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
      <View style={styles.footerDecoration}>
        <Text style={styles.footerText}>Apunta al QR para escanear</Text>
        <Image
          style={styles.footerIcon}
          source={{
            uri: "https://img.icons8.com/ios-filled/50/4caf50/qr-code.png",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3D550C",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3D550C",
    marginBottom: 20,
  },
  cameraContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  cameraFrame: {
    width: "95%",
    aspectRatio: 3 / 4,
    borderWidth: 6, // Grosor del marco verde
    borderColor: "#3D550C", // Verde oscuro
    borderRadius: 10,
    overflow: "hidden", // Para evitar desbordes
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1, // Asegura que la cámara ocupe todo el espacio disponible
    alignSelf: "stretch", // Ajusta la cámara al ancho del marco
  },
  loaderContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  permissionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#3D550C",
    borderRadius: 5,
    alignItems: "center",
  },
  permissionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerDecoration: {
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#EAF5E8",
  },
  footerText: {
    fontSize: 16,
    color: "#3D550C",
    fontStyle: "italic",
    textAlign: "center",
  },
  footerIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  qrContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  header: {
    backgroundColor: "#EAF5E8", // Fondo verde claro
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
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
