import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";
const trash = require("../assets/trash.png");

export function Main() {
  return (
    <View style={styles.container}>
      <Image source={trash} style={styles.logo} />

      <Text style={styles.title}>ECOPOINT</Text>

      <Link href="/login" style={styles.buttonPrimary}>
        <Text style={styles.buttonTextPrimary}>Ya tengo una cuenta</Text>
      </Link>

      <Link href="/register" style={styles.buttonSecondary}>
        <Text style={styles.buttonTextSecondary}>No tengo una cuenta</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingTop: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 45,
    resizeMode: "contain", // Mantiene la relación de aspecto de la imagen
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333333",
  },
  buttonPrimary: {
    width: "80%",
    padding: 15,
    borderRadius: 15, // Bordes más redondeados
    backgroundColor: "#DFF2C6",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 25,
  },
  buttonTextPrimary: {
    color: "#333333",
    fontWeight: "bold",
    textAlign: "center", // Asegura que el texto esté centrado
  },
  buttonSecondary: {
    width: "80%",
    padding: 15,
    borderRadius: 15, // Bordes más redondeados
    backgroundColor: "#52734D",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonTextSecondary: {
    color: "#FFFFFF",
    textAlign: "center", // Asegura que el texto esté centrado
  },
});

export default Main;
