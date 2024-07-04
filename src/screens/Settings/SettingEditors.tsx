import React from "react";
import { PersistedStringSettingEditor } from "./PersistedStringSettingEditor";
import { PersistedBoolSettingSwitch } from "./PersistedBoolSettingSwitch";
import { PersistedNumberSettingSlider } from "./PersistedNumberSettingSlider";

export const DummySettingEditor: React.FC = () => {
  return (
    <PersistedStringSettingEditor
      setting="dummySetting"
      label="Dummy Setting"
    />
  );
};

export const DummyBooleanSettingEditor: React.FC = () => {
  return (
    <PersistedBoolSettingSwitch
      setting="dummyBooleanSetting"
      label="Dummy Boolean Setting"
    />
  );
};

export const DummyNumberSettingEditor: React.FC = () => {
  return (
    <PersistedNumberSettingSlider
      setting="dummyNumberSetting"
      label="Dummy Number Setting"
      minimumValue={0}
      maximumValue={100}
      step={10}
      units="dummy units"
    />
  );
};
