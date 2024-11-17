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
import { useRouter } from "expo-router"; // Uso de useRouter para la navegación

const FeedbackScreen = () => {
  const {
    comment,
    maxCharacters,
    handleCommentChange,
    handleSendFeedback,
    fetchMsgSoporte,
    fetchMsgResponseSoporte,
  } = useFeedbackViewModel();

  const [messages, setMessages] = useState([]); // Store all messages
  const [hasFetched, setHasFetched] = useState(false); // Prevent infinite fetching
  const router = useRouter();
  const handleSend = async () => {
    const success = await handleSendFeedback();
    if (success) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: comment, isUser: true }, // Add sent message
      ]); // Update with the latest message
      router.back();
    }
  };

  useEffect(() => {
    if (!hasFetched) {
      const loadMessages = async () => {
        const msgSoporte = await fetchMsgSoporte(); // Fetch incoming message
        const msgResponseSoporte = await fetchMsgResponseSoporte(); // Fetch saved response

        const loadedMessages = [];
        if (msgSoporte) {
          loadedMessages.push({ text: msgSoporte, isUser: false });
        }
        if (msgResponseSoporte) {
          loadedMessages.push({ text: msgResponseSoporte, isUser: true });
        }

        setMessages(loadedMessages);
      };
      loadMessages();
      setHasFetched(true);
    }
  }, [hasFetched, fetchMsgSoporte, fetchMsgResponseSoporte]);

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
          {messages.map((message, index) => (
            <View
              key={index}
              style={
                message.isUser
                  ? [styles.messageBubble, styles.userBubble]
                  : [styles.messageBubble, styles.supportBubble]
              }
            >
              <Text
                style={
                  message.isUser
                    ? styles.messageTextUser
                    : styles.messageTextSupport
                }
              >
                {message.text}
              </Text>
            </View>
          ))}
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
  messageTextUser: {
    fontSize: 16,
    color: "white",
  },
  messageTextSupport: {
    fontSize: 16,
    color: "#333",
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
