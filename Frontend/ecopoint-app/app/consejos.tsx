import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import BotBar from "../components/BotBar";

const consejos = [
  {
    id: 1,
    title: "Consejo #1: Limpieza",
    description:
      "Limpia y seca bien los envases antes de reciclar para evitar la contaminación y mejorar el proceso de reciclaje.",
    image: require("../assets/consejo1.jpg"),
  },
  {
    id: 2,
    title: "Consejo #2: Reutilización",
    description:
      "Reduce, reutiliza y luego recicla. Piensa en cómo puedes dar un nuevo uso a artículos antes de tirarlos.",
    image: require("../assets/consejo2.jpg"),
  },
  {
    id: 3,
    title: "Consejo #3: Tecnología a tu favor",
    description:
      "Utiliza aplicaciones que te ayudan a encontrar centros de reciclaje, aprender nuevas técnicas y recibir alertas ecológicas.",
    image: require("../assets/consejo3.jpg"),
  },
  {
    id: 4,
    title: "Consejo #4: Participación Comunitaria",
    description:
      "Únete a grupos locales de reciclaje y participa en campañas comunitarias para un impacto mayor y más efectivo.",
    image: require("../assets/consejo4.jpg"),
  },
];

const ConsejosScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Consejos Útiles para Reciclar</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {consejos.map((consejo) => (
          <View key={consejo.id} style={styles.consejoContainer}>
            <Image source={consejo.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.consejoTitle}>{consejo.title}</Text>
              <Text style={styles.consejoDescription}>
                {consejo.description}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <BotBar />
    </View>
  );
};

// Estilos para la pantalla de consejos mejorada
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F3F6",
  },
  header: {
    backgroundColor: "#52734D",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 80, // Espacio para la barra de navegación
  },
  consejoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  consejoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#52734D",
    marginBottom: 5,
  },
  consejoDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default ConsejosScreen;
