import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de instalar esta dependencia o importar tu ícono

const trash = require("../assets/trash.png");

export function Main() {
  return (
    <View style={styles.container}>
      {/* Ícono de Configuración */}
      <TouchableOpacity
        style={styles.settingsIcon}
        onPress={() => {
          // Redirige a la pantalla de login del administrador
          router.push("/loginAdministrador");
        }}
      >
        <Ionicons name="settings-outline" size={30} color="#52734D" />
      </TouchableOpacity>

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
  settingsIcon: {
    position: "absolute",
    top: 40,
    right: 20,
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
