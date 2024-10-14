import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import useFriendViewModel from "../ViewModel/FriendViewModel"; // Importar el FriendViewModel

const { width } = Dimensions.get("window");
const FriendsScreen: React.FC = () => {
  const [enteredCode, setEnteredCode] = useState<string>(""); // Estado para el código ingresado
  const [isClaimingPoints, setIsClaimingPoints] = useState<boolean>(false); // Nuevo estado para indicar cuando se están reclamando puntos
  const {
    codigoAmistad,
    friends, // Lista de amigos almacenados
    isLoading,
    errorMessage,
    checkFriendCode,
    reclamarRecompensa,
  } = useFriendViewModel();

  const handleCheckCode = () => {
    if (enteredCode.trim()) {
      checkFriendCode(enteredCode); // Buscar el código de amistad ingresado
    } else {
      console.warn("Please enter a valid friend code.");
    }
  };

  const handleClaimPoints = async (friendEmail: string) => {
    try {
      setIsClaimingPoints(true); // Iniciar la indicación de carga
      await reclamarRecompensa(friendEmail); // Llamada a la función corregida
      console.log("Puntos reclamados para: ", friendEmail);
    } catch (error) {
      console.error("Error en la solicitud al reclamar puntos.", error);
    } finally {
      setIsClaimingPoints(false); // Finalizar la indicación de carga
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Amigos invitados</Text>

      {/* Caja con ScrollView para amigos invitados */}
      <View style={styles.friendBox}>
        <ScrollView>
          {friends.length > 0 ? (
            friends.map((friendEmail, index) => (
              <View key={index} style={styles.friendContainer}>
                <Text style={styles.friendName}>{friendEmail}</Text>
                <TouchableOpacity
                  style={styles.claimButton}
                  onPress={() => handleClaimPoints(friendEmail)} // Reclamar puntos
                  disabled={isClaimingPoints} // Deshabilitar botón si ya se está procesando
                >
                  {isClaimingPoints ? (
                    <ActivityIndicator size="small" color="green" />
                  ) : (
                    <>
                      <FontAwesome5 name="gift" size={24} color="green" />
                      <Text style={styles.buttonText}>Reclamar puntos</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noFriendsText}>
              No tienes amigos invitados.
            </Text>
          )}
        </ScrollView>
      </View>

      {/* Ingreso de código de amistad */}
      <Text style={styles.label}>Ingresa un código de amistad</Text>
      <TextInput
        style={styles.input}
        placeholder="Código de amistad"
        value={enteredCode}
        onChangeText={setEnteredCode}
      />
      <TouchableOpacity style={styles.checkButton} onPress={handleCheckCode}>
        <Text style={styles.checkButtonText}>Buscar</Text>
      </TouchableOpacity>

      {/* Mostrar el código de amistad del usuario logueado */}
      {isLoading ? (
        <ActivityIndicator size="large" color="green" />
      ) : errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <View style={styles.friendCodeContainer}>
          <Text style={styles.friendCode}>Mi código de amistad:</Text>
          <Text style={styles.friendCodeValue}>
            {codigoAmistad || "Cargando..."}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    marginVertical: 20,
  },
  friendBox: {
    width: "90%",
    height: 150, // Fijar una altura para que el scroll funcione
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  friendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 10,
  },
  friendName: {
    fontSize: 18,
    color: "green",
  },
  claimButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DFFFD6",
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    marginLeft: 10,
    color: "green",
    fontSize: 16,
  },
  noFriendsText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    width: "90%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#B2DFDB",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  checkButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#A5D6A7",
    borderRadius: 10,
  },
  checkButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  friendCodeContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  friendCode: {
    fontSize: 18,
    color: "green",
    marginBottom: 5,
  },
  friendCodeValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});

export default FriendsScreen;
