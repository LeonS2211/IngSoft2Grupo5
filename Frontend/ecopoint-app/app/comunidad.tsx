import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useComunidadViewModel from "../ViewModel/ComunidadesUserViewModel";

const ComunidadesView = () => {
  const router = useRouter();

  const {
    comunidades,
    isLoading,
    errorMessage,
    fetchComunidades,
    highlightCommunity,
  } = useComunidadViewModel();

  // Fetch communities when the component mounts
  useEffect(() => {
    fetchComunidades();
  }, []);

  const handleHighlightCommunity = (comunidadId: string) => {
    highlightCommunity(comunidadId); // Function to handle star click
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <TouchableWithoutFeedback
        onPress={() => router.push(`/comunidadDetalle/${item.id}`)}
      >
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.nombreComunidad}</Text>
          <Text style={styles.cardDescription}>
            {item.descripcionComunidad}
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => handleHighlightCommunity(item.id)}
      >
        <FontAwesome5
          name="star"
          size={24}
          color={item.isHighlighted ? "#FFD700" : "#C0C0C0"} // Gold if highlighted, gray otherwise
        />
      </TouchableWithoutFeedback>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loaderText}>Cargando comunidades...</Text>
      </View>
    );
  }

  if (errorMessage) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
        <TouchableWithoutFeedback onPress={fetchComunidades}>
          <View style={styles.retryButton}>
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Comunidades</Text>
        <Image
          source={{
            uri: "https://placehold.co/50x50",
          }}
          style={styles.profilePic}
        />
      </View>
      <FlatList
        data={comunidades}
        keyExtractor={(item) => item.id.toString()}
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
    fontSize: 24,
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#757575",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: "#FF5252",
    fontSize: 16,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ComunidadesView;
