import EventEmitter from "eventemitter3";
import React from "react";
import { PersistedSettings, defaultSettings } from "./domain";
import {
  clearAllSettingsCore,
  clearSettingCore,
  getCurrentSettingCore,
  getSettingCore,
  setSettingCore,
  subscribeToSettingChange,
} from "./persistPrimitives";
import { createLoaders, createSavers } from "./domainPersist";
export { type PersistedSettings } from "./domain";

const currentSettings: PersistedSettings = defaultSettings;

const loadedTable: Set<keyof PersistedSettings> = new Set();
const loaders = createLoaders(currentSettings);
const savers = createSavers(currentSettings);

type PersistedSettingsEvents = {
  [K in keyof PersistedSettings]: [value: PersistedSettings[K]];
};

const changeEvent = new EventEmitter<PersistedSettingsEvents>();

export function getSetting<K extends keyof PersistedSettings>(
  key: K
): Promise<PersistedSettings[K]> {
  return getSettingCore(
    loadedTable,
    loaders,
    changeEvent,
    currentSettings,
    key
  );
}

export function setSetting<K extends keyof PersistedSettings>(
  key: K,
  value: PersistedSettings[K]
): Promise<void> {
  return setSettingCore(
    loadedTable,
    savers,
    changeEvent,
    currentSettings,
    key,
    value
  );
}

export function clearSetting<K extends keyof PersistedSettings>(key: K) {
  return clearSettingCore(loadedTable, changeEvent, currentSettings, key);
}

export function clearAllSettings() {
  return clearAllSettingsCore(loadedTable, defaultSettings);
}

export function usePersistedSetting<K extends keyof PersistedSettings>(key: K) {
  const [value, setValue] = React.useState<PersistedSettings[K]>(
    getCurrentSettingCore(
      loadedTable,
      loaders,
      changeEvent,
      currentSettings,
      key
    ) as PersistedSettings[K]
  );
  React.useEffect(() => {
    const unsubscribe = subscribeToSettingChange(changeEvent, key, (v) => {
      setValue(v);
    });
    // in case it got loaded before we subscribed
    setValue(
      getCurrentSettingCore(
        loadedTable,
        loaders,
        changeEvent,
        currentSettings,
        key
      ) as PersistedSettings[K]
    );
    return unsubscribe;
  }, [key]);

  return {
    value,
    set: (v: PersistedSettings[K]) => {
      return setSettingCore(
        loadedTable,
        savers,
        changeEvent,
        currentSettings,
        key,
        v
      );
    },
  };
}
