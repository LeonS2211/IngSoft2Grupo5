import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const ComunidadesView = () => {
  const comunidades = [
    { id: "1", nombre: "Ingenierías", descripcion: "Descripción de comunidad" },
    { id: "2", nombre: "Derecho", descripcion: "Descripción de comunidad" },
    { id: "3", nombre: "Marketing", descripcion: "Descripción de comunidad" },
    {
      id: "4",
      nombre: "Arquitectura",
      descripcion: "Descripción de comunidad",
    },
    { id: "5", nombre: "Psicología", descripcion: "Descripción de comunidad" },
  ];

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <Text style={styles.cardDescription}>{item.descripcion}</Text>
        <Text style={styles.cardFavorites}>n° favoritos</Text>
      </View>
      <TouchableOpacity>
        <FontAwesome5 name="star" size={24} color="#FFD700" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Comunidades</Text>
        <Image
          source={{
            uri: "https://placehold.co/50x50", // Cambia esto a la imagen del perfil real si tienes la URL
          }}
          style={styles.profilePic}
        />
      </View>
      <FlatList
        data={comunidades}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#EAF6E5",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#357A38",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    flex: 1,
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#357A38",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 5,
  },
  cardFavorites: {
    fontSize: 12,
    color: "#999999",
  },
});

export default ComunidadesView;
