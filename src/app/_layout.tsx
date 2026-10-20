import { WSProvider } from "@/context/WSContext";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RootLayout = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />

      <WSProvider>
        <Stack screenOptions={{ headerShown: false }}>
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
