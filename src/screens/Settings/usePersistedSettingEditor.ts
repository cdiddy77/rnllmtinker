import React from "react";
import { ValidateFn } from "../../shared/types";
import {
  PersistedSettings,
  usePersistedSetting,
} from "../../shared/persistedSettings";

export function usePersistedSettingEditor<T extends keyof PersistedSettings>(
  settingName: T,
  validateFn?: ValidateFn<PersistedSettings[T]>
) {
  const ps = usePersistedSetting(settingName);
  const [message, setMessage] = React.useState<string | undefined>(undefined);
  const onChange = React.useCallback(
    async (value: PersistedSettings[T]) => {
      if (validateFn) {
        const result = validateFn(value);
        if (result.valid) {
          setMessage(undefined);
          await ps.set(value);
        } else {
          setMessage(result.message);
        }
      } else {
        await ps.set(value);
      }
    },
    [ps, validateFn]
  );
  return React.useMemo(
    () => ({ value: ps.value, onChange, message }),
    [message, onChange, ps.value]
  );
}
