import { useWS } from "@/context/WSContext";
import { interactionStyles } from "@/styles/interactionStyles";

import { Colors } from "@/utils/Constants";
import { formatCount } from "@/utils/Helpers";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "../ui/CustomText";

const LikeCount = ({ initialValue, setInitialValue }: any) => {
  const socketService = useWS();

  useEffect(() => {
    const handleLikesUpdate = ({
      playId,
      likes,
    }: {
      playId: string;
      likes: number;
    }) => {
      if (playId === initialValue._id) {
        setInitialValue?.((prev: any) => (prev ? { ...prev, likes } : prev));
      }
    };

    socketService.on("stream-likes", handleLikesUpdate);

    return () => {
      socketService.off("stream-likes", handleLikesUpdate);
    };
  }, [socketService, setInitialValue, initialValue._id]);

  const handleLikePress = () => {
    if (!initialValue || initialValue.is_liked) return;

    setInitialValue?.((prev: any) =>
      prev ? { ...prev, likes: prev.likes + 1, is_liked: true } : prev,
    );

    socketService.emit("like-play", { playId: initialValue._id });
  };

  return (
    <TouchableOpacity
      style={interactionStyles.buttonContainer}
      onPress={handleLikePress}
    >
      <MaterialCommunityIcons
        name={initialValue.is_liked ? "thumb-up" : "thumb-up-outline"}
        size={RFValue(14)}
        color={Colors.text}
      />
      <CustomText variant="h8" fontFamily="SemiBold">
        {formatCount(initialValue.likes)} Likes
      </CustomText>
    </TouchableOpacity>
  );
};

export default LikeCount;
