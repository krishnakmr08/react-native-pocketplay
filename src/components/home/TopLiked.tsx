import { usePlayStore } from "@/store/playStore";
import { cardStyles } from "@/styles/cardStyles";
import React from "react";
import { FlatList, View } from "react-native";
import PlayCardItem from "../cards/PlayCardItem";
import Heading from "../ui/Heading";

const TopLiked = () => {
  const { topLiked } = usePlayStore();

  return (
    <View style={cardStyles.container}>
      <Heading title="Top Liked" seeAll />
      <FlatList
        horizontal
        data={topLiked}
        windowSize={4}
        initialNumToRender={4}
        renderItem={({ item }) => <PlayCardItem item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default TopLiked;
