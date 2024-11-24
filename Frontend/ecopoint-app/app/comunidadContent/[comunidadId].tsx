import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
  Image,
} from "react-native";
import useComunidadViewModel from "../../ViewModel/comunidadDetalleViewModel";

const ComentariosView = () => {
  const {
    publicaciones,
    isLoading,
    errorMessage,
    fetchComentarios,
    addComentario,
    comunidadNombre,
  } = useComunidadViewModel();

  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoComentario, setNuevoComentario] = useState("");

  useEffect(() => {
    fetchComentarios();
  }, []);

  const handleAddComentario = async () => {
    if (!nuevoComentario.trim()) {
      Alert.alert("Error", "El comentario no puede estar vacío.");
      return;
    }

    const success = await addComentario(nuevoComentario);
    if (success) {
      setModalVisible(false);
      setNuevoComentario("");
    }
  };

  const rangoImagenes: Record<string, any> = {
    plata: require("../../assets/plata.png"),
    oro: require("../../assets/oro.png"),
    bronce: require("../../assets/bronce.png"),
  };

  const renderItem = ({ item }: any) => {
    const profileImage =
      item.usuario.rango && rangoImagenes[item.usuario.rango.toLowerCase()]
        ? rangoImagenes[item.usuario.rango.toLowerCase()]
        : {
            uri: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
          };

    return (
      <View style={styles.card}>
        <Image source={profileImage} style={styles.avatar} />
        <View style={styles.content}>
          <Text style={styles.userName}>{item.usuario.email}</Text>
          <Text style={styles.commentText}>{item.descripcion}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Encabezado con el nombre de la comunidad */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{comunidadNombre}</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : publicaciones.length === 0 ? (
        <View style={styles.noPublicacionesContainer}>
          <Text style={styles.noPublicacionesText}>
            Aún no hay publicaciones en esta comunidad.
          </Text>
        </View>
      ) : (
        <FlatList
          data={publicaciones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          inverted={true} // Mostrar los más recientes al final
          ListHeaderComponent={<View style={styles.listFooter} />} // Usar Header en lugar de Footer
        />
      )}

      {/* Botón para agregar comentario */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal para agregar un nuevo comentario */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Agregar Comentario</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe tu comentario aquí..."
              value={nuevoComentario}
              onChangeText={setNuevoComentario}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={handleAddComentario}
              >
                <Text style={styles.modalButtonText}>Publicar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9F9F9" },
  header: {
    padding: 20,
    backgroundColor: "#357A38",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  errorText: { textAlign: "center", color: "#FF5252", marginTop: 20 },
  noPublicacionesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPublicacionesText: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  list: { paddingBottom: 20, paddingHorizontal: 15 },
  listFooter: {
    height: 80, // Altura suficiente para evitar que el botón estorbe
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  content: { flex: 1 },
  userName: { fontWeight: "bold", fontSize: 16, color: "#357A38" },
  commentText: { color: "#555", marginTop: 5 },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  addButtonText: { fontSize: 28, color: "white" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    height: 100,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    width: "45%",
    alignItems: "center",
  },
  modalButtonText: { color: "white", fontWeight: "bold" },
  cancelButton: { backgroundColor: "#FF5252" },
});

export default ComentariosView;
