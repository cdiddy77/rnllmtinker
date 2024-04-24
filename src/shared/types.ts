export type ValidateFn<T> = (text: T) =>
  | {
      valid: true;
    }
  | {
      valid: false;
      message?: string;
    };

export interface Message {
  role: "system" | "user" | "assistant" | "error";
  content: string;
  name?: string;
}
