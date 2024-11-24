import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import useSugerenciasViewModel from "../ViewModel/SugerenciasAdminViewModel";
import { useRouter } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

const SugerenciasScreen = () => {
  const {
    sugerencias,
    isLoading,
    errorMessage,
    deleteSugerencia,
    fetchSugerencias,
  } = useSugerenciasViewModel();
  const [selectedSugerencia, setSelectedSugerencia] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const isFocused = useIsFocused(); // Detecta si la pantalla está enfocada

  const handleOpenModal = (sugerencia) => {
    setSelectedSugerencia(sugerencia);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedSugerencia(null);
  };

  useEffect(() => {
    if (isFocused) {
      fetchSugerencias(); // Borra el almacenamiento cuando la pantalla se enfoca
    }
  }, [isFocused]);

  const renderSugerencia = ({ item }) => (
    <View style={styles.sugerenciaContainer}>
      {/* Icono de usuario */}
      <View style={styles.iconContainer}>
        <FontAwesome5 name="user-tie" size={24} color="#4CAF50" />
      </View>
      {/* Correo del usuario */}
      <View style={styles.textContainer}>
        <Text style={styles.userEmail}>{item.usuario.nombre}</Text>
      </View>
      {/* Botón para ver sugerencia */}
      <TouchableOpacity
        onPress={() => handleOpenModal(item)}
        style={styles.suggestionButton}
      >
        <Text style={styles.buttonText}>Ver Sugerencia</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sugerencias de Puntos de Reciclaje</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : sugerencias.length > 0 ? (
        <FlatList
          data={sugerencias}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderSugerencia}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>No hay sugerencias disponibles.</Text>
      )}
      <TouchableOpacity style={styles.refreshButton} onPress={fetchSugerencias}>
        <FontAwesome5 name="sync" size={20} color="white" />
        <Text style={styles.listContainer}>Actualizar</Text>
      </TouchableOpacity>

      {selectedSugerencia && (
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                Sugerencia de {selectedSugerencia.usuario.nombre}
              </Text>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: parseFloat(
                    selectedSugerencia.ubicacionPropuestaLatitud
                  ),
                  longitude: parseFloat(
                    selectedSugerencia.ubicacionPropuestaLongitud
                  ),
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: parseFloat(
                      selectedSugerencia.ubicacionPropuestaLatitud
                    ),
                    longitude: parseFloat(
                      selectedSugerencia.ubicacionPropuestaLongitud
                    ),
                  }}
                />
              </MapView>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.modalButtonText}>Cerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    handleCloseModal();
                    router.push(`/addSugerencia/${selectedSugerencia.id}`);
                  }}
                >
                  <Text style={styles.modalButtonText}>
                    Agregar Punto de Reciclaje
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.denyButton]}
                  onPress={() => {
                    deleteSugerencia(selectedSugerencia.id);
                    handleCloseModal();
                  }}
                >
                  <Text style={styles.modalButtonText}>Denegar Sugerencia</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#4CAF50",
    alignItems: "center",
  },
  title: {
    fontSize: 18, // Reducido ligeramente
    fontWeight: "bold",
    color: "white",
  },
  sugerenciaContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 12, // Reducido ligeramente
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  iconContainer: {
    width: 35, // Tamaño reducido del contenedor del ícono
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 8, // Espaciado ajustado
  },
  userEmail: {
    fontSize: 14, // Reducido ligeramente
    fontWeight: "bold",
    color: "#4CAF50",
  },
  suggestionButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12, // Reducido
    paddingHorizontal: 16, // Reducido
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 12, // Reducido
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14, // Reducido
    color: "#FF5252",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14, // Reducido
    color: "#A9A9A9",
  },
  listContainer: {
    padding: 10,
  },
  commentContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  map: {
    height: 200,
    borderRadius: 8,
  },
  modalButtons: {
    marginTop: 10,
  },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  denyButton: {
    backgroundColor: "#FF5252",
  },
  modalButtonText: {
    textAlign: "center",
    color: "#FFF",
  },
  commentContent: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 20,
    margin: 15,
    alignSelf: "center",
  },
  refreshText: {
    marginLeft: 5,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SugerenciasScreen;
