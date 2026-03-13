import { StyleSheet } from "react-native";
import { Colors } from "../utils/Constants";

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: Colors.tertiary,
  },
  rowBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  liveCenter: {
    alignItems: "center",
    justifyContent: "center",
    top: 3,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
