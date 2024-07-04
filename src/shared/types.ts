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

export interface ModelDesc {
  fileName: string;
  title?: string;
  description?: string;
  timestamp: number;
  size: number;
}
export interface ModelsManifest {
  models: ModelDesc[];
  schemaVersion: 1;
}

export interface SyncState {
  status: "up-to-date" | "out-of-date" | "local-only" | "error";
  downloadStatus?: DownloadStatus;
}

export type DownloadStatus =
  | { status: "none" }
  | {
      status: "inprogress";
      progress: number;
      progressMessage: string;
      jobId: number;
    }
  | { status: "complete" }
  | { status: "error"; error: Error };
