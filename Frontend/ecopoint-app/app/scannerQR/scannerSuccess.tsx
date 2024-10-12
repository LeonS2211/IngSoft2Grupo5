import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ScannerSuccess() {
  return (
    <View style={styles.container}>
      <Text style={styles.successText}>¡Código QR validado con éxito!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
  },
});
