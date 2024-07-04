import React from "react";
import { Text, View } from "react-native";
import { usePersistedSettingEditor } from "./usePersistedSettingEditor";
import SelectDropdown from "react-native-select-dropdown";
import { PersistedSettings } from "../../shared/persistedSettings";
import { editorStyles } from "./settingsStyles";
import theme from "../../shared/theme";

interface Props {
  setting: keyof PersistedSettings;
  label: string;
  options: {
    value: PersistedSettings[keyof PersistedSettings];
    label: string;
  }[];
}
export const PersistedSettingPicker: React.FC<Props> = (props) => {
  const editor = usePersistedSettingEditor(props.setting);
  const defaultValueIndex = props.options.findIndex(
    (o) => o.value === editor.value
  );
  return (
    <>
      <View style={editorStyles.root}>
        <Text style={editorStyles.selectLabel}>{props.label}</Text>
        <SelectDropdown
          defaultValueByIndex={defaultValueIndex}
          data={props.options}
          onSelect={(item) => editor.onChange(item.value)}
          // buttonTextAfterSelection={(item) => item.label}
          // rowTextForSelection={(item) => item.label}
          // rowStyle={editorStyles.selectRow}
          // rowTextStyle={editorStyles.selectRowText}
          // buttonStyle={editorStyles.selectButton}
          // buttonTextStyle={editorStyles.selectButtonText}
          // renderDropdownIcon={(isOpened) =>
          //   isOpened ? (
          //     <Text style={{ color: theme.color.darkText }}>▲</Text>
          //   ) : (
          //     <Text style={{ color: theme.color.darkText }}>▼</Text>
          //   )
          // }
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={editorStyles.dropdownButtonStyle}>
                <Text style={editorStyles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || "Select your mood"}
                </Text>
                isOpened ? (
                <Text style={{ color: theme.color.darkText }}>▲</Text>) : (
                <Text style={{ color: theme.color.darkText }}>▼</Text>)
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...editorStyles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text style={editorStyles.dropdownItemTxtStyle}>
                  {item.title}
                </Text>
              </View>
            );
          }}
        />
      </View>
    </>
  );
};
