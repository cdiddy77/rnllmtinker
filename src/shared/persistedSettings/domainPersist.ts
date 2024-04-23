import { PersistedSettings } from "./domain";
import {
  LoaderEntry,
  getBoolean,
  getNumber,
  getString,
  loadPersistedSetting,
  savePersistedSetting,
  setBoolean,
  setNumber,
  setString,
} from "./persistPrimitives";

// loaders do the type conversion from string to the correct type
export function createLoaders(
  cs: PersistedSettings
): Record<keyof PersistedSettings, LoaderEntry> {
  return {
    dummySetting: loadPersistedSetting(cs, "dummySetting", getString),
    dummyBooleanSetting: loadPersistedSetting(
      cs,
      "dummyBooleanSetting",
      getBoolean
    ),
    dummyNumberSetting: loadPersistedSetting(
      cs,
      "dummyNumberSetting",
      getNumber
    ),
  };
}

// savers convert the value to string
export function createSavers(
  currentSettings: PersistedSettings
): Record<keyof PersistedSettings, () => Promise<void>> {
  return {
    dummySetting: savePersistedSetting(
      currentSettings,
      "dummySetting",
      setString
    ),
    dummyBooleanSetting: savePersistedSetting(
      currentSettings,
      "dummyBooleanSetting",
      setBoolean
    ),
    dummyNumberSetting: savePersistedSetting(
      currentSettings,
      "dummyNumberSetting",
      setNumber
    ),
  };
}
