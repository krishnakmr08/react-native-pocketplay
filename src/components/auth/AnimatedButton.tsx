import { authStyles } from "@/styles/authStyles";
import React from "react";
import { Animated, Image } from "react-native";

type Props = {
  translateYAnim: Animated.Value;
  scaleAnim: Animated.Value;
  rippleScale: Animated.AnimatedInterpolation<number>;
  rippleAnim: Animated.Value;
};

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
          transform: [{ translateY: translateYAnim }, { scale: scaleAnim }],
          shadowColor: "#fff",
          shadowOpacity: 0.9,
          shadowOffset: { width: 0, height: 0 },
          shadowRadius: 20,
        }}
      >
        <Image
          source={require("@/assets/icons/google.png")}
          style={authStyles.gicon}
        />
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          borderRadius: 50,
          borderColor: "#fff",
          borderWidth: 2,
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
