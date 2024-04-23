import React from "react";
import { Text, TextInput, View } from "react-native";
import { usePersistedSettingEditor } from "./usePersistedSettingEditor";
import { PersistedSettings } from "../../shared/persistedSettings";
import { ValidateFn } from "../../shared/types";
import { editorStyles } from "./settingsStyles";

interface Props<T extends keyof PersistedSettings> {
  setting: T;
  label: string;
  validateFn?: ValidateFn<PersistedSettings[T]>;
}
export const PersistedStringSettingEditor: React.FC<Props<"dummySetting">> = (
  props
) => {
  const editor = usePersistedSettingEditor(props.setting, props.validateFn);
  return (
    <>
      <View style={editorStyles.root}>
        <Text style={editorStyles.label}>{props.label}</Text>
        <TextInput
          style={editorStyles.input}
          onChangeText={editor.onChange}
          value={editor.value}
        />
      </View>
      {editor.message && (
        <Text style={editorStyles.message}>{editor.message}</Text>
      )}
    </>
  );
};
