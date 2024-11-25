import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Main } from "../components/Main";

import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

if (Platform.OS === "android") {
  Notifications.setNotificationChannelAsync("default", {
    name: "default",
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: "#FF231F7C",
  });
}

export default function Index() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
