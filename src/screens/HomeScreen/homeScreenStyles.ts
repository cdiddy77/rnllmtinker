import React from "react";
import { StyleSheet } from "react-native";
import theme from "../../shared/theme";

export const styles = StyleSheet.create({
  root: { flexDirection: "column", height: "100%" },
  keyboardRoot: { flexDirection: "column", height: "100%" },
  promptInnerContainer: { flex: 1 },
  row: { ...theme.layout.row_center },
  promptRow: {
    ...theme.layout.row_center,
    marginHorizontal: theme.space.lg,
    marginVertical: theme.space.xl,
  },
  messagesScrollView: { flex: 1 },
  messagesContainer: { justifyContent: "flex-end", flex: 1 },
  message: {
    backgroundColor: theme.color.grey100,
    padding: theme.space.md,
    margin: theme.space.md,
    borderRadius: theme.radius.lg,
  },
  messageText: { ...theme.typog.body2, color: theme.color.darkText },
  promptInput: {
    ...theme.typog.body1,
    flex: 1,
    color: theme.color.darkText,
    backgroundColor: theme.color.grey75,
    borderWidth: 1,
    borderColor: theme.color.black75,
    borderStyle: "solid",
    borderRadius: theme.radius.lg,
    paddingTop: theme.space.lg,
    paddingBottom: theme.space.lg,
    paddingHorizontal: theme.space.xl,
  },
  sendButton: { marginLeft: theme.space.lg },
  sendButtonText: {
    ...theme.typog.button1,
    color: theme.color.darkText,
  },
});
