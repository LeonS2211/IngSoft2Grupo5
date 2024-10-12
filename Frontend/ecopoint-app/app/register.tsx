import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import useRegisterViewModel from '../ViewModel/RegisterViewModel';

const RegisterScreen: React.FC = () => {
  const { email, password, isLoading, errorMessage, setEmail, setPassword, onSubmit } = useRegisterViewModel();

  const handleRegister = async () => {
    console.log('Email:', email);
    console.log('Contraseña:', password); 
  
    await onSubmit(); // Ejecutar el método para manejar el registro
  };
  
  return (
    <View style={styles.container}>
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
          value={password} // Asegúrate de que el valor esté asignado
          onChangeText={setPassword} // Asegúrate de que setPassword esté asignando el valor
          secureTextEntry
        />
        <TouchableOpacity style={styles.showPassword}>
          <Image source={{ uri: 'https://img.icons8.com/ios-glyphs/30/000000/visible.png' }} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Mensaje de error */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      {/* Botón de registrarse */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={isLoading}>
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>REGISTRARSE</Text>}
      </TouchableOpacity>

      {/* Texto para iniciar sesión */}
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
        <Link href="/login">
          <Text style={styles.loginLink}>Iniciar sesión</Text>
        </Link>
      </View>
    </View>
  );
};

  
  // Estilos
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FAFAFA',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#2D2D2D',
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
      fontSize: 14,
      color: 'red',
      marginBottom: 10,
    },
    registerButton: {
      width: '100%',
      padding: 15,
      borderRadius: 12,
      backgroundColor: '#A8E6CF',
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
    loginTextContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    loginText: {
      fontSize: 14,
      color: '#7D7D7D',
    },
    loginLink: {
      fontSize: 14,
      color: '#52734D',
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
  });

  export default RegisterScreen;
