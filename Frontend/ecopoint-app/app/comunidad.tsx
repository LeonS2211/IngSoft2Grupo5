import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  LinearTransition,
  SlideInDown,
  SlideOutUp,
} from "react-native-reanimated";
import useComunidadViewModel from "../ViewModel/ComunidadesUserViewModel";

const ComunidadesView = () => {
  const router = useRouter();

  const {
    comunidades,
    isLoading,
    errorMessage,
    fetchComunidades,
    highlightCommunity,
    filterComunidades,
    searchQuery,
    setSearchQuery,
  } = useComunidadViewModel();

  useEffect(() => {
    fetchComunidades();
  }, []);

  const renderItem = ({ item }: any) => (
    <Animated.View
      style={styles.card}
      layout={LinearTransition}
      entering={SlideInDown.duration(300)}
      exiting={SlideOutUp.duration(300)}
    >
      <TouchableOpacity
        onPress={() => router.push(`/comunidadContent/${item.id}`)}
        style={styles.cardContent}
      >
        <Text style={styles.cardTitle}>{item.nombreComunidad}</Text>
        <Text style={styles.cardDescription}>{item.descripcionComunidad}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => highlightCommunity(item.id, item.isHighlighted)}
      >
        <FontAwesome5
          name="star"
          size={24}
          color={item.isHighlighted ? "#FFD700" : "#C0C0C0"} // Amarillo si es favorito, gris si no
        />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      {/* Buscador */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar comunidades..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={filterComunidades}
          style={styles.searchButton}
        >
          <FontAwesome5 name="search" size={18} color="white" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.loaderText}>Cargando comunidades...</Text>
        </View>
      ) : errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : (
        <Animated.FlatList
          data={comunidades}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    marginLeft: 10,
    borderRadius: 8,
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
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: "#757575",
    textAlign: "center",
  },
});

export default ComunidadesView;
