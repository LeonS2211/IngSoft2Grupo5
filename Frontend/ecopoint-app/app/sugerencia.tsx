import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import useSugerenciaViewModel from "../ViewModel/SugerenciaUserViewModel";

const AddSugerenciaView: React.FC = () => {
  const {
    descripcion,
    latitud,
    longitud,
    isLoading,
    errorMessage,

    setDescripcion,
    setLatitud,
    setLongitud,

    createSugerencia,
  } = useSugerenciaViewModel();

  const [mapVisible, setMapVisible] = useState<boolean>(false); // Para mostrar/ocultar el mapa
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null); // Ubicación seleccionada en el mapa
  const [locationStatus, setLocationStatus] = useState<string | null>(
    "Falta seleccionar un punto en el mapa"
  ); // Estado del mensaje de ubicación

  const handleCreateSugerencia = async () => {
    if (!descripcion || !latitud || !longitud) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    const success = await createSugerencia();
    if (success) {
      Alert.alert("Éxito", "Sugerencia enviada correctamente.");
    }
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      setLatitud(selectedLocation.latitude.toString());
      setLongitud(selectedLocation.longitude.toString());
      setLocationStatus("Ubicación seleccionada correctamente."); // Mensaje de éxito
      setMapVisible(false); // Oculta el mapa
    } else {
      setLocationStatus("Por favor, seleccione una ubicación en el mapa."); // Mensaje de error
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sugerencia de Punto de Reciclaje</Text>

        {/* Error global */}
        {errorMessage && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        )}

        {/* Descripción */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>✏️ Descripción</Text>
          <TextInput
            style={styles.input}
            placeholder="Describe el punto de reciclaje"
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>

        {/* Ubicación */}
        <View style={styles.section}>
          <Text style={styles.subtitle}>📍 Ubicación</Text>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => setMapVisible(true)}
          >
            <Text style={styles.mapButtonText}>
              Elegir ubicación mediante mapa
            </Text>
          </TouchableOpacity>

          {/* Contenedor del estado de la ubicación */}
          {locationStatus && (
            <View
              style={[
                styles.statusContainer,
                locationStatus.includes("correctamente")
                  ? styles.successContainer
                  : styles.errorContainer,
              ]}
            >
              <Text
                style={
                  locationStatus.includes("correctamente")
                    ? styles.successText
                    : styles.errorText
                }
              >
                {locationStatus}
              </Text>
            </View>
          )}
        </View>

        {/* Botón de envío */}
        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleCreateSugerencia}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Cargando..." : "Enviar sugerencia punto de reciclaje"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Modal del MapView */}
      <Modal visible={mapVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <MapView
            style={{ flex: 1 }}
            initialRegion={{
              latitude: latitud ? parseFloat(latitud) : -12.08511625487562, // Coordenada inicial (Lima, Perú)
              longitude: longitud ? parseFloat(longitud) : -76.97726574392497,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setSelectedLocation({ latitude, longitude });
            }}
          >
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                title="Ubicación seleccionada"
              />
            )}
          </MapView>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirmLocation}
            >
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setMapVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4CAF50",
  },
  section: {
    marginVertical: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
    textTransform: "uppercase",
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  mapButton: {
    backgroundColor: "#FFA726",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  mapButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  statusContainer: {
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  successContainer: {
    backgroundColor: "#DFF2BF",
  },
  successText: {
    color: "#4F8A10",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorContainer: {
    backgroundColor: "#F8D7DA",
  },
  errorText: {
    color: "#842029",
    fontSize: 14,
    textAlign: "center",
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
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#F5F5F5",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "40%",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "40%",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default AddSugerenciaView;
