import { Play } from "@/store/playStore";
import { cardStyles } from "@/styles/cardStyles";
import { featuredStyles } from "@/styles/featuredStyles";
import { bottomGradientColors, Colors } from "@/utils/Constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { FC } from "react";
import { Image, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import CustomText from "../ui/CustomText";
import ScalePress from "../ui/ScalePress";

const PlayCardItem: FC<{ item: Play }> = ({ item }) => {
  return (
    <Animated.View entering={FadeInDown.delay(150).duration(1000)}>
      <ScalePress
        onPress={() =>
          router.push({
            pathname: "/playlist",
            params: item as any,
          })
        }
      >
        <View style={cardStyles.card}>
          <Image
            source={{ uri: item?.thumbnail_url }}
            style={cardStyles.image}
          />
          <View style={cardStyles.overlay}>
            <MaterialIcons name="star" size={12} color={Colors.text} />
            <CustomText fontFamily="Medium" variant="h8">
              {item?.rating}
            </CustomText>
          </View>

          <View style={cardStyles.textContainer}>
            <CustomText fontFamily="Medium" variant="h7" numberOfLines={1}>
              {item?.title}
            </CustomText>
            <CustomText fontFamily="Light" variant="h8" numberOfLines={1}>
              {item?.genre}
            </CustomText>
          </View>

          <LinearGradient
            colors={bottomGradientColors}
            style={featuredStyles.gradient}
          />
        </View>
      </ScalePress>
    </Animated.View>
  );
};

export default PlayCardItem;
