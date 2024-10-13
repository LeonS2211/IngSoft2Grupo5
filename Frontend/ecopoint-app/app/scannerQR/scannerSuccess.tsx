import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ScannerSuccess() {
  return (
    <View style={styles.container}>
      {/* Mensaje de éxito */}
      <Text style={styles.title}>¡Escaneo realizado correctamente!</Text>

      {/* Sección de validación */}
      <View style={styles.validationContainer}>
        <FontAwesome5 name="thumbs-up" size={50} color="green" />
        <Text style={styles.validationText}>¡Puntaje validado!</Text>
      </View>

      {/* Información de validación */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Cantidad: N</Text>
        <Text style={styles.infoText}>Fecha: 10/10/2023 11:16</Text>
        <Text style={styles.infoText}>Puntaje: N</Text>
        <Text style={styles.infoText}>Estado: Validado</Text>
      </View>

      {/* Botón de aceptar */}
      <Link push href={"/mainmenu"} asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Aceptar</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3D550C", // Verde oscuro
    marginBottom: 30,
    textAlign: "center",
  },
  validationContainer: {
    width: "80%",
    backgroundColor: "#EAF5E8", // Verde claro
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginBottom: 40,
  },
  validationText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D550C", // Verde oscuro
  },
  infoContainer: {
    width: "80%",
    marginBottom: 40,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#DFF2D8", // Color del botón verde claro
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D550C", // Verde oscuro
    textAlign: "center",
  },
});
