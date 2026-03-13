import { interactionStyles } from "@/styles/interactionStyles";

import { Colors } from "@/utils/Constants";
import { formatCount } from "@/utils/Helpers";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CustomText from "../ui/CustomText";

const CommentCount = ({ initialValue }: any) => {
  return (
    <TouchableOpacity style={interactionStyles.buttonContainer}>
      <MaterialCommunityIcons
        name="comment-text"
        size={RFValue(14)}
        color={Colors.text}
      />
      <CustomText variant="h8" fontFamily="SemiBold">
        {formatCount(initialValue?.comments.length)} Comments
      </CustomText>
    </TouchableOpacity>
  );
};

export default CommentCount;
