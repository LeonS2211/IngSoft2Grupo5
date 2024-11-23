import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSugerenciaViewModel } from "../ViewModel/SugerenciaUserViewModel";

const SugerenciaScreen = () => {
  const { sugerencias, isLoading, errorMessage, agregarSugerencia } =
    useSugerenciaViewModel();

  const [latitud, setLatitud] = useState<string>("");
  const [longitud, setLongitud] = useState<string>("");
  const [descripcion, setDescripcion] = useState("");

  const handleAgregarSugerencia = async () => {
    if (!latitud || !longitud || !descripcion) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    await agregarSugerencia(
      1,
      parseFloat(latitud),
      parseFloat(longitud),
      descripcion
    );
    setLatitud("");
    setLongitud("");
    setDescripcion("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sugerencias de Puntos de Reciclaje</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Latitud"
          value={latitud}
          keyboardType="numeric"
          onChangeText={setLatitud}
        />
        <TextInput
          style={styles.input}
          placeholder="Longitud"
          value={longitud}
          keyboardType="numeric"
          onChangeText={setLongitud}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descripción"
          value={descripcion}
          onChangeText={setDescripcion}
          multiline
        />
        <TouchableOpacity
          style={styles.button}
          onPress={handleAgregarSugerencia}
        >
          <Text style={styles.buttonText}>Enviar Sugerencia</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : errorMessage ? (
        <Text style={styles.error}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={sugerencias}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.suggestion}>
              <Text style={styles.suggestionTitle}>
                Latitud: {item.ubicacionPropuestaLatitud}, Longitud:{" "}
                {item.ubicacionPropuestaLongitud}
              </Text>
              <Text>{item.descripcion}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  error: {
    color: "#FF5252",
    textAlign: "center",
    marginBottom: 10,
  },
  suggestion: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  suggestionTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default SugerenciaScreen;
