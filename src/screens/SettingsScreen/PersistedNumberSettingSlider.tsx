import React from "react";
import { Text, View } from "react-native";
import { usePersistedSettingEditor } from "./usePersistedSettingEditor";
import Slider from "@react-native-community/slider";
import { PersistedSettings } from "../../shared/persistedSettings";
import { editorStyles } from "./settingsStyles";
import theme from "../../shared/theme";

interface Props<T extends keyof PersistedSettings> {
  setting: T;
  label: string;
  minimumValue: number;
  maximumValue: number;
  step: number;
  units: string;
}

export const PersistedNumberSettingSlider: React.FC<
  Props<"dummyNumberSetting">
> = (props) => {
  const editor = usePersistedSettingEditor(props.setting);
  return (
    <>
      <View style={editorStyles.root}>
        <Text style={editorStyles.label}>{props.label}</Text>
        <View style={editorStyles.sliderContainer}>
          <Slider
            style={editorStyles.slider}
            value={editor.value}
            onValueChange={(v) => editor.onChange(v)}
            minimumValue={props.minimumValue}
            maximumValue={props.maximumValue}
            step={props.step}
            minimumTrackTintColor={theme.color.tertiary}
            maximumTrackTintColor={theme.color.cardGrey}
            thumbTintColor={theme.color.tertiary}
          />
          <Text style={editorStyles.sliderValue}>
            {editor.value} {props.units}
          </Text>
        </View>
      </View>
    </>
  );
};
