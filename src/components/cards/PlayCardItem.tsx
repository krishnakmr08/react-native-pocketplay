import { cardStyles } from "@/styles/cardStyles";
import { Play } from "@/types/play";
import { Colors, gradientColors } from "@/utils/Constants";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { FC } from "react";
import { Image, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import CustomText from "../ui/CustomText";
import ScalePress from "../ui/ScalePress";

interface PlayCardItemProps {
  item: Play;
}

const PlayCardItem: FC<PlayCardItemProps> = ({ item }) => {
  return (
    <Animated.View entering={FadeInDown.delay(150).duration(1000)}>
      <ScalePress
        onPress={() =>
          router.push({
            pathname: "/playlist",
            params: {
              play: JSON.stringify(item),
            },
          })
        }
      >
        <View style={cardStyles.card}>
          <Image
            source={{ uri: item.thumbnail_url }}
            style={cardStyles.image}
          />

          <View style={cardStyles.overlay}>
            <MaterialIcons name="star" size={12} color={Colors.text} />

            <CustomText fontFamily="Medium" variant="h8">
              {item.rating}
            </CustomText>
          </View>

          <View style={cardStyles.textContainer}>
            <CustomText fontFamily="Medium" variant="h7" numberOfLines={1}>
              {item.title}
            </CustomText>

            <CustomText fontFamily="Light" variant="h8" numberOfLines={1}>
              {item.genre}
            </CustomText>
          </View>

          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
          />
        </View>
      </ScalePress>
    </Animated.View>
  );
};

export default PlayCardItem;
