import React from "react";
import { ScrollView, TextInput } from "react-native";
import { Message } from "../../shared/types";
import { useLlmInference } from "react-native-llm-mediapipe";

export function useHomeScreen() {
  const textInputRef = React.useRef<TextInput>(null);
  const [prompt, setPrompt] = React.useState("");
  const messagesScrollViewRef = React.useRef<ScrollView>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [partialResponse, setPartialResponse] = React.useState<Message>();

  const llmInference = useLlmInference({
    modelName: "falcon-rw-1b-cpu.bin",
  });

  const onSendPrompt = React.useCallback(async () => {
    if (prompt.length === 0) {
      return;
    }
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setPartialResponse({ role: "assistant", content: "" });
    setPrompt("");
    const response = await llmInference.generateResponse(
      prompt,
      (partial) => {
        setPartialResponse((prev) => ({
          role: "assistant",
          content: (prev?.content ?? "") + partial,
        }));
      },
      (error) => {
        console.error(error);
        setMessages((prev) => [
          ...prev,
          { role: "error", content: `${error}` },
        ]);
        setPartialResponse(undefined);
      }
    );
    setPartialResponse(undefined);
    setMessages((prev) => [...prev, { role: "assistant", content: response }]);
  }, [llmInference, prompt]);

  return React.useMemo(
    () => ({
      onSendPrompt,
      textInputRef,
      messagesScrollViewRef,
      messages,
      setPrompt,
      partialResponse,
      prompt,
    }),
    [messages, onSendPrompt, prompt, setPrompt, partialResponse]
  );
}
