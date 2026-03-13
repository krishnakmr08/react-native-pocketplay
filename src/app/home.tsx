import Featured from "@/components/home/Featured";
import HomeHeader from "@/components/home/HomeHeader";
import MostStarred from "@/components/home/MostStarred";
import TopLiked from "@/components/home/TopLiked";
import TopRated from "@/components/home/TopRated";
import { usePlayStore } from "@/store/playStore";
import { commonStyles } from "@/styles/commonStyles";
import { homeStyles } from "@/styles/homeStyles";
import React, { useEffect, useRef } from "react";
import { Image, Platform, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  const { fetchPlayData } = usePlayStore();

  const Container = Platform.OS === "android" ? SafeAreaView : View;

  const scrollY = useSharedValue(0);

  const scrollRef = useRef<Animated.ScrollView | null>(null);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const animatedHeaderStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 120], [0, 1], "clamp");

    return {
      opacity,
    };
  });

  useEffect(() => {
    fetchPlayData();
  }, []);

  return (
    <Container style={commonStyles.darkContainer}>
      <View style={commonStyles.darkContainer}>
        <Animated.View style={homeStyles.animatedHeader}>
          <Animated.View
            style={[homeStyles.glassmorphismContainer, animatedHeaderStyle]}
          >
            <Image
              source={require("@/assets/icons/header1.jpeg")}
              style={homeStyles.glassmorphismBackground}
            />
          </Animated.View>

          <HomeHeader />
        </Animated.View>

        <Animated.ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={homeStyles.scrollContainer}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <Featured />
          <TopLiked />
          <MostStarred />
          <TopRated scrollRef={scrollRef} />
        </Animated.ScrollView>
      </View>
    </Container>
  );
};

export default Page;
