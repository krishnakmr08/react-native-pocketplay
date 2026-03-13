import { authStyles } from "@/styles/authStyles";
import React from "react";
import { Animated } from "react-native";

type Props = {
  shakeAnim: Animated.Value;
};

const AnimatedImage = ({ shakeAnim }: Props) => {
  return (
    <Animated.Image
      source={require("@/assets/images/aniverse.png")}
      style={[
        authStyles.image,
        {
          transform: [{ translateX: shakeAnim }],
        },
      ]}
    />
  );
};

export default AnimatedImage;
