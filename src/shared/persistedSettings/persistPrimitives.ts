import AsyncStorage from "@react-native-async-storage/async-storage";
import EventEmitter from "eventemitter3";
import * as strogging from "../strogging";

type StringKeyOf<P> = { [K in keyof P]: K extends string ? K : never }[keyof P];

type EventsOf<P> = {
  [K in keyof P]: [value: P[K]];
};

type EvArgs<P> = EventEmitter.EventArgs<
  EventsOf<P>,
  EventEmitter.EventNames<EventsOf<P>>
>;

export type LoaderEntry =
  | {
      isLoading: false;
      fn: () => Promise<void>;
    }
  | {
      isLoading: true;
    };

export type Loaders<P> = Record<keyof P, LoaderEntry>;
export type Savers<P> = Record<keyof P, () => Promise<void>>;

export async function setBoolean<P>(
  key: StringKeyOf<P>,
  value: boolean
): Promise<void> {
  await AsyncStorage.setItem(key, value ? "true" : "false");
}
export async function setNumber<P>(
  key: StringKeyOf<P>,
  value: number
): Promise<void> {
  await AsyncStorage.setItem(key, value.toString());
}
export async function setString<P, T extends string>(
  key: StringKeyOf<P>,
  value: T
): Promise<void> {
  await AsyncStorage.setItem(key, value);
}
export async function setObject<P, K extends StringKeyOf<P>>(
  key: StringKeyOf<P>,
  value: P[K]
): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export function savePersistedSetting<P, K extends StringKeyOf<P>>(
  currentSettings: P,
  key: K,
  setter: (k: K, v: P[K]) => Promise<void>
): () => Promise<void> {
  return async () => {
    await setter(key, currentSettings[key]);
  };
}

export async function clearSettingCore<P, K extends StringKeyOf<P>>(
  loadedTable: Set<K>,
  changeEvent: EventEmitter<EventsOf<P>>,
  defaultSettings: P,
  key: K
) {
  loadedTable.delete(key);
  await AsyncStorage.removeItem(key);
  const params = [defaultSettings[key]] as EvArgs<P>[1];
  changeEvent.emit(
    key as string as EventEmitter.EventNames<EventsOf<P>>,
    ...params
  );
}

export async function clearAllSettingsCore<
  P extends object,
  K extends StringKeyOf<P>
>(loadedTable: Set<K>, defaultSettings: P) {
  loadedTable.clear();
  await AsyncStorage.multiRemove(Object.keys(defaultSettings));
}

export async function getBoolean<P>(
  key: StringKeyOf<P>
): Promise<boolean | null> {
  const value = await AsyncStorage.getItem(key);
  return value === null ? null : value === "true";
}
export async function getNumber<P, T extends number>(
  key: StringKeyOf<P>
): Promise<T | null> {
  const value = await AsyncStorage.getItem(key);
  return value ? (parseInt(value, 10) as T) : null;
}
export async function getString<P, T extends string>(
  key: StringKeyOf<P>
): Promise<T | null> {
  // in the best of all worlds, we would validate that it is really a T
  return (await AsyncStorage.getItem(key)) as T;
}
export async function getObject<P, K extends keyof P>(
  key: StringKeyOf<P>
): Promise<P[K] | null> {
  const value = await AsyncStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  } else {
    return null;
  }
}

export function loadPersistedSetting<P, K extends StringKeyOf<P>>(
  currentSettings: P,
  key: K,
  getter: (k: K) => Promise<P[K] | null>
): LoaderEntry {
  return {
    isLoading: false,
    fn: async () => {
      const value = await getter(key);
      if (value !== null) {
        currentSettings[key] = value;
      }
    },
  };
}

export async function getSettingCore<P, K extends keyof P>(
  loadedTable: Set<StringKeyOf<P>>,
  loaders: Loaders<P>,
  changeEvent: EventEmitter<EventsOf<P>>,
  currentSettings: P,
  key: K
): Promise<P[K]> {
  if (!loadedTable.has(key as string as StringKeyOf<P>)) {
    const loader = loaders[key];
    if (loader.isLoading === false) {
      loaders[key] = { isLoading: true };
      await loader.fn();
      loadedTable.add(key as string as StringKeyOf<P>);
      const params = [currentSettings[key]] as EvArgs<P>[1];
      changeEvent.emit(
        key as string as EventEmitter.EventNames<EventsOf<P>>,
        ...params
      );
    }
  }
  return currentSettings[key];
}
export function getCurrentSettingCore<P, K extends StringKeyOf<P>>(
  loadedTable: Set<K>,
  loaders: Loaders<P>,
  changeEvent: EventEmitter<EventsOf<P>>,
  currentSettings: P,
  key: K,
  beginLoading = true
): P[K] {
  if (beginLoading && !loadedTable.has(key)) {
    // don't await, caller must depend on events
    getSettingCore(loadedTable, loaders, changeEvent, currentSettings, key);
  }

  return currentSettings[key];
}

export async function setSettingCore<P, K extends StringKeyOf<P>>(
  loadedTable: Set<K>,
  savers: Savers<P>,
  changeEvent: EventEmitter<EventsOf<P>>,
  currentSettings: P,
  key: K,
  value: P[K]
) {
  currentSettings[key] = value;
  loadedTable.add(key);
  const params = [currentSettings[key]] as EvArgs<P>[1];
  changeEvent.emit(
    key as string as EventEmitter.EventNames<EventsOf<P>>,
    ...params
  );
  try {
    return await savers[key]();
  } catch (e) {
    strogging.exception("setSetting", e);
  }
}

export function isLoaded<P, K extends keyof P>(
  loadedTable: Set<K>,
  key: K
): boolean {
  return loadedTable.has(key);
}

export function subscribeToSettingChange<
  P,
  K extends StringKeyOf<P> & EventEmitter.EventNames<EventsOf<P>>
>(
  changeEvent: EventEmitter<EventsOf<P>>,
  key: K,
  listener: (value: P[K]) => unknown
): () => void {
  const l = listener as EventEmitter.EventListener<
    EventsOf<P>,
    EventEmitter.EventNames<EventsOf<P>>
  >;
  changeEvent.addListener(key, l);
  return () => changeEvent.removeListener(key, l);
}
