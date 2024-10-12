import { StyleSheet, Text, View, Image } from "react-native";
import { Link } from "expo-router";
import React from "react";

const trash = require("../assets/trash.png");

export function Main() {
  return (
    <View style={styles.container}>
      <Image source={trash} style={styles.logo} />

      <Text style={styles.title}>ECOPOINT</Text>

      {/* Botones de acción con Link para la navegación */}
      <Link href="/mainmenu" style={styles.buttonPrimary}>
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
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 45,
    resizeMode: "contain",
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
    borderRadius: 5,
    backgroundColor: "#DFF2C6",
    alignItems: "center",
    marginVertical: 10,
    marginBottom: 25,
  },
  buttonTextPrimary: {
    fontSize: 16,
    color: "#333333",
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonSecondary: {
    width: "80%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#52734D",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonTextSecondary: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
  },
});
