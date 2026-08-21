import { commonStyles } from "@/styles/commonStyles";
import { homeStyles } from "@/styles/homeStyles";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

const LiveStatus = () => {
  const rippleAnim = useRef(new Animated.Value(0)).current;

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 3],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(rippleAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  return (
    <View style={commonStyles.liveCenter}>
      <View style={homeStyles.redDot} />
      <Animated.View
        style={{
          ...homeStyles.spreadCircle,
          transform: [{ scale: rippleScale }],
          opacity: rippleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0.5, 0],
          }),
        }}
      />
    </View>
  );
};

export default React.memo(LiveStatus);
