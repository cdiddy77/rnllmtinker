import React from "react";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootParamList } from "../../shared/navigation";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { modelDescStyles, styles } from "./modelsScreenStyles";
import Animated from "react-native-reanimated";
import theme from "../../shared/theme";
import prettyBytes from "pretty-bytes";
import { useModels } from "./useModels";
import { formatTimestampText } from "../../shared/dateUtil";

type Props = BottomTabScreenProps<RootParamList, "Models">;

export const ModelsScreen: React.FC<Props> = () => {
  const hook = useModels();
  const subtitleText = `${hook.modelInfos.length} models, used ${prettyBytes(
    hook.spaceConsumed
  )}, ${prettyBytes(hook.spaceAvailable)} available`;

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Manage Models</Text>
      </View>
      <View style={styles.container}>
        <View style={[styles.container]}>
          <Text style={styles.subtitleText}>{subtitleText}</Text>
          <View style={theme.element.divider} />
          {hook.modelInfos.length > 0 ? (
            <FlatList
              data={hook.modelInfos}
              renderItem={({ item }) => {
                return (
                  <Pressable
                    style={({ pressed }) => [
                      modelDescStyles.root,
                      pressed ? modelDescStyles.rootPressed : null,
                      //   item === mr.selectedRecording
                      //     ? modelDescStyles.rootSelected
                      //     : null,
                    ]}
                    onPress={() => console.log("pressed")}
                  >
                    <View style={modelDescStyles.titleContainer}>
                      <Text style={modelDescStyles.titleText} numberOfLines={1}>
                        {item.title ?? item.fileName}
                      </Text>
                      <Text style={modelDescStyles.timeText}>
                        {item.timestamp !== 0
                          ? formatTimestampText(item.timestamp)
                          : "long ago"}
                      </Text>
                    </View>
                    <View style={modelDescStyles.subtitleContainer}>
                      <Text style={modelDescStyles.durationText}>
                        {"duration"}
                      </Text>
                      <Text style={modelDescStyles.sizeText}>
                        {prettyBytes(item.size)}
                      </Text>
                    </View>
                  </Pressable>
                );
              }}
            />
          ) : (
            <View style={styles.noModelsContainer}>
              <Text style={styles.noModelsText}>No recordings</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
