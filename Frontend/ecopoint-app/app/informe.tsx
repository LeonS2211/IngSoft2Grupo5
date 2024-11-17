import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import useInformeViewModel from "../ViewModel/InformeViewModel";

const InformeView = () => {
  const {
    adminName,
    isLoading,
    userEmail,
    userDetails,
    amigos,
    puntosReciclaje,
    setUserEmail,
    handleUserSearch,
    formatDate,
  } = useInformeViewModel();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#52734D" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>
        Bienvenido Administrador{adminName ? `, ${adminName}` : ""}
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese el correo electrónico del usuario"
        value={userEmail}
        onChangeText={setUserEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity
        style={styles.informeButton}
        onPress={handleUserSearch}
        disabled={userEmail === ""}
      >
        <Text style={styles.buttonText}>Informe sobre Usuario</Text>
      </TouchableOpacity>

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
              {userDetails.createdAt
                ? formatDate(userDetails.createdAt)
                : "N/A"}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Última Actividad:</Text>
            <Text style={styles.detailValue}>
              {userDetails.updatedAt
                ? formatDate(userDetails.updatedAt)
                : "N/A"}
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
            <Text style={styles.detailValue}>{amigos.length}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>
              Puntos de Reciclaje Escaneados:
            </Text>
            <Text style={styles.detailValue}>{puntosReciclaje.length}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

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
  },
  informeButton: {
    width: "80%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#52734D",
    alignItems: "center",
    marginVertical: 20,
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

export default InformeView;
