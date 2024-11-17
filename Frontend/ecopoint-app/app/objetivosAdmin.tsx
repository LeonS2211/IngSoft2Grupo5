import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import useObjetivosAdminViewModel from "../ViewModel/ObjetivosAdminViewModel";

const AddObjectiveView = () => {
  const {
    descripcionObjetivo,
    setDescripcionObjetivo,
    puntajeObjetivo,
    setPuntajeObjetivo,
    nombreRecompensa,
    setNombreRecompensa,
    isLoading,
    createObjective,
  } = useObjetivosAdminViewModel();

  const handleAddObjective = async () => {
    if (!descripcionObjetivo || !puntajeObjetivo || !nombreRecompensa) {
      Alert.alert("Error", "Por favor, complete todos los campos.");
      return;
    }

    const puntaje = parseInt(puntajeObjetivo, 10);
    if (isNaN(puntaje)) {
      Alert.alert("Error", "El puntaje debe ser un número.");
      return;
    }

    try {
      const recompensa = {
        nombre: nombreRecompensa,
        puntosReq: puntaje,
      };

      const success = await createObjective(
        descripcionObjetivo,
        puntaje,
        recompensa
      );

      if (success) {
        Alert.alert(
          "Éxito",
          "El objetivo y la recompensa se han creado correctamente."
        );

        // Resetear los campos
        setDescripcionObjetivo("");
        setPuntajeObjetivo("");
        setNombreRecompensa("");
      } else {
        Alert.alert("Error", "No se pudo crear el objetivo o la recompensa.");
      }
    } catch (error) {
      console.error("Error al crear el objetivo y la recompensa:", error);
      Alert.alert("Error", "Ocurrió un error al intentar guardar los datos.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Objetivo</Text>

      <TextInput
        style={styles.input}
        placeholder="Descripción del objetivo"
        value={descripcionObjetivo}
        onChangeText={setDescripcionObjetivo}
      />

      <TextInput
        style={styles.input}
        placeholder="Puntaje del objetivo"
        value={puntajeObjetivo}
        onChangeText={setPuntajeObjetivo}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre de la recompensa"
        value={nombreRecompensa}
        onChangeText={setNombreRecompensa}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleAddObjective}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Cargando..." : "Agregar Objetivo"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4CAF50", // Verde claro
  },
  input: {
    height: 40,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    marginBottom: 25,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#A5D6A7", // Verde más claro para deshabilitado
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddObjectiveView;
