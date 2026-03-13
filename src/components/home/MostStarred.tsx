import { usePlayStore } from "@/store/playStore";
import { cardStyles } from "@/styles/cardStyles";
import React from "react";
import { FlatList, View } from "react-native";
import PlayCardItem from "../cards/PlayCardItem";
import Heading from "../ui/Heading";

const MostStarred = () => {
  const { topStarred } = usePlayStore();
  return (
    <View style={cardStyles.container}>
      <Heading title="Most Starred" seeAll />
      <FlatList
        horizontal
        windowSize={2}
        initialNumToRender={2}
        data={topStarred}
        renderItem={({ item }) => <PlayCardItem item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MostStarred;
