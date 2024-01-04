import { createContext, useContext } from "react";
import { getCurrentMonthNumber, getCurrentYearNumber } from "./dates";

export type YearlyData = Record<number, Record<number, Record<number, number>>>;

type Mood = { color: string; name: string };

export type MoodData = Array<Mood>;

export type Config = {
  currentYear: number;
  currentMonth: number;
  yearlyData: YearlyData;
  moodData: MoodData;
};

const currentYear = getCurrentYearNumber();
const currentMonth = getCurrentMonthNumber();

const defaultConfig: Config = {
  currentYear,
  currentMonth,
  yearlyData: {
    [currentYear]: {
      0: {},
      1: {},
      2: {},
      3: {},
      4: {},
      5: {},
      6: {},
      7: {},
      8: {},
      9: {},
      10: {},
      11: {},
    },
  },
  moodData: [
    { color: "#ef4444", name: "Awful" },
    { color: "#f97316", name: "Bad" },
    { color: "#eab308", name: "Okay" },
    { color: "#0ea5e9", name: "Good" },
    { color: "#22c55e", name: "Great" },
  ],
};

const localStorageKey = "config";

export function saveConfig(config: Config) {
  try {
    const configString = JSON.stringify(config);
    localStorage.setItem(localStorageKey, configString);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.warn("Unable to save config into localStorage");
    }
  }
}

export function loadConfig(): Config {
  const configString = localStorage.getItem(localStorageKey);
  if (!configString) {
    console.warn(
      "Could not retrieve config from localStorage, falling back to default."
    );
    return defaultConfig;
  }

  let config: Config | null = null;
  try {
    config = JSON.parse(configString);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.warn(
        "Could not parse config from localStorage, falling back to default."
      );
      return defaultConfig;
    }
  }

  console.log("Loaded config:", config);
  return config as Config;
}

type ConfigContext = {
  config: Config;
  /** Inserts or updates the mood rating number for a given year, month, and day. */
  upsertConfigDayRating: (
    year: number,
    month: number,
    day: number,
    rating: number
  ) => void;
  /** Clears the mood rating number for a given year, month, and day. */
  deleteConfigDayRating: (year: number, month: number, day: number) => void;
  /** Updates the mood rating color for the mood given by moodIndex. */
  updateConfigMoodColor: (moodIndex: number, hexColor: string) => void;
};

export const ConfigContext = createContext<ConfigContext>({
  config: defaultConfig,
  upsertConfigDayRating: () => {},
  deleteConfigDayRating: () => {},
  updateConfigMoodColor: () => {},
});

export function useConfig() {
  return useContext(ConfigContext);
}
