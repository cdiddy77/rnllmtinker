import * as dateFns from "date-fns";

export function formatTimestampText(dt: number) {
  if (dateFns.isBefore(dt, dateFns.subDays(Date.now(), 1.1))) {
    return dateFns.format(dt, "EEE MMM d");
  } else {
    return `${dateFns.formatDistanceToNow(dt, {
      includeSeconds: true,
    })} ago`;
  }
}

export function formatTimestampAsDatetime(dt: number) {
  return dateFns.format(dt, "MM/dd/yyyy HH:mm:ss");
}

export function formatDurationHHMMSS(duration: dateFns.Duration) {
  return `${duration.hours?.toString().padStart(2, "0")}:${duration.minutes
    ?.toString()
    .padStart(2, "0")}:${duration.seconds?.toString().padStart(2, "0")}`;
}
