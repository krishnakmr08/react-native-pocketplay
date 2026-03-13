import { useWS } from "@/context/WSContext";
import { Colors } from "@/utils/Constants";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CustomText from "../ui/CustomText";

interface Props {
  initialValue: {
    _id: string;
  };
}

const LiveReactions: FC<Props> = ({ initialValue }) => {
  const socketService = useWS();

  const [hearts, setHearts] = useState<any[]>([]);
  const [emojiSelectorVisible, setEmojiSelectorVisible] = useState(false);
  const emojiSelectorHeight = useRef(new Animated.Value(0)).current;
  const [selectedEmoji, setSelectedEmoji] = useState("❤️");

  const addEmoji = useCallback((emoji: string) => {
    const newReaction = {
      id: Date.now() + Math.random(),
      text: emoji,
      position: new Animated.Value(0),
      opacity: new Animated.Value(1),
      translateX: new Animated.Value(Math.random() * 80 - 40),
      rotate: new Animated.Value(Math.random() * 60 - 20),
    };

    setHearts((prev) => [...prev, newReaction]);

    Animated.parallel([
      Animated.timing(newReaction.position, {
        toValue: -200,
        duration: 2000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(newReaction.opacity, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newReaction.id));
    });
  }, []);

  useEffect(() => {
    const handleReaction = (reactionData: { emoji: string }) => {
      addEmoji(reactionData.emoji);
    };

    socketService.on("stream-reactions", handleReaction);

    return () => {
      socketService.off("stream-reactions", handleReaction);
    };
  }, [socketService, addEmoji]);

  const sendReaction = (emoji: string) => {
    if (!initialValue?._id) return;

    socketService.emit("send-reaction", {
      playId: initialValue._id,
      reaction: emoji,
    });
  };

  const openSelector = () => {
    setEmojiSelectorVisible(true);
    Animated.timing(emojiSelectorHeight, {
      toValue: 250,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeSelector = () => {
    Animated.timing(emojiSelectorHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => setEmojiSelectorVisible(false));
  };

  const emojiData = ["😇", "🗿", "🥰", "😳", "🔥", "❤️", "😜", "😭", "😴"];

  return (
    <TouchableWithoutFeedback onPress={closeSelector}>
      <View style={styles.container}>
        {hearts.map((heart) => (
          <Animated.View
            key={heart.id}
            style={[
              styles.heart,
              {
                transform: [
                  { translateY: heart.position },
                  { translateX: heart.translateX },
                  {
                    rotate: heart.rotate.interpolate({
                      inputRange: [-30, 30],
                      outputRange: ["-30deg", "30deg"],
                    }),
                  },
                ],
                opacity: heart.opacity,
              },
            ]}
          >
            <Text style={styles.emoji}>{heart.text}</Text>
          </Animated.View>
        ))}

        {emojiSelectorVisible && (
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.emojiSelector, { maxHeight: emojiSelectorHeight }]}
          >
            {emojiData.map((emoji) => (
              <TouchableOpacity
                key={emoji}
                onPress={() => {
                  setSelectedEmoji(emoji);
                  sendReaction(emoji);
                  closeSelector();
                }}
              >
                <CustomText variant="h6" style={styles.emojiItem}>
                  {emoji}
                </CustomText>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
        )}

        <TouchableOpacity
          onLongPress={openSelector}
          onPress={() => sendReaction(selectedEmoji)}
          style={styles.heartIconContainer}
        >
          <CustomText variant="h3">{selectedEmoji}</CustomText>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 10,
    alignItems: "center",
  },
  heartIconContainer: {
    borderRadius: 100,
    borderWidth: 1,
    width: 50,
    height: 50,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  heart: {
    position: "absolute",
    bottom: 50,
    right: 20,
  },
  emoji: {
    fontSize: 24,
  },
  emojiSelector: {
    position: "absolute",
    bottom: 60,
    right: 6,
    width: 40,
    backgroundColor: Colors.secondary,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.secondary,
    overflow: "hidden",
  },
  emojiItem: {
    paddingVertical: 5,
    textAlign: "center",
  },
});

export default LiveReactions;
