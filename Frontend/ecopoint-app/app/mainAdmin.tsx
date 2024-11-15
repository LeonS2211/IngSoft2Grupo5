import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario"; // Importa la API de usuario

const MainAdmin: React.FC = () => {
  const router = useRouter(); // Hook para la navegación
  const [adminName, setAdminName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string>("");
  const [userDetails, setUserDetails] = useState<any | null>(null);

  // Obtener el nombre del administrador al cargar la pantalla
  useEffect(() => {
    const fetchAdminName = async () => {
      try {
        // Obtener los datos del administrador del almacenamiento local
        const adminData = await AsyncStorage.getItem("adminToken");
        if (adminData) {
          const parsedData = JSON.parse(adminData);
          setAdminName(parsedData.nombre); // Suponiendo que 'nombre' está en el token
        }
      } catch (error) {
        console.error("Error al obtener los datos del administrador:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminName();
  }, []);

  // Manejar la búsqueda del usuario por ID

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#52734D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Mensaje de bienvenida */}
      <Text style={styles.title}>
        Bienvenido Administrador{adminName ? `, ${adminName}` : ""}
      </Text>

      {/* Botón para ver el informe sobre usuario */}
      <TouchableOpacity
        style={styles.informeButton}
        onPress={() => router.push("/informe")}
      >
        <Text style={styles.buttonText}>Informe sobre Usuario</Text>
      </TouchableOpacity>

      {/* Botón para ver los comentarios */}
      <TouchableOpacity
        style={styles.informeButton}
        onPress={() => router.push("/comentarios")}
      >
        <Text style={styles.buttonText}>Gestion de soporte</Text>
      </TouchableOpacity>

      {/* Mostrar los detalles del usuario si se encontraron */}
      {userDetails && (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.userDetailsTitle}>Detalles del Usuario:</Text>
          <Text>Nombre: {userDetails.nombre}</Text>
          <Text>Email: {userDetails.email}</Text>
          <Text>Puntos: {userDetails.puntos}</Text>
          {/* Añade cualquier otra información relevante del usuario */}
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
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
    width: "80%",
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
  informeButton: {
    width: "80%",
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
  userDetailsContainer: {
    marginTop: 30,
    width: "80%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  userDetailsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333333",
  },
});

export default MainAdmin;
