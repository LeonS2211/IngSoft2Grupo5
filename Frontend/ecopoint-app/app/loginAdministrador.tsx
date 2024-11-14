import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router"; // Importa useRouter para la navegación
import useLoginViewModel from "../ViewModel/LoginViewModel"; // ViewModel reutilizado

const LoginAdminScreen: React.FC = () => {
  const router = useRouter(); // Hook para la navegación

  // Obtener estados y métodos del ViewModel
  const {
    email,
    password,
    isLoading,
    errorMessage,
    setEmail,
    setPassword,
    onSubmit,
  } = useLoginViewModel(); // Utilizar el mismo ViewModel que el login del usuario regular

  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    const success = await onSubmit(); // Ejecutar el método para manejar el inicio de sesión

    if (success) {
      // Si el inicio de sesión es exitoso, redirigir al panel del administrador
      router.push("/mainAdmin"); // Redirige al panel del administrador
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión como Administrador</Text>

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
          onPress={() => setShowPassword(!showPassword)} // Alternar visibilidad
        >
          <Image
            source={{
              uri: showPassword
                ? "https://img.icons8.com/ios-glyphs/30/000000/invisible.png"
                : "https://img.icons8.com/ios-glyphs/30/000000/visible.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Mostrar mensaje de error si lo hay */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Botón de iniciar sesión */}
      <TouchableOpacity
        style={[
          styles.loginButton,
          (email === "" || password === "") && styles.disabledButton,
        ]}
        onPress={handleLogin}
        disabled={isLoading || email === "" || password === ""}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    color: "black",
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  loginButton: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#52734D",
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  disabledButton: {
    backgroundColor: "#A8A8A8",
  },
});

export default LoginAdminScreen;
