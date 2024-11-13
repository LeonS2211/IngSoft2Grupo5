import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";

export default function BotBar() {
  const router = useRouter(); // Navigation
  const pathname = usePathname(); // Get the current route

  // Helper function to determine if a tab is active
  const isActive = (route: string) => pathname === route;

  return (
    <View style={styles.navigationBar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/mainmenu")}
      >
        <FontAwesome5
          name="home"
          size={24}
          color={isActive("/mainmenu") ? "green" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("/mainmenu") ? "green" : "gray" },
          ]}
        >
          Inicio
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/consejos")}
      >
        <FontAwesome5
          name="lightbulb"
          size={24}
          color={isActive("/consejos") ? "green" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("/consejos") ? "green" : "gray" },
          ]}
        >
          Consejos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/recompensas")}
      >
        <FontAwesome5
          name="gift"
          size={24}
          color={isActive("/recompensas") ? "green" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("/recompensas") ? "green" : "gray" },
          ]}
        >
          Recompensas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/comunidad")}
      >
        <FontAwesome5
          name="users"
          size={24}
          color={isActive("/comunidad") ? "green" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("/comunidad") ? "green" : "gray" },
          ]}
        >
          Comunidad
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/ranking")}
      >
        <FontAwesome5
          name="trophy"
          size={24}
          color={isActive("/ranking") ? "green" : "gray"}
        />
        <Text
          style={[
            styles.navText,
            { color: isActive("/ranking") ? "green" : "gray" },
          ]}
        >
          Ranking
        </Text>
      </TouchableOpacity>
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
