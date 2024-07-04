import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { SectionList, Text, View } from "react-native";
import { RootParamList } from "../../shared/navigation";
import { useSettings } from "./useSettings";
import { streamingStyles } from "./settingsStyles";

type Props = BottomTabScreenProps<RootParamList, "Settings">;
const SectionSeparator = () => (
  <View style={streamingStyles.sectionSeparator} />
);
export const SettingsScreen: React.FC<Props> = () => {
  const settings = useSettings();
  return (
    <SectionList
      style={streamingStyles.root}
      sections={settings.sections}
      renderItem={(item) => {
        const Component = item.item.component;
        return <Component />;
      }}
      renderSectionHeader={(section) => (
        <View style={streamingStyles.section}>
          <Text style={streamingStyles.sectionText}>
            {section.section.title}
          </Text>
          {section.section.comingSoon && (
            <View style={streamingStyles.comingSoonContainer}>
              <Text style={streamingStyles.comingSoonText}>COMING SOON</Text>
            </View>
          )}
        </View>
      )}
      SectionSeparatorComponent={SectionSeparator}
    />
  );
};
