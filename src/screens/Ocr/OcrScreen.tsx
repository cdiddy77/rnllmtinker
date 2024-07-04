import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { RootParamList } from "../../shared/navigation";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./ocrScreenStyles";
import { Camera } from "react-native-vision-camera";
import { useOcr } from "./useOcr";
import * as strogging from "../../shared/strogging";
import { useFocusEffect } from "@react-navigation/native";

type Props = BottomTabScreenProps<RootParamList, "Ocr">;
export const OcrScreen: React.FC<Props> = () => {
  const [focused, setFocused] = React.useState(false);
  useFocusEffect(() => {
    setFocused(true);
    return () => {
      setFocused(false);
    };
  });
  const hook = useOcr();
  strogging.log("ocr", { blocks: hook.blocks.map((v) => v.box) });
  return (
    <View style={styles.root}>
      {focused && hook.device && hook.cameraPermission.hasPermission ? (
        <View style={styles.container}>
          <Camera
            orientation="portrait"
            pixelFormat="yuv"
            isActive={focused}
            style={styles.camera}
            frameProcessor={hook.frameProcessor}
            device={hook.device}
            fps={30}
            photo={true}
            format={hook.format}
            onLayout={hook.layoutHandler}
          />
          {Object.values(hook.blocks).map((block, index) => (
            <TouchableOpacity
              key={`${index}-${block.text}+${new Date().getTime()}}`}
              onPress={() => {
                strogging.log("block", { block });
              }}
              style={[
                styles.recognizedBlock,
                {
                  left: block.box.x,
                  top: block.box.y,
                  width: block.box.width,
                  height: block.box.height,
                },
              ]}
            >
              <Text style={styles.recognizedText}>{block.text}</Text>
            </TouchableOpacity>
          ))}
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
              styles.translateButton,
            ]}
            onPress={() => {
              strogging.log("translate", {
                text: hook.blocks.map((v) => v.text),
              });
            }}
          >
            <Text style={styles.buttonText}>Translate</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.5 : 1,
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
              styles.summaryButton,
            ]}
            onPress={() => {
              strogging.log("summary", { ocr: hook.blocks.map((v) => v.text) });
            }}
          >
            <Text style={styles.buttonText}>TL;DR</Text>
          </Pressable>
        </View>
      ) : (
        <RequestPermissions
          hasCameraPermission={hook.cameraPermission.hasPermission}
          requestCameraPermission={hook.cameraPermission.requestPermission}
        />
      )}
    </View>
  );
};

const RequestPermissions: React.FC<{
  hasCameraPermission: boolean;
  requestCameraPermission: () => Promise<boolean>;
}> = ({ hasCameraPermission, requestCameraPermission }) => {
  console.log(hasCameraPermission);
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to React Native Mediapipe</Text>
      <View style={styles.permissionsContainer}>
        {!hasCameraPermission && (
          <Text style={styles.permissionText}>
            React Native Mediapipe needs{" "}
            <Text style={styles.bold}>Camera permission</Text>.{" "}
            <Text style={styles.hyperlink} onPress={requestCameraPermission}>
              Grant
            </Text>
          </Text>
        )}
      </View>
    </View>
  );
};
