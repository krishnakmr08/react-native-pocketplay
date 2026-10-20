
import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    position: "absolute",
  },

  googleIcon: {
    width: 40,
    height: 40,
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
});
