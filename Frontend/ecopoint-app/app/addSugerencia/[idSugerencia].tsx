import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import usePuntoReciclajeViewModel from "../../ViewModel/AgregarSugerenciaViewModel";
import { useRouter } from "expo-router";

const AddPuntoReciclajeView: React.FC = () => {
  const {
    nombre,
    descripcion,
    latitud,
    longitud,
    contenidoQR,
    isLoading,
    errorMessage,
    setNombre,
    setContenidoQR,
    createPuntoReciclaje,
    setDescripcion,
    deleteSugerencia,
  } = usePuntoReciclajeViewModel();
  const router = useRouter();

  const [mapVisible, setMapVisible] = useState<boolean>(false); // Controla la visibilidad del mapa

  const handleCreatePuntoReciclaje = async () => {
    if (!nombre || !descripcion || !latitud || !longitud || !contenidoQR) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    const success = await createPuntoReciclaje();
    if (success) {
      Alert.alert("Éxito", "Punto de reciclaje creado correctamente.");
      // Eliminar la sugerencia de la API
      await deleteSugerencia();
      // Regresar a la pantalla anterior
      router.back();
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Agregar Nuevo Punto de Reciclaje</Text>

        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {/* Sección Nombre y Descripción */}
        <Text style={styles.subtitle}>
          --------------Nombre y Descripción--------------
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del Punto de Reciclaje"
          value={nombre}
          onChangeText={setNombre}
        />

        <TextInput
          style={styles.input} // Fondo gris para denotar campo no editable
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
        />

        {/* Sección Código QR */}
        <Text style={styles.subtitle}>
          --------------------Código QR--------------------
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Contenido del Código QR"
          value={contenidoQR}
          onChangeText={setContenidoQR}
        />

        {/* Sección Ubicación */}
        <Text style={styles.subtitle}>
          --------------------Ubicación--------------------
        </Text>
        <TouchableOpacity
          style={styles.mapButton}
          onPress={() => setMapVisible(true)}
        >
          <Text style={styles.mapButtonText}>Ver ubicación en el mapa</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { backgroundColor: "#E0E0E0" }]}
          placeholder="Latitud"
          value={latitud}
          editable={false}
        />

        <TextInput
          style={[styles.input, { backgroundColor: "#E0E0E0" }]}
          placeholder="Longitud"
          value={longitud}
          editable={false}
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleCreatePuntoReciclaje}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Cargando..." : "Agregar Punto de Reciclaje"}
          </Text>
        </TouchableOpacity>

        {/* Modal del MapView */}
        <Modal visible={mapVisible} animationType="slide">
          <View style={{ flex: 1 }}>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: latitud ? parseFloat(latitud) : -12.08511625487562,
                longitude: longitud ? parseFloat(longitud) : -76.97726574392497,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              {/* Muestra un marcador fijo en la ubicación de la sugerencia */}
              {latitud && longitud && (
                <Marker
                  coordinate={{
                    latitude: parseFloat(latitud),
                    longitude: parseFloat(longitud),
                  }}
                  title="Ubicación sugerida"
                  description={descripcion}
                />
              )}
            </MapView>
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setMapVisible(false)}
              >
                <Text style={styles.confirmButtonText}>Cerrar Mapa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4CAF50",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    textAlign: "center",
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  errorContainer: {
    backgroundColor: "#F8D7DA",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#F5C2C7",
    marginBottom: 15,
  },
  errorText: {
    color: "#842029",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  mapButton: {
    backgroundColor: "#FFA726",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  mapButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A5D6A7",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "60%",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default AddPuntoReciclajeView;
