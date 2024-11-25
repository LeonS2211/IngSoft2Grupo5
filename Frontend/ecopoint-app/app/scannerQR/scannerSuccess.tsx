import React, { useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import useGetPuntosViewModel from "../../ViewModel/GetPuntosViewModel";

export default function ScannerSuccess() {
  const {
    userPuntaje,
    sumarPuntosUsuario,
    fetchUserPuntaje,
    isLoading,
    errorMessage,
    Fecha,
  } = useGetPuntosViewModel();

  useEffect(() => {
    fetchUserPuntaje();
    sumarPuntosUsuario(1000); // Obtener el puntaje del usuario al cargar la vista
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <>
          <Text style={styles.title}>Puntaje del usuario</Text>
          <Text>Cargando...</Text>
        </>
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <>
          <Text style={styles.title}>¡Escaneo realizado correctamente!</Text>

          <View style={styles.validationContainer}>
            <FontAwesome5 name="thumbs-up" size={50} color="green" />
            <Text style={styles.validationText}>¡Puntaje validado!</Text>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>Fecha: {Fecha}</Text>
            <Text style={styles.infoText}>Puntaje obtenido: 1000+</Text>
            <Text style={styles.infoText}>Puntaje actual:{userPuntaje}</Text>
          </View>

          <Link replace href={"/mainmenu"} asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Aceptar</Text>
            </Pressable>
          </Link>
        </>
      )}
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
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});
