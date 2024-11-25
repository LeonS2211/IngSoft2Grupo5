import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useComunidadAdminViewModel from "../../ViewModel/comunidadDetalleAdminViewModel";

const ComentariosAdminView = () => {
  const {
    publicaciones,
    isLoading,
    errorMessage,
    fetchComentarios,
    deleteComentario,
    comunidadNombre,
  } = useComunidadAdminViewModel();

  useEffect(() => {
    fetchComentarios();
  }, []);

  const rangoImagenes: Record<string, any> = {
    plata: require("../../assets/plata.png"),
    oro: require("../../assets/oro.png"),
    bronce: require("../../assets/bronce.png"),
  };

  const handleDeleteComentario = async (id: number) => {
    Alert.alert(
      "Eliminar comentario",
      "¿Estás seguro de que deseas eliminar este comentario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            const success = await deleteComentario(id);
            if (success) {
              Alert.alert(
                "Éxito",
                "El comentario fue eliminado correctamente.",
              );
            } else {
              Alert.alert(
                "Error",
                "Hubo un problema al eliminar el comentario.",
              );
            }
          },
        },
      ],
    );
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
        {/* Avatar y contenido */}
        <View style={styles.contentRow}>
          <Image source={profileImage} style={styles.avatar} />
          <View style={styles.content}>
            <Text style={styles.userName}>{item.usuario.email}</Text>
            <Text style={styles.commentText}>{item.descripcion}</Text>
          </View>
        </View>
        {/* Botón Eliminar */}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeleteComentario(item.id)}
        >
          <FontAwesome5
            name="trash-alt"
            size={16}
            color="white"
            style={styles.deleteIcon}
          />
          <Text style={styles.deleteButtonText}>Eliminar</Text>
        </TouchableOpacity>
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
        />
      )}
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
  card: {
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
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Separar contenido del botón
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
  content: { flex: 1 },
  userName: { fontWeight: "bold", fontSize: 16, color: "#357A38" },
  commentText: { color: "#555", marginTop: 5 },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#757575", // Color gris
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10, // Separar del contenido
  },
  deleteIcon: {
    marginRight: 5, // Separar icono del texto
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ComentariosAdminView;
