import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useTop10FirstUsersViewModel from "../ViewModel/ComentariosViewModel";
import { router } from "expo-router";
import { useIsFocused } from "@react-navigation/native";

const AdminCommentsScreen = () => {
  const { users, isLoading, errorMessage, fetchTop10FirstUsers } =
    useTop10FirstUsersViewModel();
  const isFocused = useIsFocused(); // Detecta si la pantalla está enfocada

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <View style={styles.iconContainer}>
        <FontAwesome5 name="user-tie" size={24} color="#4CAF50" />
      </View>
      <View style={styles.commentContent}>
        <Text style={styles.userName}>{item.nombre || "Usuario"}</Text>
      </View>
      <TouchableOpacity
        onPress={() => router.push(`/chatSupport/${item.nombre}`)} // Navegación a la pantalla de soporte
      >
        <Text style={styles.userName}>responder</Text>
      </TouchableOpacity>
    </View>
  );
  useEffect(() => {
    if (isFocused) {
      fetchTop10FirstUsers(); // Borra el almacenamiento cuando la pantalla se enfoca
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Comentarios de Usuarios</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderComment}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.emptyText}>No hay comentarios disponibles.</Text>
      )}

      <TouchableOpacity
        style={styles.refreshButton}
        onPress={fetchTop10FirstUsers}
      >
        <FontAwesome5 name="sync" size={20} color="white" />
        <Text style={styles.listContainer}>Actualizar</Text>
      </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  errorText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#FF5252",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
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
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
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

export default AdminCommentsScreen;
