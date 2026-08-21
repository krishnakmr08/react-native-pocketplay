import Interactions from "@/components/playlist/Interactions";
import PlaylistHeader from "@/components/playlist/PlaylistHeader";
import VideoPlayer from "@/components/playlist/VideoPlayer";
import { commonStyles } from "@/styles/commonStyles";
import { Play } from "@/types/play";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  const { play } = useLocalSearchParams<{
    play: string;
  }>();

  if (!play) {
    return null;
  }

  let item: Play;

  try {
    item = JSON.parse(play) as Play;
  } catch {
    return null;
  }

  const Container = Platform.OS === "android" ? SafeAreaView : View;

  return (
    <Container style={commonStyles.darkContainer}>
      <View style={commonStyles.darkContainer}>
        <PlaylistHeader title={item.title} genre={item.genre} />

        <VideoPlayer item={item} />

        <Interactions item={item} />
      </View>
    </Container>
  );
};

export default Page;
