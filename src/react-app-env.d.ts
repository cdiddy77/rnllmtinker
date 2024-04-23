declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<
    SvgProps & {
      altFill?: string;
      altStroke?: string;
      gradientStop0?: string;
      gradientStop1?: string;
      gradientStop2?: string;
    }
  >;
  export default content;
}
declare module "@env" {
  export const OPENAI_API_KEY: string | undefined;
}
