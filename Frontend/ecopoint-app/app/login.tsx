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
import { Link, useRouter } from "expo-router"; // Importa useRouter para la navegación
import useLoginViewModel from "../ViewModel/LoginViewModel"; // ViewModel

const LoginScreen: React.FC = () => {
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
  } = useLoginViewModel();

  const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad de la contraseña

  // Expresión regular para validar dominios de correo específicos
  const emailRegex = /^[^\s@]+@(gmail\.com|hotmail\.com|icloud\.com)$/;

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    const success = await onSubmit(); // Ejecutar el método para manejar el inicio de sesión

    if (success) {
      // Si el inicio de sesión es exitoso, redirigir al HomeScreen
      router.push("/mainmenu"); // Redirige al HomeScreen
    }
  };

  // Verificar si el email es válido según la expresión regular
  const isEmailValid = emailRegex.test(email);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>

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
                ? "https://img.icons8.com/ios-glyphs/30/000000/invisible.png" // Icono para ocultar la contraseña
                : "https://img.icons8.com/ios-glyphs/30/000000/visible.png", // Icono para mostrar la contraseña
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Enlace para "¿Olvidaste tu contraseña?" */}
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={() => router.push("/forgot-password")} // Redirige a la pantalla de recuperación de contraseña
      >
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      {/* Mostrar mensaje de error si lo hay */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Botón de iniciar sesión */}
      <TouchableOpacity
        style={[
          styles.loginButton,
          (!isEmailValid || password === "") && styles.disabledButton,
        ]}
        onPress={handleLogin}
        disabled={isLoading || !isEmailValid || password === ""}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
        )}
      </TouchableOpacity>

      {/* Texto de términos y condiciones */}
      <Text style={styles.termsText}>
        Al iniciar sesión, aceptas las{" "}
        <Text style={styles.link}>Condiciones de servicio</Text> y la{" "}
        <Text style={styles.link}>Política de Privacidad</Text>.
      </Text>

      {/* Texto para "Inicia sesión con" */}
      <View style={styles.socialLoginContainer}>
        <View style={styles.separator} />
        <Text style={styles.socialLoginText}>Inicia sesión con</Text>
        <View style={styles.separator} />
      </View>

      {/* Íconos para el inicio de sesión con Apple, Google y Facebook */}
      <View style={styles.socialIconsContainer}>
        <Link href="https://www.apple.com">
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/000000/mac-os.png",
            }}
            style={styles.socialIcon}
          />
        </Link>
        <Link href="https://accounts.google.com">
          <Image
            source={{
              uri: "https://img.icons8.com/color/50/000000/google-logo.png",
            }}
            style={styles.socialIcon}
          />
        </Link>
        <Link href="https://www.facebook.com">
          <Image
            source={{
              uri: "https://img.icons8.com/color/50/000000/facebook-new.png",
            }}
            style={styles.socialIcon}
          />
        </Link>
      </View>

      {/* Texto para registrarse */}
      <View style={styles.registerTextContainer}>
        <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
        <Link href="/register">
          <Text style={styles.registerLink}>Registrarse</Text>
        </Link>
      </View>
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
    marginBottom: 5, // Reduje el margen para dejar espacio al enlace de "¿Olvidaste tu contraseña?"
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
  forgotPassword: {
    alignSelf: "flex-end", // Mantiene el enlace alineado a la derecha
    marginBottom: 10, // Espacio entre el enlace y el botón de inicio de sesión
  },
  forgotPasswordText: {
    fontSize: 12,
    color: "#52734D",
    textDecorationLine: "underline",
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
    backgroundColor: "#A8A8A8", // Cambia el color del botón si está deshabilitado
  },
  termsText: {
    fontSize: 12,
    color: "#7D7D7D",
    marginBottom: 20,
    textAlign: "center",
  },
  link: {
    textDecorationLine: "underline",
    color: "#52734D",
  },
  registerTextContainer: {
    flexDirection: "row",
  },
  registerText: {
    fontSize: 14,
    color: "#7D7D7D",
  },
  registerLink: {
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
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default LoginScreen;
