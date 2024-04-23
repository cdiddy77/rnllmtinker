import { OPENAI_API_KEY } from "@env";
import { Platform } from "react-native";
import * as strogging from "./strogging";

export const env = {
  OPENAI_API_KEY,
};

strogging.log("env", { env, platform: Platform.OS });
