import { usePlayStore } from "@/store/playStore";
import { commonStyles } from "@/styles/commonStyles";
import { featuredStyles } from "@/styles/featuredStyles";
import { Colors, gradientColors } from "@/utils/Constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { FC } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "../ui/CustomText";
import LiveStatus from "./LiveStatus";

const Featured: FC = () => {
  const { live } = usePlayStore();

  const item = live?.[0];

  if (!item) return null;

  return (
    <View style={featuredStyles.featuredContainer}>
      {/* Featured Image */}
      <View style={featuredStyles.featuredImageContainer}>
        <Image
          source={{ uri: item.thumbnail_url }}
          style={featuredStyles.featuredImage}
        />
      </View>

      {/* Top Gradient */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={featuredStyles.topGradient}
      />

      {/* Content */}
      <View style={featuredStyles.textContainer}>
        <CustomText fontFamily="Medium" variant="h3">
          {item.title}
        </CustomText>

        <CustomText fontFamily="Light">{item.genre}</CustomText>

        <View style={commonStyles.rowGap}>
          <TouchableOpacity
            style={featuredStyles.playContainer}
            onPress={() =>
              router.push({
                pathname: "/playlist",
                params: {
                  play: JSON.stringify(item),
                },
              })
            }
          >
            <Ionicons name="play-circle" size={24} color={Colors.text} />

            <CustomText fontFamily="Medium" variant="h6">
              Play
            </CustomText>
          </TouchableOpacity>

          <LiveStatus />
        </View>
      </View>

      {/* Bottom Gradient */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={featuredStyles.bottomGradient}
      />
    </View>
  );
};

export default Featured;
