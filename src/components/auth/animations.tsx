import { login, signInWithGoogle } from "@/service/authService";
import { screenHeight } from "@/utils/Constants";
import { resetAndNavigate, triggerHaptics } from "@/utils/Helpers";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const useAuthAnimations = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(screenHeight)).current;
  const rippleAnim = useRef(new Animated.Value(0)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const rippleScale = rippleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 3],
  });

  useEffect(() => {
    return () => {
      scaleAnim.stopAnimation();
      rippleAnim.stopAnimation();
      translateYAnim.stopAnimation();
      overlayOpacity.stopAnimation();
      shakeAnim.stopAnimation();
    };
  }, []);

  const startMainAnimation = (setButtonVisible: (v: boolean) => void) => {
    setTimeout(() => {
      setButtonVisible(true);

      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ).start();

      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 2000,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    }, 1000);
  };

  const shakeAnimation = () =>
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 80,
        useNativeDriver: true,
      }),
    ]);

  const resetAnimations = () => {
    shakeAnimation().start(() => {
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const startExitAnimation = () => {
    scaleAnim.stopAnimation();
    Animated.parallel([
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: screenHeight,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      resetAndNavigate("/home");
    });
  };

  const handleTouch = async (updateAccessToken: () => void) => {
    triggerHaptics("SOFT");

    Animated.timing(rippleAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(async () => {
      rippleAnim.setValue(0);

      try {
        const token = await signInWithGoogle();

        if (!token) return resetAnimations();

        const success = await login(token, updateAccessToken);

        success ? startExitAnimation() : resetAnimations();
      } catch {
        resetAnimations();
      }
    });
  };

  return {
    rippleScale,
    scaleAnim,
    rippleAnim,
    translateYAnim,
    overlayOpacity,
    shakeAnim,
    startMainAnimation,
    handleTouch,
  };
};
