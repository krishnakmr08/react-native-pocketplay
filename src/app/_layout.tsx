import { WSProvider } from "@/context/WSContext";
import { Colors } from "@/utils/Constants";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <StatusBar
        style="light"
        backgroundColor={Colors.tertiary}
        translucent={false}
      />
      <WSProvider>
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen
            name="auth"
            options={{
              animation: "fade",
              animationDuration: 1000,
              animationTypeForReplace: "push",
            }}
          />
          <Stack.Screen
            name="home"
            options={{
              animation: "fade",
              animationDuration: 1000,
              animationTypeForReplace: "push",
            }}
          />
          <Stack.Screen name="playlist" />
        </Stack>
      </WSProvider>
    </SafeAreaProvider>
  );
};

export default RootLayout;
