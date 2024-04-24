import * as React from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useHomeScreen } from "./useHomeScreen";
import { styles } from "./homeScreenStyles";
import { MessageView } from "./MessageView";
import theme from "../../shared/theme";
import * as strogging from "../../shared/strogging";
import { useKeyboardVisible } from "../../shared/hooks";

export function HomeScreen() {
  const hook = useHomeScreen();
  strogging.log("home", { kb: Keyboard.isVisible() });
  const keyboardVisible = useKeyboardVisible();
  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={0}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardRoot}
      >
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          style={styles.promptInnerContainer}
        >
          <ScrollView
            ref={hook.messagesScrollViewRef}
            style={styles.messagesScrollView}
            contentContainerStyle={styles.messagesContainer}
            // onContentSizeChange={() =>
            //   messagesScrollViewRef.current?.scrollToEnd()
            // }
          >
            {hook.messages.map((m, index) => (
              <MessageView message={m} key={index} />
            ))}
            {hook.partialResponse && (
              <MessageView message={hook.partialResponse} />
            )}
          </ScrollView>
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.promptRow,
            {
              paddingBottom: keyboardVisible ? theme.size.sm : theme.space.md,
            },
          ]}
        >
          <TextInput
            ref={hook.textInputRef}
            selectTextOnFocus={true}
            onChangeText={hook.setPrompt}
            value={hook.prompt}
            placeholder={"prompt..."}
            placeholderTextColor={theme.color.grey50}
            multiline={true}
            style={styles.promptInput}
          />
          <Pressable
            onPress={hook.onSendPrompt}
            // disabled={prompt.length === 0 || partialResponse !== undefined}
            style={styles.sendButton}
          >
            {hook.partialResponse !== undefined ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.sendButtonText}>Send</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
