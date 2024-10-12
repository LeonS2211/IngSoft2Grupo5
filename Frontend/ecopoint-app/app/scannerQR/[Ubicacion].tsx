import React, { useState } from "react";
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
import codes from "../../Models/codigoQRModel";
export default function ScannerQR() {
  const { Ubicacion } = useLocalSearchParams();
  const [permission, requestPermission] = useCameraPermissions();
  const [isLoading, setIsLoading] = useState(false);
  const [codigos, setCodigos] = useState<QRCode[]>([]);
  const [scanned, setScanned] = useState(false);
  const isPermissionGranted = Boolean(permission?.granted);
  type QRCode = {
    contenido: string;
  };
  const validateQRCode = async (data: string): Promise<void> => {
    setIsLoading(true);
    setCodigos(codes);
    setTimeout(() => {
      setIsLoading(false);
      if (codigos.some((codigitos) => codigitos.contenido === data)) {
        console.log(data);
        console.log(codigos);
        router.push("scannerQR/scannerSuccess");
      } else {
        console.log(data);
        console.log(codigos);
        Alert.alert("Error", "El código QR no coincide con ningún registro.");
        setScanned(false);
      }
    }, 3000);
  };
  const handleBarCodeScanned = ({ data }: { data: string }): void => {
    console.log(data);
    setScanned(true); // Evitar escaneos repetidos
    validateQRCode(data); // Validar el código QR
  };
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
            <Text>Dar permisos de cámara</Text>
          </Pressable>
        </View>
      ) : (
        <View>
          {!scanned ? (
            <CameraView
              style={styles.camera}
              facing="back"
              onBarcodeScanned={({ data }) => {
                handleBarCodeScanned({ data });
              }}
            ></CameraView>
          ) : (
            <Text>Escaneando...</Text>
          )}
          {/* Mostrar un spinner mientras se valida el QR */}
          {isLoading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#3D550C" />
              <Text>Validando código QR...</Text>
            </View>
          )}
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
