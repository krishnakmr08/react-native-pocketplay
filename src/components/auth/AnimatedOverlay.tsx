import { authStyles } from "@/styles/authStyles";
import React from "react";
import { Animated } from "react-native";

type Props = {
  overlayOpacity: Animated.Value;
};

const AnimatedOverlay = ({ overlayOpacity }: Props) => {
  return (
    <Animated.View
      pointerEvents="none"
      style={[
        authStyles.overlay,
        {
          opacity: overlayOpacity,
        },
      ]}
    />
  );
};

export default AnimatedOverlay;
