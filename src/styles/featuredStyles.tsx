import { StyleSheet } from "react-native";
import { Colors, screenHeight } from "../utils/Constants";

export const featuredStyles = StyleSheet.create({
  featuredContainer: {
    height: screenHeight * 0.45,
    overflow: "hidden",
  },

  featuredImageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },

  textContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    zIndex: 2,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },

  playContainer: {
    marginTop: 10,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 100,
    backgroundColor: Colors.theme,
  },
});
