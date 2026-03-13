import { usePlayStore } from "@/store/playStore";
import { cardStyles } from "@/styles/cardStyles";
import React, { FC } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import PlayCardItem from "../cards/PlayCardItem";
import CustomText from "../ui/CustomText";
import Heading from "../ui/Heading";

const TopRated: FC<{ scrollRef: any }> = ({ scrollRef }) => {
  const { topRated } = usePlayStore();

  const handleScrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };
  return (
    <View style={cardStyles.container}>
      <Heading title="Top Rated" seeAll />
      <FlatList
        horizontal
        windowSize={2}
        initialNumToRender={2}
        data={topRated}
        renderItem={({ item }) => <PlayCardItem item={item} />}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ marginTop: 20 }}
        showsHorizontalScrollIndicator={false}
      />

      <View style={cardStyles.footer}>
        <CustomText variant="h5">PocketPlay x Krishna</CustomText>
        <CustomText variant="h2" fontFamily="SemiBold">
          Made with ❤️
        </CustomText>
        <TouchableOpacity onPress={handleScrollToTop}>
          <CustomText
            variant="h8"
            fontFamily="SemiBold"
            style={cardStyles.hyperLink}
          >
            Back to top
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopRated;
