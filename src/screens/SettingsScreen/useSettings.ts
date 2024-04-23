import React from "react";
import { SettingSection } from "./settingTypes";
import {
  DummyBooleanSettingEditor,
  DummyNumberSettingEditor,
  DummySettingEditor,
} from "./SettingEditors";

export function useSettings() {
  return React.useMemo(
    (): { sections: SettingSection[] } => ({
      sections: [
        {
          title: "General",
          data: [
            { key: "dummySetting", component: DummySettingEditor },
            {
              key: "dummyBooleanSetting",
              component: DummyBooleanSettingEditor,
            },
            { key: "dummyNumberSetting", component: DummyNumberSettingEditor },
          ],
        },
      ],
    }),
    []
  );
}
