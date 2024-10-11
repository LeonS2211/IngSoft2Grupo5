import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router'; // Importa useRouter para la navegación
import useLoginViewModel from '../ViewModel/LoginViewModel'; // ViewModel

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

  // Función para manejar el inicio de sesión
  const handleLogin = async () => {
    const success = await onSubmit(); // Ejecutar el método para manejar el inicio de sesión
    
    if (success) {
      // Si el inicio de sesión es exitoso, redirigir al HomeScreen
      router.push('/mainmenu'); // Redirige al HomeScreen
    }
  };

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
          secureTextEntry
        />
        <TouchableOpacity style={styles.showPassword}>
          <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/visible.png' }} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Mostrar mensaje de error si lo hay */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Botón de iniciar sesión */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
   
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'black',
  },
  input: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6E6E6',
    backgroundColor: '#FFFFFF',
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  showPassword: {
    position: 'absolute',
    right: 15,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#9E9E9E',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#52734D',
    fontWeight: 'bold',
  },
  loginButton: {
    width: '100%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#52734D',
    alignItems: 'center',
    marginVertical: 20,
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  termsText: {
    fontSize: 12,
    color: '#7D7D7D',
    marginBottom: 20,
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
    color: '#52734D',
  },
  registerTextContainer: {
    flexDirection: 'row',
  },
  registerText: {
    fontSize: 14,
    color: '#7D7D7D',
  },
  registerLink: {
    fontSize: 14,
    color: '#52734D',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
