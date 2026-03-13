import { usePlayStore } from "@/store/playStore";
import { commonStyles } from "@/styles/commonStyles";
import { featuredStyles } from "@/styles/featuredStyles";
import {
  bottomGradientColors,
  Colors,
  topGradientColors,
} from "@/utils/Constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { FC } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import CustomText from "../ui/CustomText";
import LiveStatus from "./LiveStatus";

const Featured: FC = () => {
  const { live } = usePlayStore();

  const item = live?.[0] ?? {};

  return (
    <View style={featuredStyles.featuredContainer}>
      <LinearGradient
        colors={topGradientColors}
        style={featuredStyles.gradient}
      />
      <View style={featuredStyles.featuredImageContainer}>
        {item?.thumbnail_url && (
          <Image
            source={{ uri: item?.thumbnail_url }}
            style={featuredStyles.featuredImage}
          />
        )}
      </View>
      <View style={featuredStyles.textContainer}>
        <CustomText fontFamily="Medium" variant="h3">
          {item.title}
        </CustomText>
        <CustomText fontFamily="Light">{item?.genre}</CustomText>

        <View style={commonStyles.rowGap}>
          <TouchableOpacity
            style={featuredStyles.playContainer}
            onPress={() =>
              router.push({
                pathname: "/playlist",
                params: item as any,
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
      <LinearGradient
        colors={bottomGradientColors}
        style={featuredStyles.gradient}
      />
    </View>
  );
};

export default Featured;
