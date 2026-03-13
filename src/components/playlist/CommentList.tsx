import { commonStyles } from "@/styles/commonStyles";
import { interactionStyles } from "@/styles/interactionStyles";

import { Colors } from "@/utils/Constants";
import { timeAgo } from "@/utils/Helpers";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC } from "react";
import { FlatList, Image, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "../ui/CustomText";

const CommentList = ({ initialValue }: any) => {
  
  const renderComments = ({ item }: { item: any }) => (
    <Animated.View
      entering={FadeInLeft.duration(800)}
      style={[commonStyles.rowBetween, interactionStyles.item]}
    >
      <View style={commonStyles.rowGap}>
        <Image
          source={{ uri: item?.user?.picture }}
          style={interactionStyles.avatar}
        />
        <View>
          <CustomText
            variant="h8"
            fontFamily="SemiBold"
            style={interactionStyles.username}
          >
            @{item.user?.username} • {timeAgo(item.timestamp)}
          </CustomText>
          <CustomText variant="h7" fontFamily="SemiBold">
            {item.comment}
          </CustomText>
        </View>
      </View>

      <Ionicons
        name="ellipsis-vertical"
        size={RFValue(12)}
        color={Colors.text}
      />
    </Animated.View>
  );

  return (
    <View style={interactionStyles.commentContainer}>
      <FlatList
        data={initialValue?.comments ?? []}
        renderItem={renderComments}
        inverted
        keyExtractor={(item) => item._id}
        windowSize={4}
        initialNumToRender={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={interactionStyles.bottomPadding}
        ListEmptyComponent={
          <View style={interactionStyles.emptyContainer}>
            <CustomText style={interactionStyles.center}>
              No comments yet — be the first to say something!
            </CustomText>
          </View>
        }
      />
    </View>
  );
};

export default CommentList;
