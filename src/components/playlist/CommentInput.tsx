import { useWS } from "@/context/WSContext";
import { useAuthStore } from "@/store/authStore";
import { interactionStyles } from "@/styles/interactionStyles";
import { Colors } from "@/utils/Constants";
import useKeyboardOffsetHeight from "@/utils/useKeyboardOffsetHeight";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { FC, useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  initialValue: {
    _id: string;
  };
}

const CommentInput: FC<Props> = ({ initialValue }) => {
  const keyBoardOffsetHeight = useKeyboardOffsetHeight();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState("");

  const socketService = useWS();
  const { user } = useAuthStore();

  useEffect(() => {
    const keyboardLift =
      Platform.OS === "ios"
        ? -keyBoardOffsetHeight
        : -keyBoardOffsetHeight * 1.04;
    Animated.timing(animatedValue, {
      toValue: keyBoardOffsetHeight === 0 ? 0 : keyboardLift,
      duration: 400,
      useNativeDriver: true,
    }).start();
  }, [keyBoardOffsetHeight]);

  const handleSendComment = () => {
    const cleanComment = value.trim();
    if (!cleanComment) return;

    socketService.emit("new-comment", {
      playId: initialValue._id,
      comment: cleanComment,
    });

    setValue("");
  };

  return (
    <Animated.View
      style={[
        interactionStyles.inputContainer,
        { transform: [{ translateY: animatedValue }] },
      ]}
    >
      <Image source={{ uri: user?.picture }} style={interactionStyles.avatar} />

      <TextInput
        placeholder="Write here...."
        textAlignVertical="top"
        placeholderTextColor="#666"
        style={interactionStyles.input}
        multiline
        maxLength={120}
        value={value}
        onChangeText={setValue}
      />

      <TouchableOpacity onPress={handleSendComment}>
        <MaterialIcons name="send" size={RFValue(20)} color={Colors.theme} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CommentInput;
