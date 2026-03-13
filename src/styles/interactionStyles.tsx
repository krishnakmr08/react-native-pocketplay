import { Platform, StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors, screenHeight } from "../utils/Constants";

const MEDIA_HEIGHT = screenHeight * 0.24;

export const interactionStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000",
  },

  commentContainer: {
    marginTop: 10,
  },

  item: {
    marginVertical: 5,
    paddingVertical: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#222",
  },

  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    resizeMode: "cover",
    borderWidth: 1,
    borderColor: Colors.text,
  },

  username: {
    opacity: 0.5,
  },

  bottomPadding: {
    paddingTop: 120,
  },

  emptyContainer: {
    height: screenHeight * 0.3,
    alignItems: "center",
    justifyContent: "center",
  },

  center: {
    textAlign: "center",
  },

  inputContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    zIndex: 99,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",

    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: Platform.OS === "ios" ? 20 : 6,

    backgroundColor: Colors.tertiary,
    borderTopWidth: 1,
    borderTopColor: Colors.secondary,
  },

  input: {
    width: "80%",
    minHeight: 40,
    maxHeight: 120,

    padding: 10,
    borderRadius: 10,

    backgroundColor: Colors.secondary,
    color: Colors.text,
    fontFamily: "Poppins-Regular",
    fontSize: RFValue(12),
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#222",
  },

  videoContainer: {
    width: "100%",
    height: MEDIA_HEIGHT,
    marginTop: 10,
    overflow: "hidden",
  },

  video: {
    width: "100%",
    height: MEDIA_HEIGHT,
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },

  playIcon: {
    position: "absolute",
    alignSelf: "center",
    bottom: "32%",
    zIndex: 2,

    elevation: 5,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
});
