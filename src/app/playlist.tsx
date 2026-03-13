import Interactions from "@/components/playlist/Interactions";
import PlaylistHeader from "@/components/playlist/PlaylistHeader";
import VideoPlayer from "@/components/playlist/VideoPlayer";

import { Play } from "@/store/playStore";
import { commonStyles } from "@/styles/commonStyles";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Page = () => {
  const route = useRoute() as any;
  const item = route?.params as Play;

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
