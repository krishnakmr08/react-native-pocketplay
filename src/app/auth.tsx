import AnimatedButton from "@/components/auth/AnimatedButton";
import AnimatedImage from "@/components/auth/AnimatedImage";
import AnimatedOverlay from "@/components/auth/AnimatedOverlay";
import { useAuthAnimations } from "@/components/auth/animations";
import { useWS } from "@/context/WSContext";
import { commonStyles } from "@/styles/commonStyles";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";

const Page = () => {
  const [isButtonVisible, setButtonVisible] = useState(false);

  const { reconnect } = useWS();

  const {
    startMainAnimation,
    handleTouch,
    shakeAnim,
    overlayOpacity,
    translateYAnim,
    scaleAnim,
    rippleScale,
    rippleAnim,
  } = useAuthAnimations();

  useEffect(() => {
    startMainAnimation(setButtonVisible);
  }, []);

  return (
    <View style={commonStyles.container}>
      <AnimatedImage shakeAnim={shakeAnim} />
      <AnimatedOverlay overlayOpacity={overlayOpacity} />

      {isButtonVisible && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => handleTouch(reconnect)}
          style={commonStyles.center}
        >
          <AnimatedButton
            translateYAnim={translateYAnim}
            scaleAnim={scaleAnim}
            rippleScale={rippleScale}
            rippleAnim={rippleAnim}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Page;
