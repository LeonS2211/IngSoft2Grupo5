import React, { useEffect, useState } from "react"; 
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UsuariosApi from "../api/usuario"; // Importa la API de usuario

const Informe: React.FC = () => {
  const router = useRouter(); // Hook para la navegación
  const [adminName, setAdminName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>(""); // Cambio a búsqueda por email
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
      }
    };

    fetchAdminName();
  }, []);

  // Manejar la búsqueda del usuario por email
  const handleUserSearch = async () => {
    setIsLoading(true);
    try {
      // Obtener todos los usuarios para filtrar el email
      const response = await UsuariosApi.findAll();
      if (response && response.data) {
        // Buscar el usuario por email dentro de la lista de usuarios
        const foundUser = response.data.find((user) => user.email === userEmail);
        if (foundUser) {
          setUserDetails(foundUser);
        } else {
          Alert.alert("Error", "Usuario no encontrado");
        }
      } else {
        Alert.alert("Error", "No se pudo recuperar la lista de usuarios");
      }
    } catch (error) {
      console.error("Error al buscar el usuario:", error);
      Alert.alert("Error", "No se pudo encontrar al usuario, intenta nuevamente");
    } finally {
      setIsLoading(false);
    }
  };

  // Formatear las fechas al formato deseado "Año-Mes-Día Hora:Minutos"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // El mes es de 0-11, así que sumamos 1 y lo formateamos a dos dígitos
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#52734D" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Mensaje de bienvenida */}
      <Text style={styles.title}>
        Bienvenido Administrador{adminName ? `, ${adminName}` : ""}
      </Text>

      {/* Campo de entrada para buscar un usuario por email */}
      <TextInput
        style={styles.input}
        placeholder="Ingrese el correo electrónico del usuario"
        value={userEmail}
        onChangeText={setUserEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Botón para ver el informe sobre usuario */}
      <TouchableOpacity
        style={styles.informeButton}
        onPress={handleUserSearch}
        disabled={userEmail === ""}
      >
        <Text style={styles.buttonText}>Informe sobre Usuario</Text>
      </TouchableOpacity>

      {/* Mostrar los detalles del usuario si se encontraron */}
      {userDetails && (
        <View style={styles.userDetailsContainer}>
          <Text style={styles.userDetailsTitle}>Detalles del Usuario:</Text>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Nombre:</Text>
            <Text style={styles.detailValue}>{userDetails.nombre}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{userDetails.email}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Puntos:</Text>
            <Text style={styles.detailValue}>{userDetails.puntos}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Fecha de Creación:</Text>
            <Text style={styles.detailValue}>
              {userDetails.createdAt ? formatDate(userDetails.createdAt) : "N/A"}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Última Actividad:</Text>
            <Text style={styles.detailValue}>
              {userDetails.updatedAt ? formatDate(userDetails.updatedAt) : "N/A"}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Recompensas Obtenidas:</Text>
            <Text style={styles.detailValue}>
              {userDetails.recompensasObtenidas?.length ?? 0}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Amigos Registrados:</Text>
            <Text style={styles.detailValue}>{userDetails.amigos?.length ?? 0}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Puntos de Reciclaje Escaneados:</Text>
            <Text style={styles.detailValue}>
              {userDetails.puntosReciclajeEscaneados?.length ?? 0}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    width: "90%",
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#171717",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  userDetailsTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333333",
    textAlign: "center",
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#52734D",
  },
  detailValue: {
    fontSize: 16,
    color: "#333333",
  },
});

export default Informe;
