export interface PersistedSettings {
  dummySetting: string;
  dummyBooleanSetting: boolean;
  dummyNumberSetting: number;
}

export const defaultSettings: PersistedSettings = {
  dummySetting: "dummy",
  dummyBooleanSetting: false,
  dummyNumberSetting: 0,
};
