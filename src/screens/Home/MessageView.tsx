import React from "react";
import { Message } from "../../shared/types";
import { Text, View } from "react-native";
import { styles } from "./homeScreenStyles";

export const MessageView: React.FC<{ message: Message }> = ({ message }) => {
  return (
    <View style={styles.message}>
      <Text style={styles.messageText}>{message.content}</Text>
    </View>
  );
};
