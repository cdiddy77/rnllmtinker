import React from "react";
import { ColorValue, Switch, Text, View } from "react-native";
import { usePersistedSettingEditor } from "./usePersistedSettingEditor";
import { PersistedSettings } from "../../shared/persistedSettings";
import theme from "../../shared/theme";
import { editorStyles } from "./settingsStyles";

interface Props<T extends keyof PersistedSettings> {
  setting: T;
  label: string;
}
export const PersistedBoolSettingSwitch: React.FC<
  Props<"dummyBooleanSetting">
> = (props) => {
  const editor = usePersistedSettingEditor(props.setting);
  const textColor: ColorValue = editor.value
    ? theme.color.darkTextStrong
    : theme.color.black50;
  return (
    <>
      <View style={editorStyles.root}>
        <Text style={[editorStyles.switchLabel, { color: textColor }]}>
          {props.label}
        </Text>
        <Switch
          value={editor.value}
          onValueChange={(v) => editor.onChange(v)}
          trackColor={{
            false: theme.color.cardGrey,
            true: theme.color.tertiary,
          }}
          style={editorStyles.switch}
        />
      </View>
    </>
  );
};
