import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useFeedbackViewModel from "../../ViewModel/MsgReponseViewModel";

const FeedbackScreen = () => {
  const { comment, maxCharacters, handleCommentChange, handleSendFeedback } =
    useFeedbackViewModel();

  const [lastMessage, setLastMessage] = useState(null); // Store only the last message

  const handleSend = async () => {
    const success = await handleSendFeedback();
    if (success) {
      setLastMessage({ text: comment, isUser: true }); // Update with the latest message
    }
  };

  useEffect(() => {
    // Initial setup if needed
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100} // Adjust this offset for better input visibility
      >
        <View style={styles.header}>
          <Text style={styles.title}>Chat de Soporte</Text>
        </View>

        <View style={styles.chatContainer}>
          {lastMessage && (
            <View
              style={
                lastMessage.isUser
                  ? [styles.messageBubble, styles.userBubble]
                  : [styles.messageBubble, styles.supportBubble]
              }
            >
              <Text style={styles.messageText}>{lastMessage.text}</Text>
            </View>
          )}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Escribe tu mensaje..."
            placeholderTextColor="#A9A9A9"
            multiline
            value={comment}
            onChangeText={handleCommentChange}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <FontAwesome5 name="paper-plane" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.charCounter}>
          {comment.length}/{maxCharacters} caracteres
        </Text>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#4CAF50",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  chatContainer: {
    flexGrow: 1,
    padding: 10,
    paddingBottom: 80,
    justifyContent: "flex-end",
    backgroundColor: "#F9F9F9",
  },
  messageBubble: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  userBubble: {
    backgroundColor: "#4CAF50",
    alignSelf: "flex-end",
  },
  supportBubble: {
    backgroundColor: "#E6E6E6",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E6E6E6",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textInput: {
    padding: 10,
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#F2F2F2",
    borderRadius: 20,
    paddingHorizontal: 15,
    textAlignVertical: "top",
  },
  sendButton: {
    backgroundColor: "#4CAF50",
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
    textAlign: "right",
    padding: 10,
  },
});

export default FeedbackScreen;
