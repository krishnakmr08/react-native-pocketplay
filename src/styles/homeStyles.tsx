import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 150,
    width: "100%",
  },

  animatedHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },

  glassmorphismContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  glassmorphismBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#111",
  },

  spreadCircle: {
    position: "absolute",
    alignSelf: "center",
    width: 20,
    height: 20,
    borderRadius: 30,
    borderColor: "red",
    borderWidth: 2,
  },

  redDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "red",
    shadowColor: "red",
    shadowOpacity: 0.9,
    shadowOffset: { width: 0, height: 0 },
  },
});
