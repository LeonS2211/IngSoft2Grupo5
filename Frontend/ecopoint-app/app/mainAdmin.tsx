import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MainAdmin: React.FC = () => {
  const router = useRouter(); // Hook para la navegación
  const [adminName, setAdminName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

      {/* Botón para agregar un punto de reciclaje*/}
      <TouchableOpacity
        style={styles.informeButton}
        onPress={() => router.push("/crearPR")}
      >
        <Text style={styles.buttonText}>Crear punto de reciclaje</Text>
      </TouchableOpacity>
      
      {/* Botón para consultar sugerencias de puntos de reciclaje*/}
      <TouchableOpacity
        style={styles.informeButton}
        onPress={() => router.push("/mirarSugerencias")}
      >
        <Text style={styles.buttonText}>
          consultar sugerencias de puntos de reciclaje
        </Text>
      </TouchableOpacity>
      
      {/* Botón para gestion de comunidad*/}
      <TouchableOpacity
        style={styles.informeButton}
        onPress={() => router.push("/gestionarComunidad")}
      >
        <Text style={styles.buttonText}>Gestionar comunidad</Text>
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
    justifyContent: "center", // Centra el contenido verticalmente
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
    textAlign: "center", // Centra el texto horizontalmente
  },
});

export default MainAdmin;
