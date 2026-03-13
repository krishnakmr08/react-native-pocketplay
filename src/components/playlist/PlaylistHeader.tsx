import { playlistStyles } from "@/styles/playlistStyles";
import { Colors } from "@/utils/Constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router } from "expo-router";
import React, { FC } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import CustomText from "../ui/CustomText";

const PlaylistHeader: FC<{ title: string; genre: string }> = ({
  title,
  genre,
}) => {
  return (
    <View>
      <SafeAreaView />
      <View style={playlistStyles.container}>
        <View style={playlistStyles.rowGap}>
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={Colors.text}
            />
          </TouchableOpacity>

          <View>
            <CustomText fontFamily="Medium" numberOfLines={1}>
              {title}
            </CustomText>
            <CustomText fontFamily="Regular" variant="h8" numberOfLines={1}>
              {genre}
            </CustomText>
          </View>
        </View>

        <TouchableOpacity>
          <Ionicons name="star-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlaylistHeader;
