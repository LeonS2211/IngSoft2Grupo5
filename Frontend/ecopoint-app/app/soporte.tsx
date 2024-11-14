import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useFeedbackViewModel from "../ViewModel/SoporteViewModel";

const FeedbackScreen = () => {
  const { comment, maxCharacters, handleCommentChange, handleSendFeedback } =
    useFeedbackViewModel();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enviar Comentarios</Text>

      <FontAwesome5
        name="pencil-alt"
        size={50}
        color="black"
        style={styles.icon}
      />

      <Text style={styles.subtitle}>Escribe tu comentario</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Máximo 120 caracteres"
          placeholderTextColor="#A9A9A9"
          multiline
          value={comment}
          onChangeText={handleCommentChange}
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSendFeedback}
        >
          <FontAwesome5 name="paper-plane" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={styles.charCounter}>
        {comment.length}/{maxCharacters} caracteres
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    marginTop: 20,
  },
  icon: {
    marginVertical: 20,
    marginTop: 45,
  },
  subtitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    marginBottom: 45,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginBottom: 2,
    width: "100%",
  },
  textInput: {
    flex: 1,
    minHeight: 80,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: "green",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  charCounter: {
    fontSize: 12,
    color: "#A9A9A9",
    marginTop: 10,
  },
});

export default FeedbackScreen;
