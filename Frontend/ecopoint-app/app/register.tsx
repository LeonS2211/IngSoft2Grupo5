import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
} from "react-native";
import { Link, useRouter } from "expo-router"; // Para redirigir
import useRegisterViewModel from "../ViewModel/RegisterViewModel";
import { SpinnerLoader } from "../components/SpinerLoader";

// Obtener las dimensiones de la pantalla
const { width } = Dimensions.get("window");

const RegisterScreen: React.FC = () => {
  const {
    email,
    password,
    isLoading,
    errorMessage,
    setEmail,
    setPassword,
    onSubmit,
  } = useRegisterViewModel();

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Para redirigir a la pantalla de login

  // Validación de contraseña
  const hasMinLength = password.length >= 8 && password.length <= 20;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isPasswordValid =
    hasMinLength && hasUpperCase && hasNumber && hasSpecialChar;

  // Validación de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(email);
  const isFormValid = isEmailValid && isPasswordValid;

  // Manejo del registro
  const handleRegister = async () => {
    const result = await onSubmit(); // Ejecutar el método para manejar el registro
    if (result) {
      router.push("/login"); // Redirigir a la pantalla de login si es exitoso
    } else {
      console.log("Registro fallido");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      {/* Campo de correo electrónico */}
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Campo de contraseña */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
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

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Botón de registrarse */}
      <TouchableOpacity
        style={[
          styles.registerButton,
          isFormValid && styles.registerButtonActive,
        ]}
        onPress={handleRegister}
        disabled={isLoading || !isFormValid}
      >
        {isLoading ? (
          <SpinnerLoader />
        ) : (
          <Text style={styles.buttonText}>REGISTRARSE</Text>
        )}
      </TouchableOpacity>

      {/* Texto para iniciar sesión */}
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
        <Link href="/login">
          <Text style={styles.loginLink}>Iniciar sesión</Text>
        </Link>
      </View>
    </ScrollView>
  );
};
// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: width * 0.05,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 0.08 * width,
    fontWeight: "bold",
    marginBottom: 0.05 * width,
    color: "#2D2D2D",
  },
  input: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    backgroundColor: "#FFFFFF",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  showPassword: {
    position: "absolute",
    right: 15,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "#9E9E9E",
  },
  passwordRulesContainer: {
    marginBottom: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%",
  },
  passwordRule: {
    fontSize: 0.04 * width,
    marginBottom: 5,
    width: "45%",
  },
  validRule: {
    color: "green",
  },
  invalidRule: {
    color: "red",
  },
  errorText: {
    fontSize: 14,
    color: "red",
    marginBottom: 10,
  },
  registerButton: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#A8E6CF",
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  registerButtonActive: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  loginTextContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  loginText: {
    fontSize: 14,
    color: "#7D7D7D",
  },
  loginLink: {
    fontSize: 14,
    color: "#52734D",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  socialLoginContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#E6E6E6",
  },
  socialLoginText: {
    fontSize: 16,
    color: "#7D7D7D",
    marginHorizontal: 10,
  },
  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 15,
  },
  socialIcon: {
    width: 0.1 * width,
    height: 0.1 * width,
    resizeMode: "contain",
  },
});

export default RegisterScreen;
