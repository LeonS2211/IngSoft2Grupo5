import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

const ComunidadDetalleView = () => {
  const router = useRouter();
  const { comunidadNombre } = useLocalSearchParams();

  const publicaciones = [
    {
      id: "1",
      usuario: "Cesar Gutierrez",
      avatar: "https://placehold.co/40x40",
      texto:
        "Compartir logros en plataformas sociales puede inspirar a otros a unirse a la causa del reciclaje.",
      likes: 350,
    },
    {
      id: "2",
      usuario: "Arturo Larsson",
      avatar: "https://placehold.co/40x40",
      texto:
        "La posibilidad de obtener recompensas al reciclar puede motivar a más personas a participar.",
      likes: 400,
    },
    {
      id: "3",
      usuario: "Mercedes Arzola",
      avatar: "https://placehold.co/40x40",
      texto:
        "Proporcionar consejos prácticos sobre cómo reducir residuos y reciclar correctamente.",
      likes: 150,
    },
    {
      id: "4",
      usuario: "Diana Smith",
      avatar: "https://placehold.co/40x40",
      texto:
        "Muchos usuarios disfrutan de la función que les permite llevar un seguimiento de su impacto.",
      likes: 280,
    },
    {
      id: "5",
      usuario: "Nicole Urbina",
      avatar: "https://placehold.co/40x40",
      texto:
        "La interfaz intuitiva hace que cualquier persona pueda navegar y aprovechar todas sus funciones.",
      likes: 320,
    },
  ];

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{item.usuario}</Text>
      </View>
      <Text style={styles.postText}>{item.texto}</Text>
      <View style={styles.cardFooter}>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="thumbs-up" size={16} color="#4CAF50" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome5 name="thumbs-down" size={16} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Comunidad</Text>
        <Text style={styles.subtitle}>{comunidadNombre}</Text>
        <Image
          source={{
            uri: "https://placehold.co/50x50",
          }}
          style={styles.profilePic}
        />
      </View>
      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity
        style={styles.addPostButton}
        onPress={() => {
          // Aquí puedes añadir la lógica para crear una nueva publicación
        }}
      >
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>
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
    padding: 20,
    backgroundColor: "#EAF6E5",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#357A38",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4CAF50",
    marginVertical: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
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
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#357A38",
  },
  postText: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  actionText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#4CAF50",
  },
  addPostButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
});

export default ComunidadDetalleView;
