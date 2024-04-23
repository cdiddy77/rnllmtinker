// eslint-disable-next-line no-restricted-syntax
export enum LoggingLevel {
  NONE = 0,
  ERROR = 1,
  WARN = 2,
  LOG = 3,
  DEBUG = 4,
  VERBOSE = 5,
}

export type LoggingListenerFn = (
  level: LoggingLevel,
  message: string,
  payload?: unknown
) => void;

interface LoggingConfig {
  includeTimestamp: boolean;
  loggingLevel: LoggingLevel;
  callConsole: boolean;
  listener: LoggingListenerFn | undefined;
}

let cfg: LoggingConfig = {
  loggingLevel: LoggingLevel.LOG,
  includeTimestamp: false,
  callConsole: true,
  listener: undefined,
};
export const setLoggingLevel = (level: LoggingLevel) => {
  console.log(`setLoggingLevel:${level}`);
  cfg.loggingLevel = level;
};
export const getLoggingLevel = () => cfg.loggingLevel;
export const setOptions = (options: Partial<LoggingConfig>) => {
  cfg = { ...cfg, ...options };
};
function getTimestamp() {
  return cfg.includeTimestamp ? new Date().toISOString() : undefined;
}

export const verbose = (title: string, payload?: unknown) => {
  if (cfg.loggingLevel >= LoggingLevel.VERBOSE) {
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.info(
        JSON.stringify({
          verbose: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.VERBOSE, title, payload);
    }
  }
};
export const verboseValue = <T>(title: string, payload: T): T => {
  if (cfg.loggingLevel >= LoggingLevel.VERBOSE) {
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.info(
        JSON.stringify({
          verbose: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.VERBOSE, title, payload);
    }
  }
  return payload;
};
export const debug = (title: string, payload?: unknown) => {
  if (cfg.loggingLevel >= LoggingLevel.DEBUG) {
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.info(
        JSON.stringify({
          debug: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.DEBUG, title, payload);
    }
  }
};
export const debugValue = <T>(title: string, payload: T): T => {
  if (cfg.loggingLevel >= LoggingLevel.DEBUG) {
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.info(
        JSON.stringify({
          debug: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.DEBUG, title, payload);
    }
  }
  return payload;
};
export const log = (title: string, payload?: unknown) => {
  if (cfg.loggingLevel >= LoggingLevel.LOG) {
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.log(
        JSON.stringify({
          log: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.LOG, title, payload);
    }
  }
};
export const logValue = <T>(title: string, payload: T): T => {
  if (cfg.loggingLevel >= LoggingLevel.LOG) {
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.log(
        JSON.stringify({
          log: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.LOG, title, payload);
    }
  }
  return payload;
};
export const warn = (title: string, payload?: unknown) => {
  if (cfg.loggingLevel >= LoggingLevel.WARN) {
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.warn(
        JSON.stringify({
          warn: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.WARN, title, payload);
    }
  }
};
export const warnValue = <T>(title: string, payload: T): T => {
  if (cfg.loggingLevel >= LoggingLevel.WARN) {
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.warn(
        JSON.stringify({
          warn: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.WARN, title, payload);
    }
  }
  return payload;
};
export const error = (title: string, payload?: unknown) => {
  if (cfg.loggingLevel >= LoggingLevel.ERROR) {
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.error(
        JSON.stringify({
          error: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.ERROR, title, payload);
    }
  }
};
export const errorValue = <T>(title: string, payload: T): T => {
  if (cfg.loggingLevel >= LoggingLevel.ERROR) {
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.error(
        JSON.stringify({
          error: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.ERROR, title, payload);
    }
  }
  return payload;
};
export const exception = (message: string, e?: unknown) => {
  const ex = e as Error | undefined;
  if (cfg.loggingLevel >= LoggingLevel.ERROR) {
    const title = message + "-exception";
    const payload = {
      message: ex?.message,
      code: e !== undefined ? (e as { code?: string }).code : undefined,
    };
    if (cfg.callConsole) {
      const ts = getTimestamp();
      console.error(
        JSON.stringify({
          error: title,
          ts,
          payload,
        })
      );
    }
    if (cfg.listener) {
      cfg.listener(LoggingLevel.ERROR, title, payload);
    }
  }
};
export const write = (
  level: LoggingLevel,
  title: string,
  payload?: unknown
) => {
  switch (level) {
    case LoggingLevel.VERBOSE:
      verbose(title, payload);
      break;
    case LoggingLevel.DEBUG:
      debug(title, payload);
      break;
    case LoggingLevel.LOG:
      log(title, payload);
      break;
    case LoggingLevel.WARN:
      warn(title, payload);
      break;
    case LoggingLevel.ERROR:
      error(title, payload);
      break;
    default:
  }
};

interface Timing {
  startTime: number;
  name: string;
}
const inprogressTimingStack: Timing[] = [];
export const startTiming = (name: string) => {
  const startTime = Date.now();
  inprogressTimingStack.push({ startTime, name });
};
export const stopTiming = (name: string) => {
  // Maybe some timings got left behind, because the timing
  // did not account for exceptions or something. Close those off
  // so our stack doesn't get out of sync.
  while (inprogressTimingStack.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const timing = inprogressTimingStack.pop()!;
    log("timing", {
      name: timing.name,
      duration: Date.now() - timing.startTime,
    });
    if (timing.name === name) {
      break;
    }
  }
};
export const time = (name: string, action: () => void) => {
  startTiming(name);
  try {
    action();
  } finally {
    stopTiming(name);
  }
};
export const timeValue = <T>(name: string, action: () => T) => {
  startTiming(name);
  try {
    return action();
  } finally {
    stopTiming(name);
  }
};
export const timePromise = async <T>(
  name: string,
  action: () => Promise<T>
) => {
  startTiming(name);
  try {
    return await action();
  } finally {
    stopTiming(name);
  }
};
