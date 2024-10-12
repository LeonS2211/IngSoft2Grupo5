import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Main } from "../components/Main";

export default function Index() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}
