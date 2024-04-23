export type ValidateFn<T> = (text: T) =>
  | {
      valid: true;
    }
  | {
      valid: false;
      message?: string;
    };
