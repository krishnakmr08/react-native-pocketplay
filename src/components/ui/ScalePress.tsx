import React, { FC, ReactNode, useRef } from "react";
import { Animated, TouchableOpacity, ViewStyle } from "react-native";

interface ScalePressProps {
  onPress?: () => void;
  children: ReactNode;
  style?: ViewStyle;
}

const ScalePress: FC<ScalePressProps> = ({ onPress, children, style }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.92,
      speed: 20,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      speed: 20,
      bounciness: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={style}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
          width: "100%",
        }}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default ScalePress;
