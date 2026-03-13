import * as Haptics from "expo-haptics";
import { Href, router } from "expo-router";

export const resetAndNavigate = (path: Href) => {
  if (router.canGoBack()) {
    router.dismissAll();
  }
  router.replace(path);
};

export const triggerHaptics = async (type: "SOFT" | "FAST") => {
  if (type == "FAST") {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  } else {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  }
};

export const formatCount = (count: number = 0): string => {
  const abs = Math.abs(count);

  const format = (num: number, suffix: string) =>
    `${parseFloat(num.toFixed(1))}${suffix}`;

  if (abs >= 1_000) return format(count / 1_000, "K");

  return count.toString();
};

export const timeAgo = (timestamp: number | string): string => {
  const time =
    typeof timestamp === "number" ? timestamp : new Date(timestamp).getTime();

  const seconds = Math.floor((Date.now() - time) / 1000);

  if (seconds < 0 || seconds < 5) return "Just now";

  const YEAR = 31536000;
  const MONTH = 2592000;
  const DAY = 86400;
  const HOUR = 3600;
  const MINUTE = 60;

  const format = (value: number, unit: string) =>
    `${value} ${unit}${value > 1 ? "s" : ""} ago`;

  if (seconds >= YEAR) return format(Math.floor(seconds / YEAR), "year");
  if (seconds >= MONTH) return format(Math.floor(seconds / MONTH), "month");
  if (seconds >= DAY) return format(Math.floor(seconds / DAY), "day");
  if (seconds >= HOUR) return format(Math.floor(seconds / HOUR), "hour");
  if (seconds >= MINUTE) return format(Math.floor(seconds / MINUTE), "minute");

  return format(seconds, "second");
};
