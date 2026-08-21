import { useWS } from "@/context/WSContext";
import { interactionStyles } from "@/styles/interactionStyles";
import { PlayInteraction } from "@/types/play";
import { Colors } from "@/utils/Constants";
import { formatCount } from "@/utils/Helpers";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { Dispatch, FC, memo, SetStateAction, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "../ui/CustomText";

interface LikeCountProps {
  initialValue: PlayInteraction;
  setInitialValue: Dispatch<SetStateAction<PlayInteraction | null>>;
}

const LikeCount: FC<LikeCountProps> = ({ initialValue, setInitialValue }) => {
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
        setInitialValue((prev) => (prev ? { ...prev, likes } : prev));
      }
    };

    socketService.on("stream-likes", handleLikesUpdate);

    return () => {
      socketService.off("stream-likes", handleLikesUpdate);
    };
  }, [socketService, setInitialValue, initialValue._id]);

  const handleLikePress = () => {
    if (initialValue.is_liked) return;

    setInitialValue((prev) =>
      prev
        ? {
            ...prev,
            likes: prev.likes + 1,
            is_liked: true,
          }
        : prev,
    );

    socketService.emit("like-play", {
      playId: initialValue._id,
    });
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

export default memo(LikeCount);
