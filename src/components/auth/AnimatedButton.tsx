import { authStyles } from "@/styles/authStyles";
import React from "react";
import { Animated, Image } from "react-native";

interface Props {
  translateYAnim: Animated.Value;
  scaleAnim: Animated.Value;
  rippleScale: Animated.AnimatedInterpolation<number>;
  rippleAnim: Animated.Value;
}

const AnimatedButton = ({
  translateYAnim,
  scaleAnim,
  rippleScale,
  rippleAnim,
}: Props) => {
  return (
    <>
      <Animated.View
        style={{
          shadowOpacity: 0.9,
          shadowRadius: 20,
          shadowColor: "#FFFFFF",
          shadowOffset: { width: 0, height: 0 },
          transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
        }}
      >
        <Image
          source={require("@/assets/icons/google.png")}
          style={authStyles.googleIcon}
        />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          borderWidth: 2,
          borderRadius: 50,
          width: 100,
          height: 100,
          borderColor: "#FFFFFF",
          transform: [{ translateY: translateYAnim }, { scale: rippleScale }],
          opacity: rippleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 0],
          }),
        }}
      />
    </>
  );
};

export default AnimatedButton;
