import React from "react";
import {
  runAtTargetFps,
  useCameraDevice,
  useCameraFormat,
  useCameraPermission,
  useFrameProcessor,
  VisionCameraProxy,
  Frame,
} from "react-native-vision-camera";
import { type OCRFrame } from "vision-camera-ocr";
import { Worklets, useSharedValue } from "react-native-worklets-core";
import * as strogging from "../../shared/strogging";
import { LayoutChangeEvent, Platform } from "react-native";

const plugin = VisionCameraProxy.initFrameProcessorPlugin("scanOCR");

export function scanOCR(frame: Frame): OCRFrame {
  "worklet";
  if (plugin == null) {
    throw new Error('Failed to load Frame Processor Plugin "scanOCR"!');
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return plugin.call(frame) as any;
}

export function useOcr() {
  const cameraPermission = useCameraPermission();
  const device = useCameraDevice("back");
  const format = useCameraFormat(device, [
    { videoResolution: "max" },
    { photoResolution: "max" },
  ]);
  const [cameraViewDimensions, setCameraViewDimensions] = React.useState({
    width: 1,
    height: 1,
  });

  const frameWidthAndHeightRef = useSharedValue({ height: 1, width: 1 });
  //   const [shouldProcessFrame, setShouldProcessFrame] = React.useState(true);

  const [ocr, setOcr] = React.useState<OCRFrame>();
  const setOcrJS = Worklets.createRunInJsFn(setOcr);
  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      runAtTargetFps(0.5, () => {
        frameWidthAndHeightRef.value = {
          height: frame.height,
          width: frame.width,
        };
        const data = scanOCR(frame);
        setOcrJS({ ...data });
      });
    },
    [frameWidthAndHeightRef, setOcrJS]
  );

  const layoutHandler = React.useCallback((event: LayoutChangeEvent) => {
    setCameraViewDimensions({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
  }, []);
  //   const boxes = Object.values(ocr?.result.blocks ?? {}).map((v) =>
  //     // calculate total area of bounding box
  //     ({
  //       area:
  //         ((v.boundingBox?.top ?? 0) - (v.boundingBox?.bottom ?? 0)) *
  //         ((v.boundingBox?.right ?? 0) - (v.boundingBox?.left ?? 0)),
  //       text: v.text,
  //       lang: v.recognizedLanguages,
  //     })
  //   );
  //   let box = { area: 0, text: "", lang: [] as string[] };
  //   for (const b of boxes) {
  //     if (b.area > box.area && b.text.length > 3) {
  //       box = b;
  //     }
  //   }

  //   strogging.log("ocr", {
  //     // ocr: ocr?.result.text,
  //     box,
  //     // more: Object.values(ocr?.result.blocks ?? {})
  //     //   .map((v) =>
  //     //     // calculate total area of bounding box
  //     //     ({
  //     //       area:
  //     //         ((v.boundingBox?.top ?? 0) - (v.boundingBox?.bottom ?? 0)) *
  //     //         ((v.boundingBox?.right ?? 0) - (v.boundingBox?.left ?? 0)),
  //     //       text: v.text,
  //     //     })
  //     //   )
  //     //   .filter((v) => v.area > 100_000),
  //   });
  const widthRatio =
    frameWidthAndHeightRef.value.width / cameraViewDimensions.width;
  const heightRatio =
    frameWidthAndHeightRef.value.height / cameraViewDimensions.height;
  strogging.log("dims", {
    frameWidthAndHeightRef,
    cameraViewDimensions,
    widthRatio,
    heightRatio,
  });
  //   strogging.log("ocr", { ocr });
  return React.useMemo(() => {
    return {
      widthRatio,
      heightRatio,
      device,
      format,
      blocks: Object.values(ocr?.result.blocks ?? {})
        .filter(
          (v) => getArea(v.frame) > 500_000
          // 0
        )
        .map((v) => ({
          v,
          text: v.text,
          lang: v.recognizedLanguages,
          bb: v.boundingBox,
          area: getArea(v.frame),
          box: getRect(v.frame, widthRatio, heightRatio),
        })),
      cameraPermission,
      frameProcessor,
      layoutHandler,
    };
  }, [
    cameraPermission,
    heightRatio,
    widthRatio,
    device,
    format,
    frameProcessor,
    layoutHandler,
    ocr,
  ]);
}

type BoundingFrame = OCRFrame["result"]["blocks"][string]["frame"];

function getArea(frame: BoundingFrame) {
  if (!frame) {
    return 0;
  }
  return frame.width * frame.height;
}

function getRect(
  frame: BoundingFrame,
  widthRatio: number,
  heightRatio: number
) {
  if (!frame) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  return {
    x:
      (frame.boundingCenterX - frame.width / 2) /
      Platform.select({
        ios: widthRatio,
        android: heightRatio,
        default: heightRatio,
      }),
    y: (frame.boundingCenterY - frame.height / 2) / heightRatio,
    width:
      frame.width /
      Platform.select({
        ios: widthRatio,
        android: heightRatio,
        default: heightRatio,
      }),
    height: frame.height / heightRatio,
  };
}
