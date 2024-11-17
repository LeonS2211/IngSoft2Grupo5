import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import useCommunityViewModel from "../ViewModel/rankingViewModel";
import BotBar from "../components/BotBar";

const CommunityRankingScreen = () => {
  const { users, currentUser, currentUserRank, isLoading, errorMessage } =
    useCommunityViewModel();

  if (isLoading) {
    return <ActivityIndicator size="large" color="#4CAF50" />;
  }

  if (errorMessage) {
    return <Text style={styles.errorText}>{errorMessage}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.divisionText}>Tabla de Clasificación</Text>
        <Text style={styles.subHeaderText}>¡Compite por el primer lugar !</Text>
      </View>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item, index }) => (
          <View
            style={[
              styles.userContainer,
              currentUser?.id === item.id && styles.currentUser,
            ]}
          >
            <View style={styles.rankContainer}>
              {index < 3 ? (
                <FontAwesome
                  name="circle"
                  size={24}
                  color={
                    index === 0
                      ? "#FFD701"
                      : index === 1
                        ? "#C0C0C0"
                        : "#CD7F32"
                  }
                />
              ) : (
                <Text style={styles.rankText}>{index + 1}</Text>
              )}
            </View>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
              }}
              style={styles.profileImage}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.nombre}</Text>
              <Text style={styles.userPoints}>{item.puntos} puntos</Text>
            </View>
          </View>
        )}
      />

      {/* Si el usuario no está entre los Top 10 */}
      {currentUserRank && currentUserRank > 10 && currentUser && (
        <View style={[styles.userContainer, styles.currentUser]}>
          <View style={styles.rankContainer}>
            <Text style={styles.rankText}>{currentUserRank}</Text>
          </View>
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/000000/user-male-circle.png",
            }}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{currentUser.nombre} (Tú)</Text>
            <Text style={styles.userPoints}>{currentUser.puntos} puntos</Text>
          </View>
        </View>
      )}

      <BotBar></BotBar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: "#DDF2DB",
    alignItems: "center",
  },
  divisionText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#606060",
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 14,
    color: "#606060",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    backgroundColor: "#FFF",
    paddingVertical: 10,
    borderRadius: 8,
  },
  infoBox: {
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#606060",
  },
  infoSubText: {
    fontSize: 14,
    color: "red",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  rankContainer: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  rankText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#606060",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  userInfo: {
    flexDirection: "column",
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    color: "#606060",
    fontWeight: "bold",
  },
  userPoints: {
    fontSize: 14,
    color: "#606060",
  },
  footerText: {
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 14,
    color: "#606060",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  currentUser: {
    backgroundColor: "#B3E5FC",
    borderColor: "#0288D1",
    borderWidth: 2,
  },
  youText: {
    fontSize: 14,
    color: "#4CAF50",
    fontStyle: "italic",
  },
});

export default CommunityRankingScreen;
