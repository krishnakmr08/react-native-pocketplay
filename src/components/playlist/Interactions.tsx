import { useWS } from "@/context/WSContext";
import { Play } from "@/store/playStore";
import { commonStyles } from "@/styles/commonStyles";
import { interactionStyles } from "@/styles/interactionStyles";

import React, { FC, memo, useEffect, useState } from "react";
import { View } from "react-native";
import CommentCount from "./CommentCount";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import LikeCount from "./LikeCount";
import LiveReactions from "./LiveReactions";

const Interactions: FC<{ item: Play }> = ({ item }) => {
  const { _id } = item;

  const socketService = useWS();

  const [initialValue, setInitialValue] = useState();

  useEffect(() => {
    if (!socketService || !_id) return;

    const handlePlayInfo = (data: any) => {
      setInitialValue(data);
    };

    const handleComments = (comments: any) => {
      setInitialValue((prev: any) => (prev ? { ...prev, comments } : prev));
    };

    socketService.emit("join-stream", { playId: _id });
    socketService.emit("get-play-info", { playId: _id });

    socketService.on("stream-play-info", handlePlayInfo);
    socketService.on("stream-comments", handleComments);

    return () => {
      socketService.off("stream-play-info", handlePlayInfo);
      socketService.off("stream-comments", handleComments);
    };
  }, [_id, socketService]);

  if (!initialValue) return null;

  return (
    <>
      <View style={interactionStyles.container}>
        <View style={commonStyles.rowGap}>
          <LikeCount
            initialValue={initialValue}
            setInitialValue={setInitialValue}
          />
          <CommentCount initialValue={initialValue} />
        </View>

        <CommentList initialValue={initialValue} />
        <LiveReactions initialValue={initialValue} />
      </View>

      <CommentInput initialValue={initialValue} />
    </>
  );
};

export default memo(Interactions);
