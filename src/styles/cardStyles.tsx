import { StyleSheet } from "react-native";
import { Colors, screenHeight, screenWidth } from "../utils/Constants";

export const cardStyles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 5,
  },

  card: {
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    height: screenHeight * 0.25,
    width: screenWidth * 0.35,
    backgroundColor: "#000",
  },

  image: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },

  overlay: {
    position: "absolute",
    top: 5,
    right: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.theme,
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },

  textContainer: {
    position: "absolute",
    left: 6,
    bottom: 10,
    zIndex: 2,
  },

  footer: {
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
    opacity: 0.4,
  },

  hyperLink: {
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
