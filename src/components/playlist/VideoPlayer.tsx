import { VIDEO_URL } from "@/service/config";
import { Play } from "@/store/playStore";
import { interactionStyles } from "@/styles/interactionStyles";
import { Colors } from "@/utils/Constants";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { FC, useRef, useState } from "react";
import { Image, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import Video from "react-native-video";
import ScalePress from "../ui/ScalePress";

const VideoPlayer: FC<{ item: Play }> = ({ item }) => {
  const videoRef = useRef<any>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleReadyForDisplay = () => {
    setIsLoaded(true);
    setIsPaused(false);
  };

  return (
    <View style={interactionStyles.videoContainer}>
      <Video
        ref={videoRef}
        style={interactionStyles.video}
        repeat
        source={{
          uri: VIDEO_URL,
        }}
        paused={isPaused}
        controls={true}
        resizeMode="cover"
        onReadyForDisplay={handleReadyForDisplay}
      />

      {!isLoaded && (
        <Image
          source={{ uri: item?.thumbnail_url }}
          style={interactionStyles.imageOverlay}
        />
      )}

      {isPaused && (
        <ScalePress
          style={interactionStyles.playIcon}
          onPress={() => setIsPaused(false)}
        >
          <Ionicons
            name="play-circle"
            size={RFValue(60)}
            color={Colors.theme}
          />
        </ScalePress>
      )}
    </View>
  );
};

export default VideoPlayer;
