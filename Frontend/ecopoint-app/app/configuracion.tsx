import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import useConfig from "../ViewModel/configuracionModel";

const AccountScreen = () => {
  const {
    nombre,
    email,
    contraseña,
    isLoading,
    errorMessage,
    setPerfil,
    fetchUserData,
    updateUserData,
    verifyUniqueUser,
  } = useConfig();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  // Validación de contraseña
  const hasMinLength = contraseña.length >= 8 && contraseña.length <= 20;
  const hasUpperCase = /[A-Z]/.test(contraseña);
  const hasNumber = /[0-9]/.test(contraseña);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(contraseña);

  const isPasswordValid =
    hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isFormValid = isEmailValid && isPasswordValid;

  const handleConfirm = async () => {
    if (!email || !contraseña || !nombre) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }

    const isUnique = await verifyUniqueUser(email, nombre);
    if (isUnique) {
      const success = await updateUserData();
      if (success) {
        Alert.alert("Éxito", "¡Cambios realizados con éxito!");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mi cuenta</Text>
        <MaterialIcons name="edit" size={24} color="green" />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={(text) => setPerfil(text, email, contraseña)}
          placeholder={"Ingresa tu nombre"}
          placeholderTextColor="#A9A9A9"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setPerfil(nombre, text, contraseña)}
          placeholder={"Ingresa tu nuevo email"}
          placeholderTextColor="#A9A9A9"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          value={contraseña}
          onChangeText={(text) => setPerfil(nombre, email, text)}
          placeholder={"Ingresa tu contraseña"}
          placeholderTextColor="#A9A9A9"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.showPassword}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Image
            source={{
              uri: showPassword
                ? "https://img.icons8.com/material-outlined/24/000000/invisible.png"
                : "https://img.icons8.com/material-outlined/24/000000/visible.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Validación de reglas de contraseña */}
      <View style={styles.passwordRulesContainer}>
        <Text
          style={[
            styles.passwordRule,
            hasMinLength ? styles.validRule : styles.invalidRule,
          ]}
        >
          Usa entre 8 y 20 caracteres
        </Text>
        <Text
          style={[
            styles.passwordRule,
            hasUpperCase ? styles.validRule : styles.invalidRule,
          ]}
        >
          1 letra mayúscula
        </Text>
        <Text
          style={[
            styles.passwordRule,
            hasNumber ? styles.validRule : styles.invalidRule,
          ]}
        >
          1 número
        </Text>
        <Text
          style={[
            styles.passwordRule,
            hasSpecialChar ? styles.validRule : styles.invalidRule,
          ]}
        >
          1 símbolo
        </Text>
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TouchableOpacity
        style={[styles.button, isFormValid && styles.buttonActive]}
        onPress={handleConfirm}
        disabled={isLoading || !isFormValid}
      >
        {isLoading ? (
          <Text>Cargando...</Text>
        ) : (
          <Text style={styles.buttonText}>Confirmar</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F1F8EE",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
  inputContainer: {
    marginBottom: 15,
    position: "relative",
  },
  label: {
    fontSize: 16,
    color: "black",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
  showPassword: {
    position: "absolute",
    right: 10,
    top: 30,
  },
  icon: {
    width: 24,
    height: 24,
  },
  passwordRulesContainer: {
    marginBottom: 15,
  },
  passwordRule: {
    fontSize: 14,
    marginBottom: 5,
  },
  validRule: {
    color: "green",
  },
  invalidRule: {
    color: "red",
  },
  button: {
    backgroundColor: "#DDF2DB",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonActive: {
    backgroundColor: "green",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default AccountScreen;
