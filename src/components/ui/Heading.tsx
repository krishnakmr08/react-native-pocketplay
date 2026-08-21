import { Colors } from "@/utils/Constants";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import CustomText from "./CustomText";

const Heading: FC<{ title: string; seeAll: boolean }> = ({ title, seeAll }) => {
  return (
    <View style={styles.container}>
      <CustomText variant="h5" fontFamily="Medium">
        {title}
      </CustomText>
      {seeAll && (
        <CustomText fontFamily="SemiBold" style={styles.seeAll}>
          See All
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAll: {
    color: Colors.theme,
  },
});
export default Heading;
