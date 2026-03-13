import { Dimensions } from "react-native";

export const screenHeight = Dimensions.get("screen").height;

export const screenWidth = Dimensions.get("screen").width;

export enum Colors {
  primary = "#1A1B28",
  secondary = "#222222",
  tertiary = "#191A1F",
  text = "#FFFFFF",
  theme = "#CF551F",
}

export const topGradientColors = [
  "rgba(0, 0, 0, 0.9)",
  "rgba(0, 0, 0, 0.1)",
  "rgba(0, 0, 0, 0.1)",
] as const;

export const bottomGradientColors = [
  "rgba(0, 0, 0, 0.1)",
  "rgba(0, 0, 0, 0.1)",
  "rgba(0, 0, 0, 0.9)",
] as const;
