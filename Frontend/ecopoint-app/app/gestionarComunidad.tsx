import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ComentariosAdminView = () => {
  const comentarios = [
    {
      id: "1",
      autor: "César Gutiérrez",
      comentario: "Este es un comentario positivo sobre reciclaje.",
      likes: 150,
      banned: false,
    },
    {
      id: "2",
      autor: "Ana Larsson",
      comentario: "Otro comentario útil sobre el impacto del reciclaje.",
      likes: 120,
      banned: false,
    },
  ];

  const handleBanComment = (id: string) => {
    Alert.alert(
      "Confirmar baneo",
      "¿Estás seguro de que deseas banear este comentario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Banear",
          style: "destructive",
          onPress: () => {
            console.log(`Comentario ${id} baneado`);
            // Aquí puedes realizar la lógica para banear el comentario
          },
        },
      ]
    );
  };

  const handleDeleteComment = (id: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este comentario?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            console.log(`Comentario ${id} eliminado`);
            // Aquí puedes realizar la lógica para eliminar el comentario
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardAuthor}>
          {item.autor}{" "}
          {item.banned && <Text style={styles.bannedLabel}>(Baneado)</Text>}
        </Text>
        <Text style={styles.cardComment}>{item.comentario}</Text>
      </View>
      <View style={styles.actionButtons}>
        {!item.banned && (
          <TouchableOpacity
            style={[styles.button, styles.banButton]}
            onPress={() => handleBanComment(item.id)}
          >
            <FontAwesome5 name="ban" size={16} color="white" />
            <Text style={styles.buttonText}>Suspender cuenta</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={() => handleDeleteComment(item.id)}
        >
          <FontAwesome5 name="trash" size={16} color="white" />
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Administrar Comentarios</Text>
      <FlatList
        data={comentarios}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#357A38",
    textAlign: "center",
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "#FFF9F2",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F0E6D8",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContent: {
    marginBottom: 10,
  },
  cardAuthor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#357A38",
    marginBottom: 5,
  },
  bannedLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FF5252",
  },
  cardComment: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 10,
  },
  cardLikes: {
    fontSize: 12,
    color: "#999999",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  banButton: {
    backgroundColor: "#FF5252",
  },
  deleteButton: {
    backgroundColor: "#757575",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default ComentariosAdminView;
