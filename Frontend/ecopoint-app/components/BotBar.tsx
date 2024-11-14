import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { router } from "expo-router";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function BotBar() {
  return (
    <View style={styles.navigationBar}>
      <>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="home" size={24} color="green" />
          <Text style={styles.navText}>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="lightbulb" size={24} color="gray" />
          <Text style={styles.navText}>Consejos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="gift" size={24} color="gray" />
          <Text style={styles.navText}>Recompensas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/comentarios")}
        >
          <FontAwesome5 name="users" size={24} color="gray" />
          <Text style={styles.navText}>comentarios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <FontAwesome5 name="map" size={24} color="gray" />
          <Text style={styles.navText}>Recorrido</Text>
        </TouchableOpacity>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: "gray",
  },
});
