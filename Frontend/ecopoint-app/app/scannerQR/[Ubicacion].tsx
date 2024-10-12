import React from "react";
import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ScannerQR() {
  const { Ubicacion } = useLocalSearchParams();
  return (
    <View>
      <Text>{Ubicacion}</Text>
    </View>
  );
}
